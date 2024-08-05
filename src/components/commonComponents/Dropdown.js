import React, { useState } from "react";
import Button from "./Button";
import { downArrow } from "../../assets/svgIcons";
import Label from "./Label";

export default function Dropdown({
  selectedItem,
  setSelecteditem,
  heading,
  dropdownList,
  showDownArraw,
  children,
}) {
  const [showList, setShowList] = useState(false);

  const handleSelectItem = (selecteditem) => {
    setSelecteditem(selectedItem);
  };

  return (
    <>
      <Button
        text={selectedItem ? selectedItem : heading || "Select Item"}
        bgColor={`relative ${
          showDownArraw
            ? "bg-background h-10 w-40 border border-borderColor"
            : ""
        }`}
        handleClick={() => {
          setShowList(!showList);
        }}
        textColor="text-textPrimary"
        endIcon={showDownArraw ? downArrow : ""}
      />
      {showList && (
        <>
          {children ? (
            children
          ) : (
            <div
              id="dropdown"
              class="z-50 bg-background divide-y rounded-md shadow w-40 p-2 relative top-[-12px] border-borderColor"
            >
              <ul aria-labelledby="dropdownDefaultButton">
                {dropdownList.map((item) => (
                  <li
                    onClick={() => {
                      handleSelectItem(item);
                    }}
                    className="py-1"
                  >
                    <Label text={item.name} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}
