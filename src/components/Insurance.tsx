import { Contract, Signer } from 'ethers';
import React, { useEffect, useState } from 'react';

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
        Solar Insurance Smart Contract {owner && `(${owner})`}
      </h1>
      <div className="w-fit h-fit bg-orange-transparent-8 px-6 py-3 my-4 rounded-md shadow-lg">
        {<h2 className="w-full text-center text-lg font-bold">About</h2>}
        <table>
          <tbody>
            {owner && (
              <tr className="h-6">
                <td className="pr-4">Owner:</td>
                <td>
                  <img src="assets/img/etherscan.png" className="h-6 inline" />
                  {'  '}
                  <a
                    href={`https://sepolia.etherscan.io/address/${owner}`}
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {owner}
                  </a>
                </td>
              </tr>
            )}
            {contractAddress && (
              <tr className="h-6">
                <td className="pr-4">Deployment:</td>
                <td>
                  <img src="assets/img/etherscan.png" className="h-6 inline" />
                  {'  '}
                  <a
                    href={`https://sepolia.etherscan.io/address/${contractAddress}`}
                    className="link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contractAddress}
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}