import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const ProtectedRoute = ({ children, adminOnly }) => {
  const auth = useAuth();
  const user = auth ? auth.user : null;

  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== "admin") return <Navigate to="/profile" />;

  return children;
};

export default ProtectedRoute;
