export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if(username.length < 6) return "Username must be more than 6 characters"
    if(username.length > 20) return "Username must be less than 20 characters"
    if(!usernameRegex.test(username)) return "Username cannot contain special characters or spaces"

    return ''; 
}   

export const validateEmail = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email';
    if (email.length === 0) return 'Email is required';
    return '';
}

export const validatePassword = (password) => {
    const validators = [{
        message:'At least 6 characters',
        isValid: password.length >= 6
    },
    {
        message:'Less than 20 characters',
        isValid: password.length > 0 && password.length <= 20
    }, 
    {
        message: 'At least one capital letter',
        isValid: /[A-Z]/.test(password)
    }, 
    {
        message: 'At least one number',
        isValid: /\d/.test(password)
    }, 
    {
        message: 'At least special character !@#$%^&*(),.?":{}|<>',
        isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }, 
    {
        message: 'Must not includes spaces',
        isValid: !/\s/.test(password),
    },
    {
        message: 'At least one letter', 
        isValid: /[a-zA-Z]/.test(password)
    }];
    return validators;
}


