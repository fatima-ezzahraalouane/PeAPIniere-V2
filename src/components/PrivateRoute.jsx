import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children, role = null }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));


  if (!token || !user) return <Navigate to="/login" replace />;

  if (role && user.role !== role) return <Navigate to="/login" replace />;

  return children;
}