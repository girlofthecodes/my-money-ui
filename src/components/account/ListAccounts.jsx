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
    const [ incomeTotals, setIncomeTotals ] = useState([]);
    const [ expenseTotals, setExpenseTotals ] = useState([]);

    const getAccounts = async() => {
        const data = await listAccounts(); 
        setAccounts(data);
    }; 
    console.log(accounts)
    const getIncomes = async() => {
        const data = await listIncomes();
        setIncomes(data);
    }

    const getExpenses = async() => {
        const data = await listExpenses();
        setExpenses(data);
    }

    useEffect(() => {
        const calculateIncomeTotals = () => {
            const totals = incomes.reduce((totals, income) => {
                const accountId = income.account.id;
                if (!totals[accountId]) totals[accountId] = 0;
                totals[accountId] += parseFloat(income.incomeAmount);
                return totals;
            }, {});
            setIncomeTotals(totals);
        };
    
        calculateIncomeTotals();
    }, [incomes]);

    useEffect(() => {
        const calculateExpenseTotals = () => {
            const totals = expenses.reduce((totals, expense) => {
                const accountId = expense.account.id;
                if (!totals[accountId]) totals[accountId] = 0;
                totals[accountId] += parseFloat(expense.expenseAmount);
                return totals;
            }, {});
            setExpenseTotals(totals);
        }; 

        calculateExpenseTotals(); 
    }, [expenses]);

    useEffect(() => {
        getAccounts();
        getIncomes();
        getExpenses();  
    }, []);

    return (
        <div className='account'>
            <div className="account-content1">
                
            </div>
            <div className="account-content2">

            </div>
            <div className="account-content3">
                
            </div>
            <div className="account-content4">
                <div className="container-card-list">
                    {accounts.map((account) => {
                        const totalIncome = incomeTotals[account.id] || 0; 
                        const totalExpense = expenseTotals[account.id] || 0; 
                        return (
                        <div className="card-list" key={account.id}>
                            <CardItem
                                className="container-card-item"
                                accountNumber={account.accountNumber}
                                accountType={account.accountType}
                                currentBalance={account.currentBalance}
                                totalIncome={totalIncome.toFixed(2)}
                                totalExpense={totalExpense.toFixed(2)}
                            />
                        </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
    
}; 