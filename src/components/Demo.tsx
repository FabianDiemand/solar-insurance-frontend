import { Contract, Signer } from 'ethers';
import React from 'react';

interface DemoProps {
  signer: Signer;
  contract: Contract;
}

export const Demo = ({}: DemoProps) => {
  return (
    <div className="h-full w-full bg-blue-300">
      Demo
    </div>
  );
};
