import React from 'react'

interface NavigationProps{
  insuranceActive: boolean;
  demoActive: boolean;
  flipViews: () => void;
}

export const Navigation = (props: NavigationProps) => {
  return (
    <div role="tablist" className="w-[60%] tabs">
      <a
        role="tab"
        id="insurance"
        className={`tab ${props.insuranceActive && 'tab-active pointer-events-none'}`}
        onClick={props.flipViews}
      >
        Insurance
      </a>
      <a
        role="tab"
        id="demo"
        className={`tab ${props.demoActive && 'tab-active pointer-events-none'}`}
        onClick={props.flipViews}
      >
        Demo
      </a>
    </div>
  );
}