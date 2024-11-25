import React, { useState } from "react";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Input } from "../../common/Input"; 
import { Button } from '../../auth/common/Button';
import { ResetPasswordEmail } from '../../../api/auth'; 

export const ResetPasswordRequest = ({ setStep, setErrors, setEmail }) => {
    const [emailInput, setEmailInput] = useState('');

    const handleSendEmail = async(e) => {
        e.preventDefault(); 
        setErrors(''); 
        setEmail(emailInput);

        try {
            await ResetPasswordEmail(emailInput);
            setStep(2);  
        } catch(error){
            const errorMessage = error?.message || 'Ocurrió un error inesperado';
            setErrors(errorMessage);
        }

    }

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <div className="container-form-data">
                    <img src="/src/assets/key1.jpg" alt="forgot-password" className="forgot-password-img"/>
                    <h2>Forgot Password?</h2>
                    <p>No worries, we'll send you reset instructions.</p>
                </div>
                <form className="form" onSubmit={handleSendEmail}>
                    <Input 
                        id="email"
                        type="text" 
                        placeholder="Enter your email" 
                        value={emailInput}  
                        onChange={(e) => setEmailInput(e.target.value)}
                        required
                        autoComplete="email"
                        label="Email"
                    />
                    <Button
                        label="Reset Password"
                        className="authenticate-btn" 
                    />
                </form>
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