import React from 'react'
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  const userRole = user?.role;

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;
