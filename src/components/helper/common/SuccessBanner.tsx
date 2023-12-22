import React, { useState } from 'react';

export const SuccessBanner = (props: {message: string}) => {
  const [hidden, setHidden] = useState(false);

  const hideBanner = () => {
    setHidden(true);
  }

  return (
    <div role="alert" className={`w-fit alert alert-success fixed bottom-4 left-4 cursor-pointer ${hidden && 'hidden'}`} onClick={hideBanner}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{props.message}</span>
    </div>
  );
};
