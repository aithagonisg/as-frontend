import React from "react";

export default function Input({
  id,
  onChange,
  type,
  disabled = false,
  label = "",
  required = false,
  placeholder = "",
  value,
  customClass = "",
}) {
  return (
    <div className={customClass}>
      <div>
        {label && (
          <label
            for={id}
            className="block mb-2 text-sm font-medium text-textPrimary"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={`bg-background border border-borderColor text-textPrimary text-sm rounded-md  px-2 focus:outline-none w-full h-10 ${
            disabled ? "text-textDisabled cursor-not-allowed" : ""
          }`}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          disabled={disabled}
          value={value}
        />
      </div>
    </div>
  );
}
