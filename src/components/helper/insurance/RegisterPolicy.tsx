import React, { FormEvent } from 'react';
import { PolicyForm } from './utility/PolicyForm';

interface RegisterPolicyProps{
  submitAction: (event: FormEvent) => Promise<void>;
  insuredHoursLow: number;
  insuredHoursMid: number;
  insuredHoursHigh: number;

  submitButtonText: string;
}

export const RegisterPolicy = (props: RegisterPolicyProps) => {
  return (
    <>
      <h2 className="w-full text-center text-lg font-bold">Register Policy</h2>
      <div className="text-center text-sm">
        Register for a Solar Insurance policy.
      </div>
      <PolicyForm
        submitAction={props.submitAction}
        insuredHoursLow={props.insuredHoursLow}
        insuredHoursMid={props.insuredHoursMid}
        insuredHoursHigh={props.insuredHoursHigh}
        submitButtonText={props.submitButtonText}
      />
    </>
  );
}