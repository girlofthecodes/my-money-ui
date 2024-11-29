import React from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../common/Button"

export const ResetPasswordSuccess = () => {
    const navigate = useNavigate();

    const handleContinue = () => {
        navigate('/auth/login');  
    }

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <div className="container-form-data">
                    <img src="/src/assets/success2.jpg" alt="forgot password email" className="forgot-password-img"/>
                    <h2>Password reset</h2>
                    <p>Your password has been successfully reset.</p>
                    <p>Click below to log in magically.</p>
                </div>
                <Button
                    label="Continue"
                    onClick={handleContinue}
                    className="authenticate-btn"
                />
                <div className="return">
                    <Button
                        label="Back to login"
                        path="/auth/login"
                        icon={faArrowLeft}
                        className="reset-password"
                    />
                </div>
            </div>
        </div>
    )
}