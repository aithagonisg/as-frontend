import React, { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getFeatures } from "./services/featureServices";
import { getThemes } from "./services/themeServices";
import Toaster from "./components/commonComponents/Toaster";
import { getUserList } from "./services/userServices";

const ProductData = createContext();
function Context({ children }) {
  const [componentRights, setComponentRights] = useState([]);
  const [themeConfig, setThemeConfig] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [currentUserRights, setCurrentUserRights] = useState([]);
  const [currentUserThemes, setCurrentUserThemes] = useState([]);
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

  const getThemeValues = (userId) => {
    getThemes(userId).then((res) => {
      setThemeConfig(res);
    });
  };

  const getComponentRights = (userId) => {
    getFeatures(userId).then((res) => setComponentRights(res));
  };

  const getCurrentThemeValues = () => {
    getThemes().then((res) => {
      setCurrentUserThemes(res);
    });
  };

  const getCurrentComponentRights = () => {
    getFeatures().then((res) => setCurrentUserRights(res));
  };

  const isAccessibleComponent = (rightName) => {
    return (
      currentUserRights?.filter((item) => item.featureName === rightName)[0]
        ?.featureValue || false
    );
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getCurrentComponentRights();
      getCurrentThemeValues();
    }

    if (localStorage.getItem("role") === "Admin") {
      getUserList().then((res) => {
        setUsersList(res);
      });
    }
  }, [isAuthenticated]);

  return (
    <ProductData.Provider
      value={{
        componentRights: componentRights,
        themeConfig: themeConfig,
        currentUserRights: currentUserRights,
        currentUserThemes: currentUserThemes,
        getThemeValues: getThemeValues,
        getComponentRights: getComponentRights,
        isAccessibleComponent: isAccessibleComponent,
        handleToast: handleToast,
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        usersList: usersList,
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
