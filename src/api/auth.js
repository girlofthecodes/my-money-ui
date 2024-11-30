import { getAccessToken, getRefreshToken} from "./token";


export const signup = async ({ username, email, password }) => {
    const response = await fetch('http://127.0.0.1:8000/auth/signup/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
};


export const login = async ({ email, password }) => {
    const response = await fetch('http://127.0.0.1:8000/auth/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 


export const validateCurrentPassword = async( currentPassword ) => {
    const accessToken = getAccessToken();

    const response = await fetch('http://127.0.0.1:8000/auth/validate-password/', {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ current_password: currentPassword })
    }); 
    
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}

export const changePassword = async( currentPassword, newPassword, confirmPassword ) => {
    const accessToken = getAccessToken();

    const response = await fetch('http://127.0.0.1:8000/auth/change-password/', {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
    }); 
    
    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 

export const ResetPasswordEmail = async( email ) => {
    const response = await fetch('http://127.0.0.1:8000/auth/request-reset/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
    }); 

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}

export const ResetPassword = async( uidb64, token, newPassword, confirmPassword ) => {
    const response = await fetch('http://127.0.0.1:8000/auth/password-reset-complete/', {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            newPassword, 
            confirmPassword, 
            uidb64,
            token,
        }),
    }); 

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
}

export const logout = async () => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    
    const response = await fetch('http://127.0.0.1:8000/auth/logout/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }), 
    });

    if (response.ok) {
        return true;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Error al hacer logout');
    }
};
