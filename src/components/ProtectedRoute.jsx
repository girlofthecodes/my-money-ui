import React from "react";
import { Route, Navigate } from "react-router-dom"; 
import { getAccessToken, isTokenExpired } from "../api/token";

export const ProtectedRoute = ({ element }) => {
    const accessToken = getAccessToken(); 

    if(!accessToken) {
        return <Navigate to="/auth/login"/>
    };

    return element; 
}; 