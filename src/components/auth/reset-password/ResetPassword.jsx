import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ResetPasswordRequest } from './ResetPasswordRequest';
import { ResetPasswordEmailSent } from './ResetPasswordEmailSent';
import { ResetPasswordForm } from './ResetPasswordForm';
import { ResetPasswordSuccess } from './ResetPasswordSuccess';

export const ResetPassword = () => {
    const [step, setStep] = useState(1);  
    const [email, setEmail] = useState(''); 
    const [errors, setErrors] = useState('');  

    const { uidb64, token } = useParams(); 

    useEffect(() => {
        if (uidb64 && token) {
            setStep(3);  
        } else {
            setStep(1);  
        }
    }, [uidb64, token]);

    
    useEffect(() => {
        if (uidb64 && token) {
            setStep(3); 
        } else {
            setStep(1);  
        }
    }, [uidb64, token]);

    return (
        <div className="forgot-password-container">
            {step === 1 && (
                <ResetPasswordRequest setStep={setStep} setErrors={setErrors} setEmail={setEmail} />
            )}
            {step === 2 && (
                <ResetPasswordEmailSent email={email} />
            )}
            {step === 3 && (
                <ResetPasswordForm setStep={setStep} setErrors={setErrors} />
            )}
            {step === 4 && (
                <ResetPasswordSuccess />
            )}
        </div>
    );  
};