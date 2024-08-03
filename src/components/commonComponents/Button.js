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
      className={`font-bold py-2 px-4 rounded inline-flex items-center ${
        disabled
          ? `bg-grey-800/50 cursor-not-allowed`
          : `${bgColor} cursor-pointer`
      } ${textColor}`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span>{text}</span>
    </button>
  );
}
