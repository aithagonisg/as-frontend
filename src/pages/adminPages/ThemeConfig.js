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
export default function ThemeConfig() {
  const { themeConfig, getThemeValues, handleToast } = useContext(ProductData);
  const [themeData, setThemeData] = useState([]);
  const [themeName, setThemeName] = useState("");
  const [themeValue, setThemeValue] = useState("");

  useEffect(() => {
    setThemeData(themeConfig);
  }, [themeConfig]);

  const handleColorChange = (id, color, themeName) => {
    updateTheme([
      {
        _id: id,
        [themeName]: {
          value: color,
        },
      },
    ]).then((res) => {
      handleToast(res.message, "success");
      getThemeValues();
    });
  };

  const handleDeltetheme = (id) => {
    deleteTheme(id).then((res) => {
      handleToast(res.message, "success");
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
      handleToast(res.message, "success");
      setThemeName("");
      setThemeValue("");
      getThemeValues();
    });
  };

  return (
    <div className="md:mx-40 md:mt-10 m-4 flex md:justify-around md:flex-row flex-col md:gap-2 gap-4">
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
      <div>
        <div className="flex flex-col gap-4 justify-center md:items-start items-stretch">
          {themeData.length > 0 && (
            <Heading
              level={2}
              text="Available Themes"
              boldClass="font-semibold"
            />
          )}
          {themeData.map((item) =>
            Object.keys(item).map((theme) => (
              <>
                {!excludeFields.includes(theme) && (
                  <div className="mt-4">
                    <div className="flex md:justify-center md:items-center justify-between gap-4">
                      <div className="md:w-32 truncate md:flex-none flex-1">
                        <Label text={theme} />
                      </div>
                      <div className="md:w-32 md:flex-none flex-1">
                        <Input
                          type="color"
                          value={item[theme].value}
                          onChange={(e) =>
                            handleColorChange(item._id, e.target.value, theme)
                          }
                        />
                      </div>
                      <Button
                        text=""
                        handleClick={() => {
                          handleDeltetheme(item._id);
                        }}
                        leadingIcon={trashIcon}
                        disabled={themeRights.includes(theme)}
                        bgNone={themeRights.includes(theme)}
                        textColor={
                          !themeRights.includes(theme) ? "text-error" : ""
                        }
                      />
                    </div>
                  </div>
                )}
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
