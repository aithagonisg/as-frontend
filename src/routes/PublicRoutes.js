import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoutes({ isAuthenticated, children }) {
  return isAuthenticated ? <Navigate to="/" /> : children;
}
