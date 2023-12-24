import React, { FormEvent } from 'react';

interface FundContractProps {
  hasBalance: boolean;
  balance: string;
  fundContract: (event: FormEvent) => Promise<void>;
}

export const FundContract = (props: FundContractProps) => {
  return (
    <>
      <h2 className="w-full text-center text-lg font-bold">Fund Contract</h2>
      <div className="text-center text-sm">
        Fund the contract with some ETH in order to be able of paying out funds.
      </div>
      {props.hasBalance && <div>Current Balance: {props.balance} ETH</div>}
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
