import React from 'react';
import { EtherscanLink } from './EtherscanLink';
interface AboutProps{
  owner: string,
  deployment: string
}

export const AboutContract = (props: AboutProps) => {
  return (
    <div className="w-fit h-fit bg-orange-transparent-8 px-6 py-3 my-4 rounded-md shadow-lg">
      {<h2 className="w-full text-center text-lg font-bold">About Contract</h2>}
      <table>
        <tbody>
          {props.owner && <EtherscanLink title="Owner" address={props.owner} />}
          {props.deployment && (
            <EtherscanLink title="Contract" address={props.deployment} />
          )}
        </tbody>
      </table>
    </div>
  );
}