import React from "react";

/**
 * Simple logo component, which displays at the top left of the screen and always above any other component.
 * @returns the Logo component
 */
export const Logo = () => {
  return (
    <img src='assets/logos/logo_w_text.png' className='h-[20%] absolute top-0 left-0 z-50'>
    </img>
  )
}