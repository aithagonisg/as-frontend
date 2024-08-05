import React from "react";
import { correct, error, warning } from "../../assets/svgIcons";

export default function Toaster({ icon, text, isShow }) {
  const iconName = {
    success: correct,
    error: error,
    warning: warning,
  };

  const getBgClass = {
    success: "text-primary",
    error: "text-error",
    warning: "text-warning",
  };

  return (
    <>
      {isShow && (
        <div
          id="toast-success"
          class={`flex items-center gap-2 h-12 w-full max-w-xs p-4 mb-4 font-bold bg-background rounded-md shadow absolute right-4 top-14 ${getBgClass[icon]}`}
          role="alert"
        >
          <span>{iconName && iconName[icon]}</span>
          <span>{text}</span>
        </div>
      )}
    </>
  );
}
