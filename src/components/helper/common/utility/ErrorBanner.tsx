import React, { useState } from 'react';

/**
 * Component to show a banner with a red background at the bottom-left of the screen, displaying a message passed as a property at instantiation.
 * The banner is removed when clicking it.
 * 
 * @param props the message to display on the banner
 * @returns the ErrorBanner component
 */
export const ErrorBanner= (props: {message: string}) => {
  const [hidden, setHidden] = useState(false);

  /**
   * On click handler for the div which contains the banner.
   * Remove the banner when clicked, by toggling the 'hidden' state.
   */
  const hideBanner = () => {
    setHidden(true);
  };

  return (
    <div
      role="alert"
      className={`w-fit alert alert-error fixed bottom-4 left-4 cursor-pointer ${
        hidden && 'hidden'
      }`}
      onClick={hideBanner}
    >
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
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{props.message}</span>
    </div>
  );
}