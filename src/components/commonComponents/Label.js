import React from "react";

export default function Label({ text, level = 1 }) {
  const label = {
    1: <label className="text-textPrimary">{text}</label>,
    2: <label className="text-textPrimary text-sm">{text}</label>,
    3: <label className="text-textPrimary text-xs">{text}</label>,
  };
  return label[level];
}
