import React, { FormEvent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { connectedState, providerState, signerState } from './helper/metamask/Metamask.atoms';
import { BigNumberish, Contract, WeiPerEther, ethers, formatEther } from 'ethers';
import { SolarInsuranceABI } from '@/utils/contract/solar-insurance.abi';

export const Demo = () => {
  const connected = useRecoilValue(connectedState);
  const provider = useRecoilValue(providerState)
  const signer = useRecoilValue(signerState);

  const [balance, setBalance] = useState<BigNumberish>(0);
  const [hasBalance, setHasBalance] = useState(false);

  const [contract, setContract] = useState<any>();

  useEffect(() => {
    if (connected) {
      const contract = new Contract(
        process.env.CONTRACT_ADDRESS,
        SolarInsuranceABI,
        signer,
      );

      setContract(contract);

      provider.getBalance(contract.getAddress()).then(bal => {
        setBalance(bal);
        setHasBalance(true);
      });
    }
  }, [connected]);

  const fundContract = async (event: FormEvent) => {
    event.preventDefault();

    const amount = event.target['value'].value;
    console.log(BigInt(amount) * WeiPerEther);
    console.log(amount);

    try {
      const value = BigInt(amount) * WeiPerEther;

      const options = { value: value };

      await contract.fundContract(options);
    } catch (err) {
      console.error(err);
    }
  };

  const createSunshineRecord = async (event: FormEvent) => {
    event.preventDefault();

    const year = event.target['year'].value;
    const sunshine = event.target['sunshine'].value;
    const region = event.target['region'].value;

    try {
      console.log(year, sunshine, region);
      await contract.createSunshineRecord(year, sunshine, region);
    } catch (err) {
      console.error(err);
    }
  };

  const fileClaim = async (event: FormEvent) => {
    event.preventDefault();

    const year = event.target['year'].value;

    try {
      await contract.fileClaimWithoutChecks(year);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <h1 className="w-full text-center text-xl font-bold text-black mt-2">
        Solar Insurance Smart Contract -{' '}
        {<span className="text-red-600">Demo Section</span>}
      </h1>
      <div>
        This section is intended to allow a experimental use of the frontend, to
        demonstrate/ test interactions with the smart contract.
      </div>
      <div className="w-full h-full flex justify-between mt-4">
        <div className="bg-gray-transparent w-[32%] h-full rounded-md shadow-lg px-6 py-3 space-y-4 flex flex-col items-center">
          <h2 className="w-full text-center text-lg font-bold">
            Fund Contract
          </h2>
          <div className="text-center">
            Fund the contract with some ETH in order to be able of paying out
            funds.
          </div>
          {hasBalance && <div>Current Balance: {formatEther(balance)} ETH</div>}
          <form className="space-y-2" onSubmit={fundContract}>
            <div>
              <label htmlFor="value" className="font-bold text-xs">
                Fund amount (ETH)
              </label>
              <input
                type="number"
                id="value"
                name="value"
                placeholder="Type here"
                className="input input-sm input-bordered w-full bg-white"
                min={0}
                defaultValue={1}
                step={1}
              />
            </div>
            <div className="w-full flex justify-center">
              <button className="btn btn-sm btn-success">Fund Contract</button>
            </div>
          </form>
        </div>

        <div className="bg-gray-transparent w-[32%] h-full rounded-md shadow-lg px-6 py-3 space-y-4 flex flex-col items-center">
          <h2 className="w-full text-center text-lg font-bold">
            Create Sunshine Record
          </h2>
          <div className="text-center">
            Create records for sunshine durations in certain years, that will
            allow to file claims for testing/ demo purposes.
          </div>
          <form className="space-y-2" onSubmit={createSunshineRecord}>
            <div>
              <label htmlFor="year" className="font-bold text-xs">
                Year
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

            <div>
              <label htmlFor="region" className="font-bold text-xs">
                Record region
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
              <label htmlFor="sunshine" className="font-bold text-xs">
                Hours of Sunshine
              </label>
              <input
                type="number"
                id="sunshine"
                name="sunshine"
                placeholder="Type here"
                className="input input-sm input-bordered w-full max-w-xs bg-white"
                min={1600}
                defaultValue={1701}
              />
            </div>

            <div className="w-full flex justify-center">
              <button className="btn btn-sm btn-success">Create Record</button>
            </div>
          </form>
        </div>

        <div className="bg-gray-transparent w-[32%] h-full rounded-md shadow-lg px-6 py-3 space-y-4 flex flex-col items-center">
          <h2 className="w-full text-center text-lg font-bold">File Claim</h2>
          <div className="text-center">
            File claims without the assertions that are in place for the
            productive method of the contract.
          </div>
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
