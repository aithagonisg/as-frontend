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
            class="block mb-2 text-sm font-medium text-textPrimary"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          class="bg-background border border-borderColor text-textPrimary text-sm rounded-md p-1 focus:outline-none w-full h-10"
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
