import React, { useContext, useEffect, useState } from "react";
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
import Dropdown from "../../components/commonComponents/Dropdown";

export default function ComponentConfig() {
  const { componentRights, getComponentRights, handleToast, usersList } =
    useContext(ProductData);
  const [rightName, setRightName] = useState("");
  const [isAccessibleRight, setIsAccessibleRight] = useState(false);
  const [usersListInfo, setUsersListInfo] = useState([]);
  const [selectedUser, setSelectUser] = useState({
    userId: null,
    userName: "Select User",
  });

  useEffect(() => {
    setUsersListInfo(usersList);
  }, [usersList]);

  useEffect(() => {
    if (selectedUser.userId) {
      getComponentRights(selectedUser.userId);
    }
  }, [selectedUser]);

  const handleAddRight = () => {
    addFeatures(selectedUser.userId, {
      featureName: rightName,
      featureValue: isAccessibleRight,
    }).then((res) => {
      handleToast(res.message, "success");
      setRightName("");
      setIsAccessibleRight(false);
      getComponentRights(selectedUser.userId);
    });
  };

  const handleUpdateRight = (id, value, rightName) => {
    updateFeatures(selectedUser.userId, {
      _id: id,
      featureName: rightName,
      featureValue: value,
    }).then((res) => {
      handleToast(res.message, "success");
      getComponentRights(selectedUser.userId);
    });
  };

  const handleDeleteRights = (id) => {
    deleteFeature(selectedUser.userId, id).then((res) => {
      handleToast(res.message, "success");
      getComponentRights(selectedUser.userId);
    });
  };

  return (
    <div className="md:mx-40 md:mt-10 m-4 flex md:justify-around md:flex-row flex-col md:gap-2 gap-4 ">
      <div>
        {usersListInfo.length > 0 && (
          <Dropdown
            dropdownList={usersListInfo}
            selectedItem={selectedUser}
            setSelecteditem={setSelectUser}
            listItemName="userName"
            showDownArraw
          />
        )}
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
            isChecked={isAccessibleRight}
            handleSwitch={(e) => {
              setIsAccessibleRight(e.target.checked);
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
            {!excludeFields.includes(item.featureName) && (
              <div className="flex justify-around my-4 items-center gap-10">
                <div className="flex-1">
                  <Label text={item.featureName} level={1} />
                </div>
                <SwitchButton
                  isChecked={item.featureValue}
                  handleSwitch={(e) =>
                    handleUpdateRight(
                      item._id,
                      e.target.checked,
                      item.featureName
                    )
                  }
                />
                <Button
                  handleClick={() => {
                    handleDeleteRights(item._id);
                  }}
                  disabled={componentRightsList.includes(item.featureName)}
                  leadingIcon={trashIcon}
                  bgNone={!componentRights.includes(item.featureName)}
                  textColor={
                    !componentRights.includes(item.featureName)
                      ? "text-error"
                      : ""
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
