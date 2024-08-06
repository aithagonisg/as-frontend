import React from "react";
import Label from "./Label";

export default function Checkbox({
  id,
  labelText,
  handleCheckbox,
  checked = false,
}) {
  return (
    <>
      <div class="flex items-center mb-4 gap-2">
        <input
          id={id}
          type="checkbox"
          class="w-4 h-4 text-primary bg-background border-borderColor rounded-md "
          checked={checked}
          onChange={() =>
            handleCheckbox({ target: { id: id, value: !checked } })
          }
        />
        {labelText && <Label text={labelText} />}
      </div>
    </>
  );
}
