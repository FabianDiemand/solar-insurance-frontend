import React from "react";

import { Insurance } from './Insurance';
import { Demo } from './Demo';

import { useState } from 'react';

export const Container = () => {
  const [insuranceActive, setInsuranceActive] = useState(true);
  const [demoActive, setDemoActive] = useState(false);

  const onDemoClicked = () => {
    setDemoActive(true);
    setInsuranceActive(false);
  }

  const onInsuranceClicked = () => {
    setInsuranceActive(true);
    setDemoActive(false);
  }

  return (
    <div className="size-5/6 flex flex-col items-center">
      <div role="tablist" className="w-[60%] tabs">
        <a role="tab" id="insurance" className={`tab ${insuranceActive && 'tab-active pointer-events-none'}`} onClick={onInsuranceClicked}>
          Insurance
        </a>
        <a role="tab" id="demo" className={`tab ${demoActive && 'tab-active pointer-events-none'}`} onClick={onDemoClicked}>
          Demo
        </a>
      </div>
      <div className="size-full bg-gray-transparent-9 rounded-3xl p-4">
        {insuranceActive && <Insurance/>}
        {demoActive && <Demo/>}
      </div>
    </div>
  );
}