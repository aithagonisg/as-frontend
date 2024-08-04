import React, { useContext, useEffect, useState } from "react";
import { ProductData } from "../../Context";
import Button from "../../components/commonComponents/Button";
import { trashIcon } from "../../assets/svgIcons";
import {
  addtheme,
  deleteTheme,
  getThemes,
  updateTheme,
} from "../../services/themeServices";
import { excludeFields, themeRights } from "../../utils/exculdeFields";

export default function ThemeConfig() {
  const { themeConfig, getThemeValues } = useContext(ProductData);
  const [themeData, setThemeData] = useState([]);
  const [themeName, setThemeName] = useState("");
  const [themeValue, setThemeValue] = useState("");

  useEffect(() => {
    setThemeData(themeConfig);
  }, [themeConfig]);

  const handleColorChange = (id, color, themeName) => {
    const filterData = themeData.map((item) => {
      if (item._id === id) {
        return {
          ...item,
          [themeName]: {
            value: color,
          },
        };
      }
      return item;
    });
    updateTheme(filterData).then((res) => {
      getThemeValues();
    });
  };

  const handleDeltetheme = (id) => {
    deleteTheme(id).then((res) => {
      getThemeValues();
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
    addtheme({
      [themeName]: {
        value: themeValue,
      },
    }).then((res) => {
      setThemeName("");
      setThemeValue("");
      getThemeValues();
    });
  };

  return (
    <div className="md:mx-40 md:mt-10 m-4 flex md:justify-around md:flex-row flex-col md:gap-2 gap-4">
      <div className="flex flex-col gap-4 md:flex-none flex-1">
        <h1 className="font-bold text-2xl">Add Theme Name & Values</h1>
        <input
          type="text"
          className="md:w-52 w-full"
          id="themeName"
          value={themeName ? themeName : ""}
          onChange={handleTheme}
        />
        <input
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
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-4 justify-center md:items-start items-stretch">
          {themeData.length > 0 && (
            <div className="font-semibold text-xl">Available Themes</div>
          )}
          {themeData.map((item) =>
            Object.keys(item).map((theme) => (
              <>
                {!excludeFields.includes(theme) && (
                  <div className="mt-4">
                    <div className="flex md:justify-center md:items-center justify-between gap-4">
                      <div className="md:w-32 truncate md:flex-none flex-1">
                        {theme}
                      </div>
                      <input
                        type="color"
                        value={item[theme].value}
                        className="md:w-32 md:flex-none flex-1"
                        onChange={(e) =>
                          handleColorChange(item._id, e.target.value, theme)
                        }
                      />
                      <button
                        className={`  ${
                          themeRights.includes(theme)
                            ? "cursor-not-allowed text-grey-800/50"
                            : "cursor-pointer text-error"
                        }`}
                        onClick={() => {
                          handleDeltetheme(item._id);
                        }}
                        disabled={themeRights.includes(theme)}
                      >
                        {trashIcon}
                      </button>
                    </div>
                  </div>
                )}
              </>
            ))
          )}
          {themeData.length === 0 && (
            <div className="font-semibold text-xl">
              Theme List is empty please add theme Values
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
