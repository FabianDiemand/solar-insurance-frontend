import { Contract, Signer } from 'ethers';
import React, { useEffect, useState } from 'react';
import { EtherscanLink } from './helper/EtherscanLink';
import { About } from './helper/About';

interface InsuranceProps {
  signer: Signer,
  contract: Contract
}

export const Insurance = (props: InsuranceProps) => {
  const [owner, setOwner] = useState('');
  const [contractAddress, setContractAddress] = useState('');

  useEffect(() => {
    const getInfo = async () => {
      const owner = await props.contract.owner();
      const address = await props.contract.getAddress();
      setOwner(owner);
      setContractAddress(address);
    }

    getInfo();
  })

  return (
    <div className="h-full w-full flex flex-col items-center">
      <h1 className="w-full text-center text-xl font-bold text-black mt-2">
        Solar Insurance Smart Contract
      </h1>
      <About owner={owner} deployment={contractAddress}/>
    </div>
  );
}

