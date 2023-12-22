import React, { useEffect } from "react";
import {BrowserProvider, Contract, Eip1193Provider, JsonRpcSigner, Provider, Signer, ethers} from 'ethers';

import { Insurance } from './Insurance';
import { Demo } from './Demo';
import { SolarInsuranceABI } from '@/utils/contract/solar-insurance.abi';

import { useState } from 'react';

export const Container = () => {
  const [insuranceActive, setInsuranceActive] = useState(true);
  const [demoActive, setDemoActive] = useState(false);
  const [provider, setProvider] = useState({} as BrowserProvider);
  const [signer, setSigner] = useState({} as JsonRpcSigner);
  const [contract, setContract] = useState({} as Contract);

  useEffect(() => {
    const initialiseProvider = async () => {
      if(window.ethereum ){
        console.log(window.ethereum);
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new Contract(
          '0x85e4486d93fDF7ffDa0a215422101Ac6a949ba6F',
          SolarInsuranceABI,
          signer
        );

        console.log(await contract.owner());
        console.log(await contract.calculatePremium(1, 60));

        console.log(provider);
        console.log(signer);
        console.log(contract);

        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      } else {
        console.error('NO METAMASK INSTALLED!');
        //TODO implement info popup to install metamask 
      }
    }

    initialiseProvider().catch(console.error);
  }, [])

  const flipViews = () => {
    setInsuranceActive(!insuranceActive);
    setDemoActive(!demoActive);
  }

  return (
    <div className="size-5/6 flex flex-col items-center text-black">
      <div role="tablist" className="w-[60%] tabs">
        <a role="tab" id="insurance" className={`tab ${insuranceActive && 'tab-active pointer-events-none'}`} onClick={flipViews}>
          Insurance
        </a>
        <a role="tab" id="demo" className={`tab ${demoActive && 'tab-active pointer-events-none'}`} onClick={flipViews}>
          Demo
        </a>
      </div>
      <div className="size-full bg-gray-transparent-9 rounded-3xl p-4">
        {insuranceActive && <Insurance signer={signer} contract={contract}/>}
        {demoActive && <Demo signer={signer} contract={contract}/>}
      </div>
    </div>
  );
}