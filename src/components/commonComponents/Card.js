import React from "react";

export default function Card({ img, children }) {
  return (
    <div className="bg-background border w-[320px] h-[320px] border-borderColor rounded-md shadow ">
      <div className="h-[190px] w-[318.5px] flex-shrink-0 overflow-hidden rounded-t-md ">
        <img
          src={img}
          alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
          className="h-full w-full object-cover object-center"
        />
      </div>

      <hr />
      <div className="px-2 py-0.5">{children}</div>
    </div>
  );
}
