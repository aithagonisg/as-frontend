import React, { useContext, useState } from "react";
import { ProductData } from "../../Context";
import { excludeFields, componentRightsList } from "../../utils/exculdeFields";
import Button from "../../components/commonComponents/Button";
import {
  addFeatures,
  deleteFeature,
  updateFeatures,
} from "../../services/featureServices";
import { trashIcon } from "../../assets/svgIcons";

export default function ComponentConfig() {
  const { componentRights, getComponentRights } = useContext(ProductData);
  const [rightName, setRightName] = useState("");
  const [isAccessibleRight, setIsAccessibleRight] = useState({
    isAccessible: false,
  });
  const handleAddRight = () => {
    addFeatures({ [rightName]: isAccessibleRight }).then((res) => {
      console.log(res);
      setRightName("");
      setIsAccessibleRight({
        isAccessible: false,
      });
      getComponentRights();
    });
  };

  const handleUpdateRight = (id, value, rightName) => {
    updateFeatures([{ _id: id, [rightName]: { isAccessible: value } }]).then(
      (res) => {
        console.log(res);
        getComponentRights();
      }
    );
  };

  const handleDeleteRights = (id) => {
    deleteFeature(id).then((res) => {
      console.log(res);
      getComponentRights();
    });
  };

  return (
    <div className="mx-[10%]">
      <div className="flex justify-around">
        <div>
          {" "}
          <div className="flex flex-col gap-4 flex-1">
            <h1 className="font-bold text-2xl">Add Right Name & Values</h1>
            <input
              type="text"
              className="md:w-52 w-full"
              id="rightName"
              value={rightName ? rightName : ""}
              onChange={(e) => {
                setRightName(e.target.value);
              }}
            />
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isAccessibleRight.isAccessible}
                className="sr-only peer"
                onChange={(e) => {
                  setIsAccessibleRight({ isAccessible: e.target.checked });
                }}
              />
              <div className="relative w-9 h-5 bg-[pink] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
            <div className="w-32">
              <Button
                text="Add Right"
                bgColor="bg-primary"
                textColor="text-textSecondary"
                handleClick={handleAddRight}
                disabled={!rightName.length > 0}
              />
            </div>
          </div>
        </div>
        <div>
          {componentRights.map((item) => (
            <div className="mb-6">
              {Object.keys(item).map((right) => {
                return (
                  !excludeFields.includes(right) && (
                    <div className="flex justify-around my-4 items-center gap-10">
                      <div className="flex-1">{right}</div>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item[right].isAccessible}
                          className="sr-only peer"
                          onChange={(e) =>
                            handleUpdateRight(item._id, e.target.checked, right)
                          }
                        />
                        <div className="relative w-9 h-5 bg-[pink] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                      <button
                        className={`${
                          componentRightsList.includes(right)
                            ? "cursor-not-allowed text-grey-800/50"
                            : "cursor-pointer text-error"
                        }`}
                        onClick={() => {
                          handleDeleteRights(item._id);
                        }}
                        disabled={componentRightsList.includes(right)}
                      >
                        {trashIcon}
                      </button>
                    </div>
                  )
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
