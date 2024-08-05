import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getFeatures } from "./services/featureServices";
import { getThemes } from "./services/themeServices";
import Toaster from "./components/commonComponents/Toaster";

const ProductData = createContext();
function Context({ children }) {
  const [componentRights, setComponentRights] = useState([]);
  const [themeConfig, setThemeConfig] = useState([]);

  const [toastInfo, setToastInfo] = useState({
    message: "",
    iconName: "",
    isShow: false,
  });

  const handleToast = (message, iconName) => {
    setToastInfo({ message, iconName, isShow: true });
    setTimeout(() => {
      setToastInfo({
        message: "",
        iconName: "",
        isShow: false,
      });
    }, 3000);
  };

  const getThemeValues = () => {
    getThemes().then((res) => {
      setThemeConfig(res);
    });
  };
  const getComponentRights = () => {
    getFeatures().then((res) => setComponentRights(res));
  };

  const isAccessibleComponent = (rightName) => {
    return (
      componentRights.filter((item) => item[rightName]?.isAccessible)[0] ||
      false
    );
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
        isAccessibleComponent: isAccessibleComponent,
        handleToast: handleToast,
      }}
    >
      {componentRights.length > 0 || themeConfig.length > 0 || true ? (
        <>
          <Toaster
            text={toastInfo.message}
            isShow={toastInfo.isShow}
            icon={toastInfo.iconName}
          />
          {children}
        </>
      ) : (
        <div>Loading..</div>
      )}
    </ProductData.Provider>
  );
}

export { Context, ProductData };
