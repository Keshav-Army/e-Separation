import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const access = localStorage.getItem("access");
  return access ? children : <Navigate to="/" />;
};

export default ProtectedRouter;
