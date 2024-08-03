import React from "react";
import ThemeConfig from "../pages/adminPages/ThemeConfig";
import { Route, Routes } from "react-router-dom";
import ComponentConfig from "../pages/adminPages/ComponentConfig";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import CommonLogin from "../pages/CommonLogin";
import CommonHeader from "../components/CommonHeader";
import CommonFooter from "../components/CommonFooter";

export default function CustomRoutes() {
  const isAuthenticated = true;
  return (
    <>
      {isAuthenticated && <CommonHeader />}
      <div className="h-[calc(100%-112px)] overflow-auto bg-bodyBackground">
        <Routes>
          <Route
            path="/themeConfig"
            element={
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <ThemeConfig />
              </PrivateRoutes>
            }
          />
          <Route
            path="/componentRights"
            element={
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <ComponentConfig />
              </PrivateRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes isAuthenticated={isAuthenticated}>
                <CommonLogin />
              </PublicRoutes>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <ComponentConfig />
              </PrivateRoutes>
            }
          />
        </Routes>
      </div>
      {isAuthenticated && <CommonFooter />}
    </>
  );
}
