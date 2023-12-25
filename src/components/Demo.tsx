import React, { FormEvent, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  connectedState,
  providerState,
  signerState,
} from './helper/metamask/Metamask.atoms';
import { BigNumberish, Contract, WeiPerEther, formatEther } from 'ethers';
import { SolarInsuranceABI } from '@/utils/contract/solar-insurance.abi';
import { SunshineRecords } from './helper/common/SunshineRecords';
import { FileClaim } from './helper/common/FileClaim';
import { CreateSunshineRecord } from './helper/demo/CreateSunshineRecords';
import { FundContract } from './helper/demo/FundContract';

export const Demo = () => {
  const connected = useRecoilValue(connectedState);
  const provider = useRecoilValue(providerState);
  const signer = useRecoilValue(signerState);

  const [balance, setBalance] = useState<BigNumberish>(0);
  const [hasBalance, setHasBalance] = useState(false);
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

      setContract(contract);

      provider.getBalance(contract.getAddress()).then((bal) => {
        setBalance(bal);
        setHasBalance(true);
      });

      contract
        .getRelevantSunshineRecordsWithoutChecks()
        .then((records) => {
          const recordsSorted = [...records].sort((a, b) => {
            return Number.parseInt(a.year) - Number.parseInt(b.year);
          });

          setSunshineRecords(recordsSorted);
          setHasRecords(true);
        })
        .catch(console.warn);
    }
  }, [connected]);

  const fundContract = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const amount = event.target['value'].value;
      const value = BigInt(amount) * WeiPerEther;

      const options = { value: value };
      await contract.fundContract(options);
    } catch (err) {
      console.error(err);
    }
  };

  const getFund = async () => {
    provider.getBalance(contract.getAddress()).then((bal) => {
      setBalance(bal);
      setHasBalance(true);
    });
  };

  const createSunshineRecord = async (event: FormEvent) => {
    event.preventDefault();

    const year = event.target['year'].value;
    const sunshine = event.target['sunshine'].value;
    const region = event.target['region'].value;

    try {
      await contract.createSunshineRecord(year, sunshine, region);
    } catch (err) {
      console.error(err);
    }
  };

  const fileClaim = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const year = event.target['year'].value;
      await contract.fileClaimWithoutChecks(year);
    } catch (err) {
      console.error(err);
    }
  };

  const getSunshineRecords = async () => {
    try {
      const sunshineRecords =
        await contract.getRelevantSunshineRecordsWithoutChecks();
      const recordsSorted = [...sunshineRecords].sort((a, b) => {
        return Number.parseInt(a.year) - Number.parseInt(b.year);
      });

      setSunshineRecords(recordsSorted);
      setHasRecords(true);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      {/* Introduction section */}
      <h1 className="w-full text-center text-xl font-bold text-black mt-2">
        Solar Insurance Smart Contract -{' '}
        {<span className="text-red-600">Demo Section</span>}
      </h1>
      <div>
        This section is intended to allow for experimental use of the DApp, to
        demonstrate/ test interactions with the smart contract.
      </div>

      {/* Main section */}
      <div className="w-full h-full flex justify-between mt-4">
        {/* Contract funding section */}
        <div className="bg-gray-transparent w-[32%] h-full rounded-md shadow-lg px-6 py-3 space-y-4 flex flex-col items-center">
          <FundContract
            hasBalance={hasBalance}
            balance={formatEther(balance)}
            fundContract={fundContract}
            reload={getFund}
          />
        </div>

        {/* Create sunshine record section */}
        <div className="bg-gray-transparent w-[32%] h-full rounded-md shadow-lg px-6 py-3 space-y-4 flex flex-col items-center">
          <CreateSunshineRecord createSunshineRecord={createSunshineRecord} />
        </div>

        {/* File claim and record list section */}
        <div className="bg-gray-transparent w-[32%] h-full rounded-md shadow-lg px-6 py-3 space-y-4 flex flex-col items-center">
          <FileClaim isDemo={true} fileClaim={fileClaim} />
          <div className="divider divider-neutral my-12" />
          <SunshineRecords
            hasRecords={hasRecords}
            sunshineRecords={sunshineRecords}
            getSunshineRecords={getSunshineRecords}
          />
        </div>
      </div>
    </div>
  );
};
