import React, { FormEvent } from 'react';
import { PolicyForm } from './utility/PolicyForm';

interface CalculatePremiumProps {
  submitAction: (event: FormEvent) => Promise<void>;
  insuredHoursLow: number;
  insuredHoursMid: number;
  insuredHoursHigh: number;

  submitButtonText: string;

  showPremium: boolean;
  premium: string;
}

export const CalculatePremium = (props: CalculatePremiumProps) => {
  return (
    <>
      <h2 className="w-full text-center text-lg font-bold">
        Calculate Premium
      </h2>
      <div className="text-center text-sm">
        Find out which yearly premium applies to your desired policy.
      </div>
      <PolicyForm
        submitAction={props.submitAction}
        insuredHoursLow={props.insuredHoursLow}
        insuredHoursMid={props.insuredHoursMid}
        insuredHoursHigh={props.insuredHoursHigh}
        submitButtonText={props.submitButtonText}
      />
      {props.showPremium && (
        <p>{`The yearly premium for this policy is ${props.premium} ETH.`}</p>
      )}
    </>
  );
};
