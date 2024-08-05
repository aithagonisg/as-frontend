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
import SwitchButton from "../../components/commonComponents/SwitchButton";
import Input from "../../components/commonComponents/Input";
import Heading from "../../components/commonComponents/Heading";
import Label from "../../components/commonComponents/Label";

export default function ComponentConfig() {
  const { componentRights, getComponentRights, handleToast } =
    useContext(ProductData);
  const [rightName, setRightName] = useState("");
  const [isAccessibleRight, setIsAccessibleRight] = useState({
    isAccessible: false,
  });

  const handleAddRight = () => {
    addFeatures({ [rightName]: isAccessibleRight }).then((res) => {
      handleToast(res.message, "success");
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
        handleToast(res.message, "success");
        getComponentRights();
      }
    );
  };

  const handleDeleteRights = (id) => {
    deleteFeature(id).then((res) => {
      handleToast(res.message, "success");
      getComponentRights();
    });
  };

  return (
    <div className="md:mx-40 md:mt-10 m-4 flex md:justify-around md:flex-row flex-col md:gap-2 gap-4 ">
      <div>
        <div className="flex flex-col gap-4 flex-1">
          <Heading
            level={1}
            text="Add Right Name & Values"
            boldClass="font-bold"
          />
          <Input
            type="text"
            className="md:w-52 w-full"
            id="rightName"
            value={rightName ? rightName : ""}
            onChange={(e) => {
              setRightName(e.target.value);
            }}
            placeholder="Add Right"
          />
          <SwitchButton
            isChecked={isAccessibleRight.isAccessible}
            handleSwitch={(e) => {
              setIsAccessibleRight({ isAccessible: e.target.checked });
            }}
          />
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
        {componentRights.length > 0 && (
          <Heading level={2} text="Availble rights" boldClass="font-semibold" />
        )}
        {componentRights.map((item) => (
          <div className="mb-6">
            {Object.keys(item).map((right) => {
              return (
                !excludeFields.includes(right) && (
                  <div className="flex justify-around my-4 items-center gap-10">
                    <div className="flex-1">
                      <Label text={right} level={1} />
                    </div>
                    <SwitchButton
                      isChecked={item[right].isAccessible}
                      handleSwitch={(e) =>
                        handleUpdateRight(item._id, e.target.checked, right)
                      }
                    />
                    <Button
                      handleClick={() => {
                        handleDeleteRights(item._id);
                      }}
                      disabled={componentRightsList.includes(right)}
                      leadingIcon={trashIcon}
                      bgNone={!componentRights.includes(right)}
                      textColor={
                        !componentRights.includes(right) ? "text-error" : ""
                      }
                    />
                  </div>
                )
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
