import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { Button } from "../common/Button";
import { Input } from "../../common/Input";
import { PasswordToggle } from "../common/PasswordToggle";  
import { PasswordValidation } from "../common/PasswordValidation";
import { validateCurrentPassword, changePassword } from "/src/api/auth.js";
import { validatePassword } from '../../../validators/authValidation';
import { useDarkMode } from "../../../context/DarkModeContext"

export const ChangePassword = () => {

    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [errors, setErrors] = useState({});  

    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const handleCurrentPasswordValidation = async () => { 
        try {
            await validateCurrentPassword(currentPassword); 
            setShowChangePasswordForm(true); 
            setErrors({}); 
        } catch (error) {
            const errorData = JSON.parse(error.message); 
            setErrors(errorData);  
        }
    }; 

    const handleChangePassword = async (e) => {
        e.preventDefault(); 

        try {
            await changePassword(currentPassword, newPassword, confirmPassword); 
            setErrors({});  
            navigate('/'); 
        } catch (error) {
            console.log(error);
            const errorData = JSON.parse(error.message); 
            let errorMessages = {};

            if (errorData.newPassword) {
                errorMessages.newPassword = errorData.newPassword[0]; 
            }
            if (errorData.confirmPassword) {
                errorMessages.confirmPassword = errorData.confirmPassword[0];
            }
            setErrors(errorMessages);  
        }
    };

    return (
        <div className={`change-password ${isDarkMode ? 'dark-mode' : ''}`}>
            {!showChangePasswordForm ? (
                <div className="change-password-container validate">
                    <div className="change-password-form">
                        <h2>Please enter <br />current password</h2>
                        <form className="form" onSubmit={(e) => e.preventDefault()}>
                            <Input 
                                type="password" 
                                placeholder="Enter password"
                                value={currentPassword} 
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            {errors.current_password && errors.current_password.msg && (
                                <p className="error">{errors.current_password.msg}</p>
                            )}
                            <button type='button' onClick={handleCurrentPasswordValidation}>Let's go</button>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="change-password-container change">
                    <div className="change-password-img"></div>
                    <div className="change-password-form">
                        <div className="change-password sucess">
                            <h2>Please enter <br />new password</h2>
                            <form className="form" onSubmit={handleChangePassword}>
                                <Input
                                    type="password"
                                    placeholder="Current password"
                                    value={currentPassword}
                                    readOnly={true}
                                    id="currentPassword"
                                    label="Current Password"
                                    onChange={() => {}}
                                />
                                <PasswordToggle
                                    label="New Password"
                                    placeholder="Enter new password"
                                    value={newPassword} 
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                {errors.newPassword && <p className="error">{errors.newPassword}</p>}
                                <PasswordToggle
                                    label="Confirm Password"
                                    placeholder="Enter confirm password"
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                                <PasswordValidation validations={validatePassword(newPassword)} />
                                <Button
                                    className="change-password-btn"
                                    onClick={handleChangePassword}
                                    label="Change Password"
                                />
                            </form> 
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
