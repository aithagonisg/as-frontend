import React from "react";

export default function TextArea({
  rows = 4,
  placeholder = "Write your thoughts here...",
  onChange,
  value = "",
}) {
  return (
    <textarea
      id="message"
      rows={rows}
      className="block p-2.5 w-full text-sm text-textPrimary bg-background rounded-md border border-borderColor focus:outline-none"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    ></textarea>
  );
}
