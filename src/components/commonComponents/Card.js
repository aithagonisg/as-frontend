import React from "react";

export default function Card({ img, children }) {
  return (
    <div className="bg-background border w-[320px] h-[320px] border-borderColor rounded-md shadow">
      <div className="[320px] h-[240px] justify-center flex">
        <img src={img} alt="" />
      </div>

      <hr />
      <div className="px-2 py-0.5">{children}</div>
    </div>
  );
}
