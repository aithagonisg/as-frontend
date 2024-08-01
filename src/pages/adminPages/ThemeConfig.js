import React, { useContext, useEffect, useState } from "react";
import { ProductData } from "../../Context";
import Button from "../../components/commonComponents/Button";
import { trashIcon } from "../../assets/svgIcons";
import { deleteTheme, updateTheme } from "../../services/themeServices";

export default function ThemeConfig() {
  const { themeConfig } = useContext(ProductData);
  const [themeData, setThemeData] = useState([]);

  useEffect(() => {
    setThemeData(themeConfig);
  }, [themeConfig]);

  const excludeFields = ["_id", "__v"];
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
    setThemeData(filterData);
  };

  const updateThemeData = () => {
    updateTheme(themeData).then((res) => console.log(res));
  };
  const handleDeltetheme = (id) => {
    const filterData = themeData.filter((item) => item._id !== id);
    setThemeData(filterData);
    deleteTheme(id).then((res) => console.log(res));
  };
  return (
    <>
      <div className="flex justify-end w-full mr-4">
        <div className="mr-2">
          <Button
            text="Update Theme"
            bgColor="bg-tertiary"
            textColor="text-textSecondary"
            handleClick={updateThemeData}
          />
        </div>

        <Button
          text="Add Theme"
          bgColor="bg-primary"
          textColor="text-textSecondary"
        />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        {themeData.map((item) =>
          Object.keys(item).map((theme) => (
            <>
              {!excludeFields.includes(theme) && (
                <div className="w-[40%] ">
                  <div className="flex justify-center items-center">
                    <div className="flex-1 w-32 truncate">{theme}</div>
                    <input
                      type="color"
                      value={item[theme].value}
                      className="w-32 flex-1"
                      onChange={(e) =>
                        handleColorChange(item._id, e.target.value, theme)
                      }
                    />
                    <div
                      className="text-error flex-1 cursor-pointer"
                      onClick={() => {
                        handleDeltetheme(item._id);
                      }}
                    >
                      {trashIcon}
                    </div>
                  </div>
                </div>
              )}
            </>
          ))
        )}
      </div>
    </>
  );
}
