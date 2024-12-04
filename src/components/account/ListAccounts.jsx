import React from 'react';
import { useState, useEffect } from 'react';

import { listAccounts } from '../../api/account';
import { listIncomes } from '../../api/incomes';
import { listExpenses } from '../../api/expenses';

import { useUserData } from '../../hooks/useUserData'; 
import { CardItem } from './common/CardItem';

import { IoTrashOutline, IoWifiOutline } from "react-icons/io5";

export const ListAccounts = () => {
    const [ accounts, setAccounts ] = useState([]); 
    const [ incomes, setIncomes ] = useState([]);
    const [ expenses, setExpenses ] = useState([]);
    const [ incomeTotals, setIncomeTotals ] = useState([]);
    const [ expenseTotals, setExpenseTotals ] = useState([]);
    const [ isCardID, setIsCardID ] = useState(false); 
    const [ selectedAccount, setSelectedAccount ] = useState(null); 
    const [ selectedIncomes, setSelectedIncomes ] = useState([]);  
    const [ selectedExpenses, setSelectedExpenses ] = useState([]);

    const {userData} = useUserData(); 

    const getAccounts = async() => {
        const data = await listAccounts(); 
        setAccounts(data);
    }; 

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

    const toggleViewCardID = (accountID) => {
        if (isCardID === accountID) {
            setIsCardID(false); 
            setSelectedAccount(null); 
            setSelectedIncomes([]); 
            setSelectedExpenses([]); 
        } else {
            setIsCardID(accountID); 
            setSelectedAccount(accounts.find(account => account.id === accountID)); 
            setSelectedIncomes(incomes.filter(income => income.account.id === accountID)); 
            setSelectedExpenses(expenses.filter(expense => expense.account.id === accountID)); 
        }
    };
    console.log(selectedIncomes);
    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, "$1 ")
    };

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-'); 
        const shortYear = year.slice(-2); 
        return `${shortYear}/${month}`; 
    };

    return (
        <div className="container-account">
            <div className={`account ${isCardID ? 'active' : ''}`}>
                <div className="account-content1">
                    <h4>Hi! {userData.username}</h4>
                </div>
                <div className="account-content2">
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
                                    toggleViewCardID={toggleViewCardID}
                                    accountID={account.id}
                                    isActive={isCardID === account.id}
                                />
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            {isCardID && selectedAccount && (
                <div className={`account-id ${isCardID ? 'active' : ''}`}>
                    <div className="account-data1">
                        <div className="delete-account">
                            <IoTrashOutline />
                        </div>
                        <div className="account-data-id">
                            <div className='account-id-header'>
                                <p>{selectedAccount.accountName}</p>
                                <IoWifiOutline className='icon'/>
                            </div>
                            <div className='account-id-main'>
                                <p>{formatCardNumber(selectedAccount.accountNumber)}</p>
                                <p>{formatDate(selectedAccount.dueDate)}</p>
                            </div>
                            <div className='account-id-footer'>
                                <p>${selectedAccount.currentBalance}</p>
                                <p>{selectedAccount.accountType}</p>
                            </div>
                        </div>
                    </div>
                    <div className="account-data2">
                        <div className="item income">
                            {selectedIncomes.length === 0 ? (
                                <p>Income not registered</p>
                            ) : (
                                <div>
                                    <h5>Incomes:</h5>
                                    <ul>
                                        {selectedIncomes.map((income, index) => (
                                            <div>
                                                <div>
                                                    <li>Label: {income.label.label_name}</li>
                                                    <li>Amount: {income.incomeAmount}</li>
                                                    <li>Description: {income.incomeDescription}</li>
                                                    <li>Date: {income.incomeDate}</li>
                                                </div>
                                                <div className='delete-account'>
                                                    <IoTrashOutline/>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="account-data3">
                        <div className="item income">
                            {selectedExpenses.length === 0 ? (
                                <p>Expense not registered</p>
                            ) : (
                                <div>
                                    <h5>Expenses:</h5>
                                    <ul>
                                        {selectedExpenses.map((expense, index) => (
                                            <div>
                                                <div>
                                                    <li>Label: {expense.label.label_name}</li>
                                                    <li>Amount: {expense.expenseAmount}</li>
                                                    <li>Description: {expense.expenseDescription}</li>
                                                    <li>Date: {expense.expenseDate}</li>
                                                </div>
                                                <div className='delete-account'>
                                                    <IoTrashOutline/>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    
}; 