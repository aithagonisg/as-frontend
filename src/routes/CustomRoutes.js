import React, { useContext, useEffect } from "react";
import ThemeConfig from "../pages/adminPages/ThemeConfig";
import { Route, Routes } from "react-router-dom";
import ComponentConfig from "../pages/adminPages/ComponentConfig";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import CommonLogin from "../pages/CommonLogin";
import CommonHeader from "../components/CommonHeader";
import CommonFooter from "../components/CommonFooter";
import CommonRegister from "../pages/CommonRegister";
import { ProductData } from "../Context";
import HomePage from "../pages/adminPages/HomePage";
import ProductsList from "../pages/userPages/ProductsList";
import ProductDetails from "../pages/userPages/ProductDetails";
import { getItemsFromCart } from "../services/productService";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import CartItems from "../pages/userPages/CartItems";

export default function CustomRoutes() {
  const { isAuthenticated } = useContext(ProductData);
  const dispatch = useDispatch();
  useEffect(() => {
    const getCartItems = () => {
      getItemsFromCart().then((res) => {
        res.cart.map((item) => {
          dispatch(addItem(item));
        });
      });
    };
    if (isAuthenticated) {
      getCartItems();
    }
  }, [isAuthenticated]);

  return (
    <div className={isAuthenticated ? "grid-container" : ""}>
      {isAuthenticated && <CommonHeader />}
      <div
        className={`${
          isAuthenticated ? "bg-bodyBackground" : "h-full bg-background"
        }`}
        id="body"
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
            path="/products"
            element={
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <ProductsList />
              </PrivateRoutes>
            }
          />
          <Route
            path="/productDetails/:id?"
            element={
              <PrivateRoutes isAuthenticated={isAuthenticated}>
                <ProductDetails />
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
                <HomePage />
              </PrivateRoutes>
            }
          />
        </Routes>
      </div>
      {isAuthenticated && <CommonFooter />}
    </div>
  );
}
