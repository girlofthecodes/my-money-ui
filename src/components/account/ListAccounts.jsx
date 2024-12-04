import React from 'react';
import { useState, useEffect } from 'react';

import { listAccounts } from '../../api/account';
import { listIncomes } from '../../api/incomes';
import { listExpenses } from '../../api/expenses';

import { useUserData } from '../../hooks/useUserData'; 
import { CardItem } from './common/CardItem';

export const ListAccounts = () => {
    const [ accounts, setAccounts ] = useState([]); 
    const [ incomes, setIncomes ] = useState([]);
    const [ expenses, setExpenses ] = useState([]);

    const getAccounts = async() => {
        const data = await listAccounts(); 
        setAccounts(data);
        console.log(data);
    }; 

    const getIncomes = async() => {
        const data = await listIncomes();
        setIncomes(data);
    }

    const getExpenses = async() => {
        const data = await listExpenses();
        setExpenses(data);
    }

    // console.log(incomes)
    // console.log(expenses)
    useEffect(() => {
        getAccounts();
        getIncomes();
        getExpenses();  
    }, []);

    return (
        <div className='account'>
            <div className="account-content1"></div>
            <div className="account-content2"></div>
            <div className="account-content3"></div>
            <div className="account-content4 container-card-list">
                {accounts.map((account) => (
                    <div className="card-list">
                        <CardItem
                            key={account.id} 
                            className="container-card-item"
                            accountNumber={account.accountNumber}
                            accountType={account.accountType}
                            currentBalance={account.currentBalance}
                            totalIncome="3000"
                            totalExpense="700"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
    
}; 