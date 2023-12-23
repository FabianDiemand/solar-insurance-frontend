import React, { FormEvent, useEffect, useState } from 'react';
import { AboutContract } from './helper/insurance/About';
import { useRecoilValue } from 'recoil';
import { connectedState, signerState } from './helper/metamask/Metamask.atoms';
import { SolarInsuranceABI } from '@/utils/contract/solar-insurance.abi';
import {
  Contract,
  JsonRpcError,
  ethers,
  formatEther,
  isError,
  parseEther,
} from 'ethers';
import { mapRegions, mapRisks } from '@/utils/contract/values.maps';

export const Insurance = () => {
  const [owner, setOwner] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [calcPremium, setCalcPremium] = useState(0);
  const [showPremium, setShowPremium] = useState(false);
  const connected = useRecoilValue(connectedState);
  const signer = useRecoilValue(signerState);

  const [holder, setHolder] = useState('');
  const [risk, setRisk] = useState('');
  const [region, setRegion] = useState('');
  const [area, setArea] = useState<number>();
  const [premium, setPremium] = useState('');
  const [registration, setRegistration] = useState<Date>();
  const [validity, setValidity] = useState<Date>();
  const [claimTimeout, setClaimTimeout] = useState<Date>();

  const [contract, setContract] = useState<any>();

  useEffect(() => {
    if (connected) {
      const contract = new Contract(
        process.env.CONTRACT_ADDRESS,
        SolarInsuranceABI,
        signer,
      );

      contract.owner().then(setOwner);
      contract.getAddress().then(setContractAddress);
      contract.getPolicyInformation().then(setPolicyInformation);

      setContract(contract);
    }
  }, [connected]);

  const calculatePremium = (event: FormEvent) => {
    event.preventDefault();

    const risk = event.target['risk'].value;
    const area = event.target['area'].value;

    try {
      contract.calculatePremium(risk, area).then((premium: any) => {
        setCalcPremium(premium);
        setShowPremium(true);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const registerPolicy = async (event: FormEvent) => {
    event.preventDefault();

    const risk = event.target['risk'].value;
    const area = event.target['area'].value;
    const region = event.target['region'].value;

    try {
      const premium = await contract.calculatePremium(risk, area);

      const options = { value: premium };
      await contract.registerPolicy(risk, area, region, options);
    } catch (err) {
      console.error(err);
    }
  };

  const displayPolicy = async () => {
    try {
      const policy = await contract.getPolicyInformation();

      if (!policy) {
        console.log('No policy for this account yet.');
      }

      setPolicyInformation(policy);
    } catch (err) {
      console.error(err);
    }
  };

  const setPolicyInformation = (policy) => {
    setHolder(policy[0]);
    setRegion(mapRegions(policy[1]));
    setRisk(mapRisks(policy[2]));
    setArea(Number.parseInt(policy[3]));
    setPremium(formatEther(BigInt(policy[4])));
    setRegistration(new Date(Number.parseInt(policy[5]) * 1000));
    setValidity(new Date(Number.parseInt(policy[6]) * 1000));
    setClaimTimeout(new Date(Number.parseInt(policy[7]) * 1000));
  };

  const renewPolicy = async () => {
    try {
      const policy = await contract.getPolicyInformation();

      if (!policy) {
        console.log('No policy for this account yet.');
      }

      const premium = policy[4];
      const options = { value: premium };
      await contract.extendPolicy(options);
    } catch (err) {
      console.error(err);
    }
  };

  const fileClaim = async (event: FormEvent) => {
    event.preventDefault();

    const year = event.target['year'].value;

    try {
      await contract.fileClaim(year);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <h1 className="w-full text-center text-xl font-bold text-black mt-2">
        Solar Insurance Smart Contract
      </h1>
      <AboutContract owner={owner} deployment={contractAddress} />
      <div className="w-full h-full flex justify-between">
        <div className="bg-gray-transparent w-[24%] h-full rounded-md shadow-lg px-6 py-3 space-y-4">
          <h2 className="w-full text-center text-lg font-bold">
            Calculate Premium
          </h2>
          <div className="text-center">
            Find out which yearly premium applies to your desired policy.
          </div>
          <form className="space-y-2" onSubmit={calculatePremium}>
            <div>
              <label htmlFor="risk" className="font-bold text-xs">
                Insured risk
              </label>
              <input
                id="risk"
                name="risk"
                type="range"
                min={0}
                max={2}
                defaultValue={1}
                className="range range-xs"
                step={1}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>Low</span>
                <span>Mid</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label htmlFor="region" className="font-bold text-xs">
                Panel region
              </label>
              <select
                className="select select-sm select-bordered w-full max-w-xs bg-white"
                id="region"
                name="region"
                defaultValue={1}
              >
                <option value={1}>Switzerland North</option>
                <option value={0}>Switzerland South</option>
              </select>
            </div>

            <div>
              <label htmlFor="area" className="font-bold text-xs">
                Panel area
              </label>
              <input
                type="number"
                id="area"
                name="area"
                placeholder="Type here"
                className="input input-sm input-bordered w-full max-w-xs bg-white"
                min={1}
                defaultValue={1}
              />
            </div>
            <div className="w-full flex justify-center">
              <button type="submit" className="btn btn-sm btn-success">
                Calculate
              </button>
            </div>
          </form>
          {showPremium && (
            <p>{`The yearly premium for this policy is ${formatEther(
              calcPremium,
            )} ETH.`}</p>
          )}
        </div>
        <div className="bg-gray-transparent w-[24%] h-full rounded-md shadow-lg px-6 py-3 space-y-4">
          <h2 className="w-full text-center text-lg font-bold">
            Register Policy
          </h2>
          <div className="text-center">
            Register for a Solar Insurance policy.
          </div>
          <form className="space-y-2" onSubmit={registerPolicy}>
            <div>
              <label htmlFor="risk" className="font-bold text-xs">
                Insured risk
              </label>
              <input
                id="risk"
                name="risk"
                type="range"
                min={0}
                max={2}
                defaultValue={1}
                className="range range-xs"
                step={1}
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>Low</span>
                <span>Mid</span>
                <span>High</span>
              </div>
            </div>

            <div>
              <label htmlFor="region" className="font-bold text-xs">
                Panel region
              </label>
              <select
                className="select select-sm select-bordered w-full max-w-xs bg-white"
                id="region"
                name="region"
                defaultValue={1}
              >
                <option value={1}>Switzerland North</option>
                <option value={0}>Switzerland South</option>
              </select>
            </div>

            <div>
              <label htmlFor="area" className="font-bold text-xs">
                Panel area
              </label>
              <input
                type="number"
                id="area"
                name="area"
                placeholder="Type here"
                className="input input-sm input-bordered w-full max-w-xs bg-white"
                min={1}
                defaultValue={1}
              />
            </div>
            <div className="w-full flex justify-center">
              <button type="submit" className="btn btn-sm btn-success">
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-transparent w-[24%] h-full rounded-md shadow-lg px-6 py-3 space-y-4">
          <h2 className="w-full text-center text-lg font-bold">
            Currently Active Policy
          </h2>
          {holder && (
            <div className="space-y-1">
              <div>
                <div className="font-bold text-xs">Policy Holder</div>
                <div className="tooltip inline" data-tip={holder}>
                  <div className="truncate">{holder}</div>
                </div>
              </div>
              <div>
                <div className="font-bold text-xs">Location</div>
                <div className="truncate">{region}</div>
              </div>
              <div>
                <div className="font-bold text-xs">Insured Risk</div>
                <div className="truncate">{risk}</div>
              </div>
              <div>
                <div className="font-bold text-xs">Panel Area</div>
                <div className="truncate">
                  {area + ' m'}
                  <sup>2</sup>
                </div>
              </div>
              <div>
                <div className="font-bold text-xs">Premium</div>
                <div className="truncate">{premium + ' ETH'}</div>
              </div>
              <div>
                <div className="font-bold text-xs">Registration</div>
                <div className="truncate">
                  {registration?.toLocaleDateString('ch-CH')}
                </div>
              </div>
              <div>
                <div className="font-bold text-xs">Validity</div>
                <div className="truncate">
                  {validity?.toLocaleDateString('ch-CH')}
                </div>
              </div>
              <div>
                <div className="font-bold text-xs">Next Claim</div>
                <div className="truncate">
                  {claimTimeout?.toLocaleDateString('ch-CH')}
                </div>
              </div>
            </div>
          )}
          <div className="w-full flex flex-row justify-around">
            <button className="btn btn-sm btn-neutral" onClick={displayPolicy}>
              Refresh View
            </button>
            <button className="btn btn-sm btn-success" onClick={renewPolicy}>
              Renew Policy
            </button>
          </div>
        </div>
        <div className="bg-gray-transparent w-[24%] h-full rounded-md shadow-lg px-6 py-3 space-y-4">
          <h2 className="w-full text-center text-lg font-bold">File Claim</h2>
          <form className="space-y-2" onSubmit={fileClaim}>
            <div>
              <label htmlFor="year" className="font-bold text-xs">
                Claim Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                placeholder="Type here"
                className="input input-sm input-bordered w-full max-w-xs bg-white"
                min={2023}
                defaultValue={2023}
              />
            </div>
            <div className="w-full flex justify-center">
              <button className="btn btn-sm btn-error">File Claim</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
