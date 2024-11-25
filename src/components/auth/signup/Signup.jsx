import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faCheck, faArrowLeftLong, faCircle, faCircleCheck, faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signup } from '../../../api/auth';
import { Input } from '../../common/Input';
import { Button } from '../common/Button';
import { VideoComponent } from '../../common/Video'; 
import { PasswordToggle } from '../common/PasswordToggle';
import { PasswordValidation } from '../common/PasswordValidation';
import { validateUsername, validateEmail, validatePassword } from '../../../validators/authValidation'


export const Signup = () => {

    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registeredUsername, setRegisteredUsername] = useState('');

    const [isRegistered, setIsRegistered] = useState(false);

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: [],
    }); 

    const [touched, setTouched] = useState({
        username: false,
        email: false,
    })

    const navigate = useNavigate(); 

    useEffect(() => {
        setErrors({
            username: validateUsername(username),
            email: validateEmail(email),
            password: validatePassword(password),
        }); 
    }, [username, email, password]); 

    const isPasswordValid = () => {
        const validations = validatePassword(password);
        return validations.every(validation => validation.isValid); 
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (errors.username || errors.email || !isPasswordValid()) {
            return; 
        }

        try {

            await signup({ username, email, password }); 
            
            setIsRegistered(true); 
            setRegisteredUsername(username);

            setUsername(''); 
            setEmail(''); 
            setPassword(''); 
        } catch(error) {
            const errorData = JSON.parse(error.message);
            setErrors(errorData);
        }
    };

    const handleReturnLogin = () => {
        navigate('/auth/login');
    }; 

    const handleFocus = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    return (
        <div className="container-auth">
            {isRegistered && (
                <div className="overlay">
                    <div className="successMessage">
                        <h3>Your account was created  successfully</h3>
                        <div className="msg">
                            <div className='close'>
                                <FontAwesomeIcon icon={faXmark} onClick={() => setIsRegistered(false)}/>
                            </div>
                            <h2>Welcome to the club of those who know how to save!</h2>
                            <img src="/src/assets/send.png" alt="" />
                            <span>Hello, {registeredUsername}!</span>
                            <p>We're happy your signed up to SaveSmart Club.
                                To start exploring SaveSmart tools, please confirm your email address. 
                            </p>
                            <Button 
                                className="authenticate-btn signup"  
                                icon={faPaperPlane} 
                                label="Ok" 
                                onClick={() => setIsRegistered(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
            <div className="auth-img">
                <div className="signup-img">
                    <VideoComponent videoSrc="/src/assets/signup.mp4"/>
                </div>
            </div>
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
                        <h2>Sign Up Account</h2>
                        <p>Enter your personal data to create your account</p>
                        <Button className="social-media-btn" icon={faGoogle}/>
                        <p className='or'>or</p>
                    </div>
                    <div className='container-form progress'>
                        <form className="auth-form data" onSubmit={handleSubmit}>
                            <div className='progress'>
                                <ul className="progress-steps">
                                    <li className={`step ${!errors.username ? 'active' : ''}`}>
                                        <FontAwesomeIcon 
                                            className='icon' 
                                            icon={username && !errors.username ? faCircleCheck:faCircle}
                                        />                                    
                                    </li>
                                    <li className={`step ${!errors.email ? 'active' : ''}`}>
                                        <FontAwesomeIcon 
                                            className='icon' 
                                            icon={email && !errors.email ? faCircleCheck:faCircle}
                                        /> 
                                    </li>
                                    <li className={`step ${isPasswordValid() ? 'active' : ''}`}>
                                        <FontAwesomeIcon 
                                            className='icon' 
                                            icon={password && isPasswordValid() ? faCircleCheck:faCircle}
                                        /> 
                                    </li>
                                </ul>
                            </div>
                            <div className='form'>
                                <Input 
                                    type="username" 
                                    name="username" 
                                    id="username" 
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e)=> setUsername(e.target.value)}
                                    onFocus={() => handleFocus('username')}
                                    autoComplete="off"
                                    required
                                    label="Username"
                                />
                                {touched.username && errors.username && <p className="error">{errors.username.msg || errors.username}</p>}
                                <Input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder="Enter your email"
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
                                    placeholder="Enter your password"
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <PasswordValidation validations={validatePassword(password)} />
                                <Button className="authenticate-btn signup" label="Sign Up"/>
                                <div className="return">
                                    <p>Already have an Account? <a onClick={handleReturnLogin}>Login</a></p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}