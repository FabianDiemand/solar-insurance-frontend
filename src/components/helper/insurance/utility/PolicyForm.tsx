import React, { FormEvent } from 'react';

interface PolicyFormProps {
  submitAction: (event: FormEvent) => Promise<void>;
  insuredHoursLow: number;
  insuredHoursMid: number;
  insuredHoursHigh: number;

  submitButtonText: string;
}

export const PolicyForm = (props: PolicyFormProps) => {
  return (
    <>
      <form className="space-y-2" onSubmit={props.submitAction}>
        <div>
          <label htmlFor="risk" className="font-bold text-xs">
            Insured risk
          </label>
          <input
            id="risk"
            name="risk"
            type="range"
            min={0}
            max={2}
            defaultValue={1}
            className="range range-xs"
            step={1}
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span
              className="tooltip tooltip-bottom"
              data-tip={props.insuredHoursLow + ' hours'}
            >
              Low
            </span>
            <span
              className="tooltip tooltip-bottom"
              data-tip={props.insuredHoursMid + ' hours'}
            >
              Mid
            </span>
            <span
              className="tooltip tooltip-bottom"
              data-tip={props.insuredHoursHigh + ' hours'}
            >
              High
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="region" className="font-bold text-xs">
            Panel region
          </label>
          <select
            className="select select-sm select-bordered w-full max-w-xs bg-white"
            id="region"
            name="region"
            defaultValue={1}
          >
            <option value={1}>Switzerland North</option>
            <option value={0}>Switzerland South</option>
          </select>
        </div>

        <div>
          <label htmlFor="area" className="font-bold text-xs">
            Panel area
          </label>
          <input
            type="number"
            id="area"
            name="area"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-xs bg-white"
            min={1}
            defaultValue={1}
          />
        </div>
        <div className="w-full flex justify-center">
          <button type="submit" className="btn btn-sm btn-success">
            {props.submitButtonText}
          </button>
        </div>
      </form>
    </>
  );
};
