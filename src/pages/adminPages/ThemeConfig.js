import React, { useContext, useEffect, useState } from "react";
import { ProductData } from "../../Context";
import Button from "../../components/commonComponents/Button";
import { trashIcon } from "../../assets/svgIcons";
import {
  addtheme,
  deleteTheme,
  updateTheme,
} from "../../services/themeServices";
import { excludeFields, themeRights } from "../../utils/exculdeFields";
import Input from "../../components/commonComponents/Input";
import Heading from "../../components/commonComponents/Heading";
import Label from "../../components/commonComponents/Label";
import Dropdown from "../../components/commonComponents/Dropdown";
export default function ThemeConfig() {
  const { themeConfig, getThemeValues, handleToast, usersList } =
    useContext(ProductData);
  const [themeName, setThemeName] = useState("");
  const [themeValue, setThemeValue] = useState("");
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
      getThemeValues(selectedUser.userId);
    }
  }, [selectedUser]);

  const handleColorChange = (id, color, themeName) => {
    updateTheme(selectedUser.userId, {
      _id: id,
      themeName: themeName,
      themeValue: color,
    }).then((res) => {
      handleToast(res.message, "success");
      getThemeValues(selectedUser.userId);
    });
  };

  const handleDeltetheme = (id) => {
    deleteTheme(selectedUser.userId, id).then((res) => {
      handleToast(res.message, "success");
      getThemeValues(selectedUser.userId);
    });
  };

  const handleTheme = (e) => {
    if (e.target.id === "themeName") {
      setThemeName(e.target.value);
    } else {
      setThemeValue(e.target.value);
    }
  };

  const handleAddTheme = () => {
    addtheme(selectedUser.userId, {
      themeName: themeName,
      themeValue: themeValue,
    }).then((res) => {
      handleToast(res.message, "success");
      setThemeName("");
      setThemeValue("");
      getThemeValues(selectedUser.userId);
    });
  };

  return (
    <div className="md:mx-40 md:mt-10 m-4 flex md:justify-around md:flex-row flex-col md:gap-2 gap-4">
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
        <div className="flex flex-col gap-4 md:flex-none flex-1">
          <Heading
            level={1}
            text="Add Theme Name & Values"
            boldClass="font-bold"
          />
          <Input
            type="text"
            className="md:w-52 w-full"
            id="themeName"
            value={themeName ? themeName : ""}
            onChange={handleTheme}
            placeholder="Add Theme"
          />
          <Input
            type="color"
            className="md:w-52 w-full"
            id="value"
            value={themeValue ? themeValue : "#33333"}
            onChange={handleTheme}
          />
          <div className="w-32">
            <Button
              text="Add Theme"
              bgColor="bg-primary"
              textColor="text-textSecondary"
              handleClick={handleAddTheme}
              disabled={!themeName.length > 0}
              bgNone={false}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 justify-center md:items-start items-stretch">
          {themeConfig.length > 0 && (
            <Heading
              level={2}
              text="Available Themes"
              boldClass="font-semibold"
            />
          )}
          {themeConfig.map((item) => (
            <>
              {!excludeFields.includes(item.themeName) && (
                <div className="mt-4">
                  <div className="flex md:justify-center md:items-center justify-between gap-4">
                    <div className="md:w-32 truncate md:flex-none flex-1">
                      <Label text={item.themeName} />
                    </div>
                    <div className="md:w-32 md:flex-none flex-1">
                      <Input
                        type="color"
                        value={item.themeValue}
                        onChange={(e) =>
                          handleColorChange(
                            item._id,
                            e.target.value,
                            item.themeName
                          )
                        }
                      />
                    </div>
                    <Button
                      text=""
                      handleClick={() => {
                        handleDeltetheme(item._id);
                      }}
                      leadingIcon={trashIcon}
                      disabled={themeRights.includes(item.themeName)}
                      bgNone={themeRights.includes(item.themeName)}
                      textColor={
                        !themeRights.includes(item.themeName)
                          ? "text-error"
                          : ""
                      }
                    />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
