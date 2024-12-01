import React from 'react';
import { Navigate } from 'react-router-dom';
import { Success, Warning, Error } from "../Helper/Toast.js";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    Error("Token expired or malformed !!!")
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  return children; 
};

export default PrivateRoute;
