import React from "react";
import ThemeConfig from "../pages/adminPages/ThemeConfig";
import { Route, Routes } from "react-router-dom";
import ComponentConfig from "../pages/adminPages/ComponentConfig";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import CommonLogin from "../pages/CommonLogin";
import CommonHeader from "../components/CommonHeader";
import CommonFooter from "../components/CommonFooter";
import CommonRegister from "../pages/CommonRegister";

export default function CustomRoutes() {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated && <CommonHeader />}
      <div
        className={`${
          isAuthenticated
            ? "h-[calc(100%-112px)] bg-bodyBackground"
            : "h-full bg-background"
        } overflow-auto `}
      >
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
            path="/register"
            element={
              <PublicRoutes isAuthenticated={isAuthenticated}>
                <CommonRegister />
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
