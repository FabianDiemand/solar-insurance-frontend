import React from 'react';

import { Metamask } from './helper/metamask/Metamask';
import { Insurance } from './Insurance';
import { Demo } from './Demo';

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { connectedState } from './helper/metamask/Metamask.atoms';
import { Navigation } from './helper/navigation/Navigation';

export const Container = () => {
  const connected = useRecoilValue(connectedState);

  const [insuranceActive, setInsuranceActive] = useState(true);
  const [demoActive, setDemoActive] = useState(false);

  const flipViews = () => {
    setInsuranceActive(!insuranceActive);
    setDemoActive(!demoActive);
  };

  return (
    <>
      {!connected && <Metamask />}
      <div className={`size-5/6 flex flex-col items-center text-black ${!connected && 'pointer-events-none'}`}>
        <Navigation insuranceActive={insuranceActive} demoActive={demoActive} flipViews={flipViews}/>
        <div className="size-full bg-gray-transparent-9 rounded-3xl p-4">
          {insuranceActive && <Insurance />}
          {demoActive && <Demo/>}
        </div>
      </div>
    </>
  );
};
