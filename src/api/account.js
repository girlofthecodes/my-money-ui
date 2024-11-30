import { getAccessToken } from "./token";

export const registerAccount = async ( accountName, accountType, accountNumber, currentBalance ) => {
    const accessToken = getAccessToken(); 

    const response = await fetch('http://127.0.0.1:8000/accounts/register/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${accessToken}`
        }, 
        body: JSON.stringify({ accountName, accountType, accountNumber, currentBalance }) 
    }); 

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}

export const listAccounts = async () => {
    const accessToken = getAccessToken();
    
    const response = await fetch('http://127.0.0.1:8000/accounts/list/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    }); 

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 

export const listIdAccount = async (id) => {
    const accessToken = getAccessToken();
    
    const response = await fetch(`http://127.0.0.1:8000/accounts/list/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    
    return await response.json();
};

export const updateAccount = async ( id, accountName, accountType, accountNumber, currentBalance ) => {
    const accessToken = getAccessToken(); 

    const response = await fetch(`http://127.0.0.1:8000/accounts/update/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ accountName, accountType, accountNumber, currentBalance })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    
    return await response.json();
};

export const deleteAccount = async (id) => {
    const accessToken = getAccessToken();

    const response = await fetch(`http://127.0.0.1:8000/accounts/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    
    return await response.json();
}; 