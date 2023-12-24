import React from 'react';

interface SunshineRecordsProps{
  hasRecords: boolean;
  sunshineRecords: any[];
  getSunshineRecords: () => void;
}

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
                  <td>Sunshine Duration</td>
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
