import React from 'react';
import { Navigate } from 'react-router-dom';
import { Success, Warning, Error } from "../Helper/Toast.js";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Get the token from local storage

  if (!token) {
    Error("Token expired or malformed !!!")
    localStorage.clear();
    return <Navigate to="/login" />;
  }

  return children; // Render the child component if token is valid
};

export default PrivateRoute;
