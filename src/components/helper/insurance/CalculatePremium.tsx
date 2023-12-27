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

/**
 * Displays the component which allows the user to calculate the premium for a certain policy configuration.
 * 
 * @param props the function to trigger on submit of the form, insured hours for the risk levels and the text for the submit button of the form
 * @returns the CalculatePremium component
 */
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
