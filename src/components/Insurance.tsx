import React, { useEffect, useState } from 'react';
import { AboutContract } from './helper/insurance/About';
import { useRecoilValue } from 'recoil';
import { connectedState, signerState } from './helper/metamask/Metamask.atoms';
import { SolarInsuranceABI } from '@/utils/contract/solar-insurance.abi';
import { Contract } from 'ethers';



export const Insurance = () => {
  const [owner, setOwner] = useState('');
  const [contractAddress, setContractAddress] = useState('');  
  const connected = useRecoilValue(connectedState);
  const signer = useRecoilValue(signerState);

  const [contract, setContract] = useState<any>();

  useEffect(() => {
    if(connected){
      const contract = new Contract(
        process.env.CONTRACT_ADDRESS,
        SolarInsuranceABI,
        signer,
      );

      contract.owner().then(setOwner);
      contract.getAddress().then(setContractAddress);

      setContract(contract);
    }
  }, [connected]);

  return (
    <div className="h-full w-full flex flex-col items-center">
      <h1 className="w-full text-center text-xl font-bold text-black mt-2">
        Solar Insurance Smart Contract
      </h1>
      <AboutContract owner={owner} deployment={contractAddress}/>
    </div>
  );
}

