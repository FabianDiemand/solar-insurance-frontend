import React, { FormEvent } from 'react';
import { ReloadButton } from './ReloadButton';

interface FundContractProps {
  hasBalance: boolean;
  balance: string;
  fundContract: (event: FormEvent) => Promise<void>;
  reload: () => Promise<void>
}

/**
 * Displays the balance of the contract and a form which takes in a number input for how many ether to fund the smart contract with when submitting the form using a function passed at instantiation.
 * Furthermore, there is a reload icon displayed to update balance of the contract.
 * 
 * @param props a boolean toggle for if there is a balance to be displayed, the balance to display, a function to handle the submission of the form and a reload function to update the balance
 * @return the FundContract component
 */
export const FundContract = (props: FundContractProps) => {
  return (
    <>
      <h2 className="w-full text-center text-lg font-bold">Fund Contract</h2>
      <div className="text-center text-sm">
        Fund the contract with some ETH in order to be able of paying out funds.
      </div>
      {props.hasBalance && (
        <div className="space-x-2">
          <span>Current Balance: {props.balance} ETH</span>{' '}
          <ReloadButton onClick={props.reload} />
        </div>
      )}
      <form className="space-y-2" onSubmit={props.fundContract}>
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
    </>
  );
};
