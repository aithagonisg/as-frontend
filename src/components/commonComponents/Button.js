import React from "react";

export default function Button({
  text,
  bgColor,
  textColor,
  handleClick,
  disabled = false,
}) {
  return (
    <button
      className={`font-bold py-2 px-4 rounded inline-flex items-center ${bgColor} ${textColor}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
}
