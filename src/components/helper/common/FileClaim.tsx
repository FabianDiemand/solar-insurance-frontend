import React, { FormEvent } from 'react';

interface FileClaimProps {
  isDemo: boolean;
  fileClaim: (event: FormEvent) => Promise<void>;
}

export const FileClaim = (props: FileClaimProps) => {
  return (
    <>
      <h2 className="w-full text-center text-lg font-bold">File Claim</h2>
      {props.isDemo && (
        <div className="text-center text-sm">
          File claims without the assertions that are in place for the
          productive method of the contract.
        </div>
      )}
      <form className="space-y-2" onSubmit={props.fileClaim}>
        <div>
          <label htmlFor="year" className="font-bold text-xs">
            Claim Year
          </label>
          <input
            type="number"
            id="year"
            name="year"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-xs bg-white"
            min={2023}
            defaultValue={2023}
          />
        </div>
        <div className="w-full flex justify-center">
          <button className="btn btn-sm btn-error">File Claim</button>
        </div>
      </form>
    </>
  );
};
