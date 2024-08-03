import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}
