import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getFeatures } from "./services/featureServices";
import { getThemes } from "./services/themeServices";

const ProductData = createContext();
function Context({ children }) {
  const [componentRights, setComponentRights] = useState([]);
  const [themeConfig, setThemeConfig] = useState([]);
  useEffect(() => {
    const promises = [getFeatures(), getThemes()];
    Promise.all(promises).then((response) => {
      response.map((item, index) => {
        if (index === 0) {
          setComponentRights(item);
        }
        if (index === 1) {
          setThemeConfig(item);
        }
      });
    });
  }, []);
  return (
    <ProductData.Provider
      value={{ componentRights: componentRights, themeConfig: themeConfig }}
    >
      {componentRights.length > 0 || themeConfig.length > 0 ? (
        children
      ) : (
        <div>Loading..</div>
      )}
    </ProductData.Provider>
  );
}

export { Context, ProductData };
