import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { login } from "../../../api/auth"; 
import { validateEmail } from "../../../validators/authValidation";
import { setTokens } from "../../../api/token";
import { PasswordToggle } from "../common/PasswordToggle";

import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";


export const Login = () => {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 


    const [errors, showErrors] = useState({
        email: '',
    });

    const [touched, setTouched] = useState({
        email: false,
    })

    const navigate = useNavigate();

    useEffect(() => {
        showErrors({
            email: validateEmail(email),
        });
    }, [email]);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login({ email, password }); 

            setTokens(data.tokens.access, data.tokens.refresh);

            navigate("/"); 

            setEmail(''); 
            setPassword(''); 
        } catch (error) {
            const errorData = JSON.parse(error.message); 
            showErrors(errorData);
        }
    }; 

    const handleReturnSignup = () => {
        navigate('/auth/signup');
    }; 

    const handleFocus = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const handleForgotPasswordClick = () => {
        navigate('/auth/reset-password'); 
    };

    return (
        <div className="container-auth">
            <div className="auth-data">
                <div className="enterprise">
                    <Button 
                        className="return-btn"
                        icon={faArrowLeftLong}
                        path='/'
                    />
                    <h2 className="company">SaveSmart</h2>
                </div>
                <div className="container-form">
                    <div className="container-form-data">
                        <h2>Welcome Back!</h2>
                        <p>Welcome back! Please enter your details</p>
                    </div>
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div>
                            <Input 
                                id="email" 
                                type="email" 
                                name="email" 
                                placeholder="Enter email"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                onFocus={() => handleFocus('email')}
                                autoComplete="off"
                                required
                                label="Email"
                            />
                            {touched.email && errors.email && <p className="error">{errors.email.msg || errors.email}</p>}
                            <PasswordToggle
                                label="Password"
                                placeholder="Enter password"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {errors.msg && <p className="error">{errors.msg}</p>}
                        </div>
                        <div className="forgot-password">
                            <a onClick={handleForgotPasswordClick}>Forgot password</a>
                        </div>
                        <Button 
                            className="authenticate-btn" 
                            label="Sign In"
                        />
                        <Button  
                            icon={faGoogle} 
                            label="Sign in with Google"
                            className={"social-media"}
                        />
                        <div className="return">
                            <p>Dont have an account? <a onClick={handleReturnSignup}>Signup</a></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="auth-img">
                <div className="login-img"></div>
            </div>
        </div>
    )
}