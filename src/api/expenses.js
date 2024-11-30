import { getAccessToken } from "./token";

export const  registerExpense = async( account, label, expenseDescription, expenseDate, expenseAmount) => {
    const accessToken = getAccessToken();

    const response = await fetch('http://127.0.0.1:8000/expenses/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ account, label, expenseDescription, expenseDate, expenseAmount })
    }); 

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 

export const listExpenses = async() => {
    const accessToken = getAccessToken();

    const response = await fetch('http://127.0.0.1:8000/expenses/list/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
};

export const listIdExpense = async(id) => {
    const accessToken = getAccessToken();

    const response = await fetch(`http://127.0.0.1:8000/expenses/list/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 

export const updateExpense = async( account, label, expenseDescription, expenseDate, expenseAmount ) => {
    const accessToken = getAccessToken();

    const response = await fetch(`http://127.0.0.1:8000/expenses/update/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ account, label, expenseDescription, expenseDate, expenseAmount })
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 

export const deleteExpense = async(id) => {
    const accessToken = getAccessToken();

    const response = await fetch(`http://127.0.0.1:8000/expenses/delete/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 