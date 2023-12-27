import React from 'react'

interface NavigationProps{
  insuranceActive: boolean;
  demoActive: boolean;
  flipViews: () => void;
}

/**
 * Navigation component displaying two tabs to switch between the main and demo views.
 * 
 * @param props two toggles for which view is active and a function to switch between them
 * @returns the Navigation component
 */
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