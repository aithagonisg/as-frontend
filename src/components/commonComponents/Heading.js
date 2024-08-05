import React from "react";

export default function Heading({
  level = 1,
  text,
  boldClass,
  shouldTruncate,
}) {
  const levelHeading = {
    1: (
      <h1
        className={`${boldClass} text-2xl text-textPrimary ${
          shouldTruncate ? "truncate" : ""
        }`}
      >
        {text}
      </h1>
    ),
    2: (
      <h2
        className={`${boldClass} text-xl  text-textPrimary  ${
          shouldTruncate ? "truncate" : ""
        }`}
      >
        {text}
      </h2>
    ),
    3: (
      <h3
        className={`${boldClass}  text-textPrimary  ${
          shouldTruncate ? "truncate" : ""
        }`}
      >
        {text}
      </h3>
    ),
    4: (
      <h4
        className={`${boldClass} tex-sm  text-textPrimary  ${
          shouldTruncate ? "truncate" : ""
        }`}
      >
        {text}
      </h4>
    ),
    5: (
      <h5
        className={`${boldClass} text-xs  text-textPrimary  ${
          shouldTruncate ? "truncate" : ""
        }`}
      >
        {text}
      </h5>
    ),
  };
  return levelHeading[level];
}
