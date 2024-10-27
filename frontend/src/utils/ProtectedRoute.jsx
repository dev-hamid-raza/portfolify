// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
    const accessToken = Cookies.get('accessToken'); // Get the access token from cookies
    console.log(accessToken)
    // Check if the access token exists
    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return children; // If authenticated, render the child components
};

export default ProtectedRoute;
