import React from 'react';
import { EtherscanLink } from './utility/EtherscanLink';
interface AboutProps{
  owner: string,
  deployment: string
}

/**
 * Displays some meta information about the contract (owner and contract address) as links to etherscan.
 * 
 * @param props the owner and contract address
 * @returns the AboutContract component
 */
export const AboutContract = (props: AboutProps) => {
  return (
    <div className="w-fit h-fit bg-gray-transparent px-6 py-3 my-4 rounded-md shadow-lg">
      <h2 className="w-full text-center text-lg font-bold">About Contract</h2>
      <table>
        <tbody>
          <EtherscanLink title="Owner" address={props.owner} />
          <EtherscanLink title="Contract" address={props.deployment} />
        </tbody>
      </table>
    </div>
  );
}