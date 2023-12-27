import React, { useEffect } from 'react';

interface SunshineRecordsProps{
  hasRecords: boolean;
  sunshineRecords: any[];
  getSunshineRecords: () => void;
}

/**
 * The component displays a table of recorded annual sunshine durations and a button to update the records.
 * No table will be shown, if no records are existing or the passed property is empty.
 * 
 * @param props a boolean to specify if records are existing, the array containing sunshine records and a method to trigger when updating the records
 * @returns the SunshineRecords component
 */
export const SunshineRecords = (props: SunshineRecordsProps) => {
  return (
    <>
      <h2 className="w-full text-center text-lg font-bold">Sunshine Records</h2>
      {props.hasRecords && (
        <>
          <div className="overflow-x-auto w-full">
            <table className="table table-xs table-pin-rows table-pin-cols w-full">
              <thead>
                <tr className="bg-gray-transparent text-black">
                  <td>Year</td>
                  <td>Sunshine Hours</td>
                  <td>Region</td>
                </tr>
              </thead>
              <tbody>
                {props.sunshineRecords.map((record, i) => {
                  return (
                    <tr key={i}>
                      <td>{Number.parseInt(record[2])}</td>
                      <td>{Number.parseInt(record[3])}</td>
                      <td>{record[1]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="w-full flex flex-row justify-around space-x-2">
        <button className="btn btn-sm btn-neutral" onClick={props.getSunshineRecords}>
          Refresh View
        </button>
      </div>
    </>
  );
};
