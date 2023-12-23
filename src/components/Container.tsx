import React from 'react';

import { Metamask } from './helper/metamask/Metamask';
import { Insurance } from './Insurance';
import { Demo } from './Demo';

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { connectedState } from './helper/metamask/Metamask.atoms';

export const Container = () => {
  const connected = useRecoilValue(connectedState);

  const [insuranceActive, setInsuranceActive] = useState(false);
  const [demoActive, setDemoActive] = useState(true);

  const flipViews = () => {
    setInsuranceActive(!insuranceActive);
    setDemoActive(!demoActive);
  };

  return (
    <>
      {!connected && <Metamask />}
      <div className={`size-5/6 flex flex-col items-center text-black ${!connected && 'pointer-events-none'}`}>
        <div role="tablist" className="w-[60%] tabs">
          <a
            role="tab"
            id="insurance"
            className={`tab ${
              insuranceActive && 'tab-active pointer-events-none'
            }`}
            onClick={flipViews}
          >
            Insurance
          </a>
          <a
            role="tab"
            id="demo"
            className={`tab ${demoActive && 'tab-active pointer-events-none'}`}
            onClick={flipViews}
          >
            Demo
          </a>
        </div>
        <div className="size-full bg-gray-transparent-9 rounded-3xl p-4">
          {insuranceActive && <Insurance />}
          {demoActive && <Demo/>}
        </div>
      </div>
    </>
  );
};
