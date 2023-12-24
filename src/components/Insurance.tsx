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

  const [hasPolicy, setHasPolicy] = useState(false);
  const [holder, setHolder] = useState('');
  const [risk, setRisk] = useState('');
  const [insuredHoursLow, setInsuredHoursLow] = useState<number>();
  const [insuredHoursMid, setInsuredHoursMid] = useState<number>();
  const [insuredHoursHigh, setInsuredHoursHigh] = useState<number>();
  const [insuredHours, setInsuredHours] = useState('');
  const [region, setRegion] = useState('');
  const [area, setArea] = useState<number>();
  const [premium, setPremium] = useState('');
  const [registration, setRegistration] = useState<Date>();
  const [validity, setValidity] = useState<Date>();
  const [claimTimeout, setClaimTimeout] = useState<Date>();

  const [sunshineRecords, setSunshineRecords] = useState<any[]>();
  const [hasRecords, setHasRecords] = useState(false);

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
      contract
        .getPolicyInformation()
        .then(setPolicyInformation)
        .catch(console.warn);
      contract
        .getInsuredRiskOfPolicy()
        .then((risk) => {
          setInsuredHours(risk[1]);
        })
        .catch(console.warn);

      contract
        .getInsuredRiskByKey(0)
        .then((risk) => setInsuredHoursLow(risk[1]))
        .catch(console.warn);
      contract
        .getInsuredRiskByKey(1)
        .then((risk) => setInsuredHoursMid(risk[1]))
        .catch(console.warn);
      contract
        .getInsuredRiskByKey(2)
        .then((risk) => setInsuredHoursHigh(risk[1]))
        .catch(console.warn);

      contract
        .getRelevantSunshineRecords()
        .then((record) => {
          setSunshineRecords(new Array(record));
          setHasRecords(true);
        })
        .catch(console.warn);

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
        console.warn('No policy for this account yet.');
      }

      contract
        .getInsuredRiskOfPolicy()
        .then((risk) => {
          setInsuredHours(risk[1]);
        })
        .catch(console.warn);

      setPolicyInformation(policy);
    } catch (err) {
      console.warn(err);
    }
  };

  const setPolicyInformation = async (policy) => {
    setHasPolicy(true);
    setHolder(policy[0]);
    setRegion(policy[2]);
    setRisk(policy[4]);
    setArea(Number.parseInt(policy[5]));
    setPremium(formatEther(BigInt(policy[6])));
    setRegistration(new Date(Number.parseInt(policy[7]) * 1000));
    setValidity(new Date(Number.parseInt(policy[8]) * 1000));
    setClaimTimeout(new Date(Number.parseInt(policy[9]) * 1000));
  };

  const extendPolicy = async () => {
    try {
      const policy = await contract.getPolicyInformation();

      if (!policy) {
        console.warn('No policy for this account yet.');
      }

      const premium = policy[4];
      const options = { value: premium };
      await contract.extendPolicy(options);
    } catch (err) {
      console.warn(err);
    }
  };

  const deletePolicy = async () => {
    try {
      await contract.deletePolicy();
      setHasPolicy(false);
    } catch (err) {
      console.warn(err);
    }
  };

  const fileClaim = async (event: FormEvent) => {
    event.preventDefault();

    const year = event.target['year'].value;

    try {
      await contract.fileClaim(year);
    } catch (err) {
      console.warn(err);
    }
  };

  const getSunshineRecords = async () => {
    try {
      const sunshineRecord = await contract.getRelevantSunshineRecords();
      setSunshineRecords(new Array(sunshineRecord));
      setHasRecords(true);
    } catch (err) {
      console.warn(err);
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
          <div className="text-center text-sm">
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
                <span className="tooltip" data-tip={insuredHoursLow + ' hours'}>
                  <span>Low</span>
                </span>
                <span className="tooltip" data-tip={insuredHoursMid + ' hours'}>
                  <span>Mid</span>
                </span>
                <span
                  className="tooltip"
                  data-tip={insuredHoursHigh + ' hours'}
                >
                  <span>High</span>
                </span>
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
          <div className="text-center text-sm">
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
                <span className="tooltip" data-tip={insuredHoursLow + ' hours'}>
                  <span>Low</span>
                </span>
                <span className="tooltip" data-tip={insuredHoursMid + ' hours'}>
                  <span>Mid</span>
                </span>
                <span
                  className="tooltip"
                  data-tip={insuredHoursHigh + ' hours'}
                >
                  <span>High</span>
                </span>
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
          {hasPolicy && (
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
                <div className="truncate">
                  {risk + ` (${insuredHours} hours)`}
                </div>
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
          <div className="w-full flex flex-row justify-around space-x-2">
            <button className="btn btn-sm btn-success" onClick={extendPolicy}>
              Extend Policy
            </button>
            <button className="btn btn-sm btn-error" onClick={deletePolicy}>
              Delete Policy
            </button>
          </div>
          <div className="w-full flex flex-row justify-around space-x-2">
            <button className="btn btn-sm btn-neutral" onClick={displayPolicy}>
              Refresh View
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
          <div className='divider divider-neutral my-12'/>
          <h2 className="w-full text-center text-lg font-bold">
            Sunshine Records
          </h2>
          {hasRecords && (
            <>
              <div className="overflow-x-auto">
                <table className="table table-xs table-pin-rows table-pin-cols">
                  <thead>
                    <tr className="bg-gray-transparent text-black">
                      <td>Year</td>
                      <td>Sunshine Duration</td>
                      <td>Region</td>
                    </tr>
                  </thead>
                  <tbody>
                    {sunshineRecords.map((record, i) => {
                      return (
                        <tr key={i}>
                          <td>{Number.parseInt(record[2])}</td>
                          <td>{Number.parseInt(record[3])}</td>
                          <td>{record[1]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <div className="w-full flex flex-row justify-around space-x-2">
            <button
              className="btn btn-sm btn-neutral"
              onClick={getSunshineRecords}
            >
              Refresh View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
