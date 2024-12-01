import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
    const token = localStorage.getItem("token"); // Check for the token in local storage

    // Check if the user is authenticated (token exists or bypass token)
    const isAuthenticated = token && token !== "bypass-token" ? true : false;

    return (
        <Route
            {...rest}
            element={isAuthenticated ? element : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute; 