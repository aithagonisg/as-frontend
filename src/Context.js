import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getFeatures } from "./services/featureServices";
import { getThemes } from "./services/themeServices";

const ProductData = createContext();
function Context({ children }) {
  const [componentRights, setComponentRights] = useState([]);
  const [themeConfig, setThemeConfig] = useState([]);
  const getThemeValues = () => {
    getThemes().then((res) => {
      setThemeConfig(res);
    });
  };
  const getComponentRights = () => {
    getFeatures().then((res) => setComponentRights(res));
  };
  useEffect(() => {
    getThemeValues();
    getComponentRights();
  }, []);
  return (
    <ProductData.Provider
      value={{
        componentRights: componentRights,
        themeConfig: themeConfig,
        getThemeValues: getThemeValues,
        getComponentRights: getComponentRights,
      }}
    >
      {componentRights.length > 0 || themeConfig.length > 0 || true ? (
        children
      ) : (
        <div>Loading..</div>
      )}
    </ProductData.Provider>
  );
}

export { Context, ProductData };
