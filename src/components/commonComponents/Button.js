import React from "react";

export default function Button({
  text,
  bgColor,
  textColor,
  handleClick,
  disabled = false,
  leadingIcon,
  endIcon,
  bgNone,
}) {
  return (
    <button
      className={`font-bold py-2 px-2 rounded inline-flex items-center  ${
        disabled
          ? `cursor-not-allowed text-textPrimary  ${
              bgNone ? "" : "bg-disabled"
            }`
          : `${bgColor && !bgNone ? bgColor : ""} ${
              !textColor ? "text-textSecondary" : `${textColor}`
            } cursor-pointer`
      }`}
      onClick={handleClick}
      disabled={disabled}
    >
      <span
        className={`flex items-center w-full ${
          (leadingIcon && text) || (endIcon && text)
            ? "justify-between"
            : "justify-center"
        }`}
      >
        {leadingIcon && <span>{leadingIcon ? leadingIcon : ""}</span>}
        {text && <span>{text}</span>}
        {endIcon && <span>{endIcon ? endIcon : ""}</span>}
      </span>
    </button>
  );
}
