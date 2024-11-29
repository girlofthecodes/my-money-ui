import React, { useState, } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import { faArrowLeft, faCheck } from "@fortawesome/free-solid-svg-icons";

import { PasswordToggle } from "../common/PasswordToggle";  
import { Button } from '../../common/Button';  
import { ResetPassword } from '../../../api/auth'; 
import { validatePassword } from '../../../validators/authValidation'; 
import { PasswordValidation} from "../common/PasswordValidation"; 
export const ResetPasswordForm = ({ setStep, setErrors}) => {
    const { uidb64, token } = useParams(); 
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ localErrors, setLocalErrors ] = useState({});

    const navigate = useNavigate(); 

    const handleResetPassword = async(e) => {
        e.preventDefault(); 
        setErrors('');
        setLocalErrors({});

        try{
            await ResetPassword(uidb64, token, password, confirmPassword ); 
            setStep(4)
        } catch(error){
            const errorData = JSON.parse(error.message); 
            setLocalErrors(errorData);
            console.log(localErrors);
        }
    }; 

    const handleReturnLogin = () => {
        navigate('/auth/login');
    }

    return (
        <div className="forgot-password-container step3">
            <div className="forgot-password-form ">
                <div className="container-form-data">
                    <img src="/src/assets/key1.jpg" alt="forgot-password" className="forgot-password-img"/>
                    <h2>Set new Password</h2>
                    <p>Your new password must be different to previusly used passwords.</p>
                </div>
                <form className="form" onSubmit={handleResetPassword}>
                    <PasswordToggle
                        label="Password"
                        placeholder="Enter password"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {localErrors.newPassword && <p className="error">{localErrors.newPassword}</p>}
                    <PasswordToggle
                        label="Confirm password"
                        placeholder="Enter confirm password"
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {localErrors.confirmPassword && <p className="error">{localErrors.confirmPassword}</p>}
                    <PasswordValidation validations={validatePassword(password)} />
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