import React, { useState } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Button } from "../../common/Button"
import { ResetPasswordEmail } from "../../../api/auth";

export const ResetPasswordEmailSent = ({ email }) => {

    const [ message, setMessage ] = useState(''); 

    if (!email) {
        return <p>Error: No email provided.</p>;
    }

    const emailDomain = email.split('@')[1];

    const openEmailApp = () => {
        if (emailDomain === "gmail.com") {
            window.open('https://mail.google.com/mail/u/0/#inbox', '_blank');
        } else if (emailDomain === "hotmail.com" || emailDomain === "outlook.com") {
            window.open('https://outlook.live.com/mail/0/inbox', '_blank');
        } else if (emailDomain === "yahoo.com") {
            window.open('https://mail.yahoo.com/', '_blank');
        } else {
            window.open('https://mail.google.com/', '_blank');
        }
    };

    const resentEmail = async() => {
        try {
            const response = await ResetPasswordEmail(email)
            if(response.success){
                setMessage('The email has been resent. Please check your inbox.')
            } else {
                setMessage('There was a error resending the email. Please try again.')
            }
        } catch(error) {
            setMessage('Failed to resend the email. Please try again later.')
        }
    }

    const handleResetPasswordClick = (e) => {
        e.preventDefault(); 
        resentEmail(); 
    };

    return (
        <div className="forgot-password-container">
            <div className="forgot-password-form">
                <div className="container-form-data">
                    <img src="/src/assets/email1.jpg" alt="forgot password email" className="forgot-password-img"/>
                    <h2>Check your email</h2>
                    <p>We sent a password reset link to <strong>{email}</strong></p>
                </div>
                <Button
                    label="Open email app"
                    onClick={openEmailApp}
                    className="authenticate-btn" 
                />
                <div className="return">
                    <p>Didn't receive the email? <a onClick={handleResetPasswordClick}>Click to resend</a></p>
                </div>
                {message && <p className="success">{message}</p>}
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