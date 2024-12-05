import { getAccessToken } from "./token";

export const registerIncome = async( account, label, incomeDate, incomeAmount, incomeDescription ) => {
    const accessToken = getAccessToken(); 

    const response = await fetch("http://127.0.0.1:8000/incomes/list/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ account, label, incomeDate, incomeAmount, incomeDescription }),
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 

export const listIncomes = async() => {
    const accessToken = getAccessToken(); 

    const response = await fetch("http://127.0.0.1:8000/incomes/list/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
}; 

export const listIdIncome = async(id) => {
    const accessToken = getAccessToken(); 

    const response = await fetch(`http://127.0.0.1:8000/incomes/${id}/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    return await response.json();
};

export const updateIncome = async(id, account, label, incomeDate, incomeAmount, incomeDescription) => {
    const accessToken = getAccessToken(); 

    const response = await fetch(`http://127.0.0.1:8000/incomes/update/${id}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({ id, account, label, incomeDate, incomeAmount, incomeDescription }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    
    return await response.json();
};

export const deleteIdIncome = async(id) => {
    const accessToken = getAccessToken(); 

    const response = await fetch(`http://127.0.0.1:8000/incomes/delete/${id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(JSON.stringify(errorData));
    }
    
    return await response.json();
};