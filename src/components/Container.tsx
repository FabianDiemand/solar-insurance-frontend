import React from "react";

export const Container = () => {
  return (
    <div className="size-5/6 flex flex-col items-center">
      <div role="tablist" className="w-[60%] tabs">
        <a role="tab" id="insurance" className="tab tab-active">
          Insurance
        </a>
        <a role="tab" id="demo" className="tab">
          Demo
        </a>
      </div>
      <div className="size-full bg-gray-transparent-9 rounded-3xl"></div>
    </div>
  );

}