import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useIdleTimer } from "./hooks/useIdleTimer";
import { Home } from './components/Home';
import { Signup } from './components/auth/signup/Signup';
import { Login } from './components/auth/login/Login';
import { ChangePassword } from "./components/auth/change-password/ChangePassword";
import { ResetPassword } from "./components/auth/reset-password/ResetPassword";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext"; 
import './App.css';

export const App = () => {
    useIdleTimer(); 

    return (
        <DarkModeProvider>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth/signup' element={<Signup />} />
                <Route path='/auth/login' element={<Login />} />
                <Route path='/auth/reset-password' element={<ResetPassword />} />
                <Route path="/auth/password-reset-confirm/:uidb64/:token" element={<ResetPassword />} />
                <Route 
                    path="/auth/change-password" 
                    element={<ProtectedRoute element={<ChangePassword />} />} 
                />
            </Routes>
        </DarkModeProvider>
    );
};
