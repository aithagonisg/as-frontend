import React, { useState } from "react";
import Button from "./Button";
import { downArrow } from "../../assets/svgIcons";

export default function Dropdown({
  selectedItem,
  setSelecteditem,
  heading,
  dropdownList,
  showDownArraw,
  listItemName = "name",
}) {
  const [showList, setShowList] = useState(false);

  const handleSelectItem = (selecteditemData) => {
    setSelecteditem(selecteditemData);
    setShowList(false);
  };

  return (
    <>
      <Button
        text={
          selectedItem && selectedItem[listItemName]
            ? selectedItem[listItemName]
            : heading || "Select Item"
        }
        bgColor={`relative mb-1 ${
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
          <div
            id="dropdown"
            class="z-50 top-auto bg-background divide-y rounded-md shadow w-40 p-2 absolute border-borderColor"
          >
            <ul aria-labelledby="dropdownDefaultButton">
              {dropdownList.map((item) => (
                <li
                  onClick={() => {
                    handleSelectItem(item);
                  }}
                  className="py-1 cursor-pointer"
                >
                  {item[listItemName]}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
}
