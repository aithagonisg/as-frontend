import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./routes/CustomRoutes";
import { ProductData } from "./Context";
import { excludeFields } from "./utils/exculdeFields";

export default function App() {
  const { themeConfig } = useContext(ProductData);
  function hexToRgb(hex) {
    // Remove the leading '#' if it's there
    hex = hex.replace(/^#/, "");

    // Convert the hex string to integer
    let bigint = parseInt(hex, 16);

    // Extract the RGB values
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return `${r} ${g} ${b}`; // returns a string like "68 4 191"
  }
  useEffect(() => {
    themeConfig.forEach((item) => {
      Object.keys(item).forEach((theme) => {
        if (!excludeFields.includes(theme)) {
          console.log(`--color-${theme}`, item[theme]?.value);
          document.documentElement.style.setProperty(
            `--color-${theme}`,
            hexToRgb(item[theme]?.value)
          );
        }
      });
    });
  }, [themeConfig]);
  return (
    <div className="h-[100vh]">
      <BrowserRouter>
        <CustomRoutes />
      </BrowserRouter>
    </div>
  );
}
