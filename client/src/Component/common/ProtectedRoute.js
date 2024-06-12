import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  console.log(userData?.id);

  if (!userData?.id) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
