import React from 'react';

interface CurrentlyActivePolicyProps {
  hasPolicy: boolean;
  policy: InsurancePolicy;
  extendPolicy: () => Promise<void>;
  deletePolicy: () => Promise<void>;
  displayPolicy: () => Promise<void>;
}

export type InsurancePolicy = {
  holder: string;
  region: string;
  insuredRisk: string;
  area: number;
  premium: string;
  registration: Date;
  validity: Date;
  claimTimeout: Date;
};

/**
 * Displays all information about the currently active policy of a user in a list. Furthermore it allows for deletion of the policy, the extension and a refresh of the current view.
 * 
 * @param props a toggle for if there is a policy, the policy to display and the functions to extend, delete and update the policy.
 * @returns the CurrentlyActivePolicy component
 */
export const CurrentlyActivePolicy = (props: CurrentlyActivePolicyProps) => {
  return (
    <>
      <h2 className="w-full text-center text-lg font-bold">
        Currently Active Policy
      </h2>
      {props.hasPolicy && (
        <div className="space-y-1">
          <div>
            <div className="font-bold text-xs">
              Policy Holder
            </div>
            <div
              className="w-full truncate tooltip tooltip-top"
              data-tip={props.policy.holder}
            >
              {props.policy.holder}
            </div>
          </div>
          <div>
            <div className="font-bold text-xs">Location</div>
            <div className="truncate">{props.policy.region}</div>
          </div>
          <div>
            <div className="font-bold text-xs">Insured Risk</div>
            <div className="truncate">{props.policy.insuredRisk}</div>
          </div>
          <div>
            <div className="font-bold text-xs">Panel Area</div>
            <div className="truncate">
              {props.policy.area + ' m'}
              <sup>2</sup>
            </div>
          </div>
          <div>
            <div className="font-bold text-xs">Premium</div>
            <div className="truncate">{props.policy.premium + ' ETH'}</div>
          </div>
          <div>
            <div className="font-bold text-xs">Registration</div>
            <div className="truncate">
              {props.policy.registration?.toLocaleDateString('ch-CH')}
            </div>
          </div>
          <div>
            <div className="font-bold text-xs">Validity</div>
            <div className="truncate">
              {props.policy.validity?.toLocaleDateString('ch-CH')}
            </div>
          </div>
          <div>
            <div className="font-bold text-xs">Next Claim</div>
            <div className="truncate">
              {props.policy.claimTimeout?.toLocaleDateString('ch-CH')}
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex flex-row justify-around space-x-2">
        <button className="btn btn-sm btn-success" onClick={props.extendPolicy}>
          Extend Policy
        </button>
        <button className="btn btn-sm btn-error" onClick={props.deletePolicy}>
          Delete Policy
        </button>
      </div>
      <div className="w-full flex flex-row justify-around space-x-2">
        <button
          className="btn btn-sm btn-neutral"
          onClick={props.displayPolicy}
        >
          Refresh View
        </button>
      </div>
    </>
  );
};
