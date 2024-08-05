import React from "react";
import Label from "./Label";

export default function Checkbox({
  labelText,
  handleCheckbox,
  checked = false,
}) {
  return (
    <>
      <div class="flex items-center mb-4 gap-2">
        <input
          id="default-checkbox"
          type="checkbox"
          class="w-4 h-4 text-primary bg-background border-borderColor rounded-md "
          checked={checked}
          onChange={handleCheckbox}
        />
        {labelText && <Label text={labelText} />}
      </div>
    </>
  );
}
