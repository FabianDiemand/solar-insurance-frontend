import React, { FormEvent } from 'react';

interface CreateSunshineRecordProps{
  createSunshineRecord: (event: FormEvent) => Promise<void>;
}

/**
 * Displays a form which takes parameters for a sunshine record (year, region and duration) as inputs and submits them using a function passed as a property on instantiation.
 * 
 * @param props the function called on submission of the form, taking the corresponding FormEvent
 * @returns the CreateSunshineRecord component
 */
export const CreateSunshineRecord = (props: CreateSunshineRecordProps) => {
  return (
    <>
      <h2 className="w-full text-center text-lg font-bold">
        Create Sunshine Record
      </h2>
      <div className="text-center text-sm">
        Create records for sunshine durations in certain years, that will allow
        to file claims for testing/ demo purposes.
      </div>
      <form className="space-y-2" onSubmit={props.createSunshineRecord}>
        <div>
          <label htmlFor="year" className="font-bold text-xs">
            Year
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

        <div>
          <label htmlFor="region" className="font-bold text-xs">
            Record region
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
          <label htmlFor="sunshine" className="font-bold text-xs">
            Hours of Sunshine
          </label>
          <input
            type="number"
            id="sunshine"
            name="sunshine"
            placeholder="Type here"
            className="input input-sm input-bordered w-full max-w-xs bg-white"
            min={1600}
            defaultValue={1701}
          />
        </div>

        <div className="w-full flex justify-center">
          <button className="btn btn-sm btn-success">Create Record</button>
        </div>
      </form>
    </>
  );
};
