import React, { FormEvent, useEffect, useState } from 'react';
import { AboutContract } from './helper/insurance/AboutContract';
import { useRecoilValue } from 'recoil';
import { connectedState, signerState } from './helper/metamask/Metamask.atoms';
import { SolarInsuranceABI } from '@/utils/contract/solar-insurance.abi';
import { Contract, formatEther } from 'ethers';
import { SunshineRecords } from './helper/common/SunshineRecords';
import { FileClaim } from './helper/common/FileClaim';
import {
  CurrentlyActivePolicy,
  InsurancePolicy,
} from './helper/insurance/CurrentlyActivePolicy';
import { RegisterPolicy } from './helper/insurance/RegisterPolicy';
import { CalculatePremium } from './helper/insurance/CalculatePremium';

/**
 * Allows to interact with the calculate premium, register policy, extend and delete policy and file claim functions of the smart contract.
 * 
 * @returns the Insurance component
 */
export const Insurance = () => {
  const [owner, setOwner] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [calcPremium, setCalcPremium] = useState(0);
  const [showPremium, setShowPremium] = useState(false);
  const connected = useRecoilValue(connectedState);
  const signer = useRecoilValue(signerState);

  const [hasPolicy, setHasPolicy] = useState(false);
  const [insuredHoursLow, setInsuredHoursLow] = useState<number>();
  const [insuredHoursMid, setInsuredHoursMid] = useState<number>();
  const [insuredHoursHigh, setInsuredHoursHigh] = useState<number>();
  const [policy, setPolicy] = useState<InsurancePolicy>();

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

      // Fetch owner and address of the contract
      contract.owner().then(setOwner);
      contract.getAddress().then(setContractAddress);
      contract
        .getPolicyInformation()
        .then(setPolicyInformation)
        .catch(console.debug);

      // Fetch information about the insurance levels for the tooltips
      contract
        .getInsuredRiskByKey(0)
        .then((risk) => setInsuredHoursLow(risk[1]))
        .catch(console.debug);
      contract
        .getInsuredRiskByKey(1)
        .then((risk) => setInsuredHoursMid(risk[1]))
        .catch(console.debug);
      contract
        .getInsuredRiskByKey(2)
        .then((risk) => setInsuredHoursHigh(risk[1]))
        .catch(console.debug);

      // Fetch sunshine records recorded
      contract
        .getRelevantSunshineRecords()
        .then((record) => {
          if (record[2] > 0) {
            setSunshineRecords(new Array(record));
            setHasRecords(true);
          }
        })
        .catch(console.debug);

      setContract(contract);
    }
  }, [connected]);

  /**
   * Calculate the premium to pay for a certain policy configuration specified in a form.
   * @param event the form event containing the data about the desired policy configuration
   */
  const calculatePremium = async (event: FormEvent) => {
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

  /**
   * Register a certain policy configuration specified in a form.
   * @param event the form event containing the data about the desired policy configuration
   */
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

  /**
   * Fetch and display the policy of the connected account.
   */
  const displayPolicy = async () => {
    try {
      const policy = await contract.getPolicyInformation();

      if (!policy) {
        console.warn('No policy for this account yet.');
      }

      contract
        .getInsuredRiskOfPolicy()
        .then((risk) => {
          policy.insuredHours = risk[1];
        })
        .catch(console.debug);

      setPolicyInformation(policy);
    } catch (err) {
      console.debug(err);
    }
  };

  /**
   * Set the state of the policy variable, using the policy response from the smart contract.
   * @param policy the policy response from the contract
   */
  const setPolicyInformation = async (policy) => {
    setHasPolicy(true);

    setPolicy({
      holder: policy[0],
      region: policy[2],
      insuredRisk: policy[4],
      area: Number.parseInt(policy[5]),
      premium: formatEther(BigInt(policy[6])),
      registration: new Date(Number.parseInt(policy[7]) * 1000),
      validity: new Date(Number.parseInt(policy[8]) * 1000),
      claimTimeout: new Date(Number.parseInt(policy[9]) * 1000),
    });
  };

  /**
   * Extend the policy by one year.
   */
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
      console.debug(err);
    }
  };

  /**
   * Delete the policy.
   */
  const deletePolicy = async () => {
    try {
      await contract.deletePolicy();
      setHasPolicy(false);
    } catch (err) {
      console.debug(err);
    }
  };

  /**
   * File a claim for a year specified by the user in a form.
   * @param event the event containing the data about which year to file a claim for
   */
  const fileClaim = async (event: FormEvent) => {
    event.preventDefault();

    const year = event.target['year'].value;

    try {
      await contract.fileClaim(year);
    } catch (err) {
      console.debug(err);
    }
  };

  /**
   * Fetch the sunshine records relevant for the users policy.
   */
  const getSunshineRecords = async () => {
    try {
      const sunshineRecord = await contract.getRelevantSunshineRecords();

      if (sunshineRecord[2] > 0) {
        setSunshineRecords(new Array(sunshineRecord));
        setHasRecords(true);
      }
    } catch (err) {
      console.debug(err);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <h1 className="w-full text-center text-xl font-bold text-black mt-2">
        Solar Insurance DApp
      </h1>
      <AboutContract owner={owner} deployment={contractAddress} />
      <div className="w-full h-full flex justify-between">
        <div className="bg-gray-transparent w-[24%] h-full rounded-md shadow-lg px-6 py-3 space-y-4">
          <CalculatePremium
            submitAction={calculatePremium}
            insuredHoursLow={insuredHoursLow}
            insuredHoursMid={insuredHoursMid}
            insuredHoursHigh={insuredHoursHigh}
            submitButtonText="Calculate"
            showPremium={showPremium}
            premium={formatEther(calcPremium)}
          />
        </div>
        <div className="bg-gray-transparent w-[24%] h-full rounded-md shadow-lg px-6 py-3 space-y-4">
          <RegisterPolicy
            submitAction={registerPolicy}
            insuredHoursLow={insuredHoursLow}
            insuredHoursMid={insuredHoursMid}
            insuredHoursHigh={insuredHoursHigh}
            submitButtonText="Register"
          />
        </div>
        <div className="bg-gray-transparent w-[24%] h-full rounded-md shadow-lg px-6 py-3 space-y-4">
          <CurrentlyActivePolicy
            hasPolicy={hasPolicy}
            policy={policy}
            extendPolicy={extendPolicy}
            deletePolicy={deletePolicy}
            displayPolicy={displayPolicy}
          />
        </div>
        <div className="bg-gray-transparent w-[24%] h-full rounded-md shadow-lg px-6 py-3 space-y-4">
          <FileClaim isDemo={false} fileClaim={fileClaim} />
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
