import React from 'react';
import { useState, useEffect } from 'react';

import { listAccounts } from '../../api/account';
import { listIncomes } from '../../api/incomes';
import { listExpenses } from '../../api/expenses';

import { listIdAccount } from '../../api/account';

import { deleteIdAccount } from '../../api/account'; 
import { deleteIdIncome } from '../../api/incomes';
import { deleteIdExpense } from '../../api/expenses'; 

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

    const getAcccountID = async(accountId) => {
        const data = await listIdAccount(accountId);
        setSelectedAccount(data);
    };  

    const getDeleteIdAccount = (accountId) => {
        return deleteIdAccount(accountId); 
    }; 

    const getIncomes = async() => {
        const data = await listIncomes();
        setIncomes(data);
    }

    const getDeleteIdIncome = (incomeId) => {
        return deleteIdIncome(incomeId); 
    }

    const getExpenses = async() => {
        const data = await listExpenses();
        setExpenses(data);
    }

    const getDeleteIdExpense = (expenseId) => {
        return deleteIdExpense(expenseId);
    }; 

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

    const toggleViewCardID = async(accountID) => {
        if (isCardID === accountID) {
            setIsCardID(false); 
            setSelectedAccount(null); 
            setSelectedIncomes([]); 
            setSelectedExpenses([]); 
        } else {
            setIsCardID(accountID); 

            await getAcccountID(accountID); 
            setSelectedIncomes(incomes.filter(income => income.account.id === accountID)); 
            setSelectedExpenses(expenses.filter(expense => expense.account.id === accountID)); 
        }
    };

    const handleDeleteIdAccount = async (accountId) => {
        await getDeleteIdAccount(accountId);
    
        setAccounts((prevAccounts) => prevAccounts.filter((account) => account.id !== accountId));
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income.account.id !== accountId));
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.account.id !== accountId));

        setIncomeTotals((prevTotals) => {
            const newTotals = { ...prevTotals };
            delete newTotals[accountId];  
            return newTotals;
        });

        setExpenseTotals((prevTotals) => {
            const newTotals = { ...prevTotals };
            delete newTotals[accountId];  
            return newTotals;
        });

        if (isCardID === accountId) {
            setIsCardID(false); 
            setSelectedAccount(null);
            setSelectedIncomes([]);
            setSelectedExpenses([]);
        }
    };
    

    const handleDeleteIncome = async(incomeId) => {
        await getDeleteIdIncome(incomeId); 
        setSelectedIncomes((prevIncomes) => prevIncomes.filter(income => income.id !== incomeId));
        setIncomes((prevIncomes) => prevIncomes.filter(income => income.id !== incomeId));
        await getAccounts();
    }; 

    const handleDeleteExpense = async(expenseId) => {
        await getDeleteIdExpense(expenseId);
        setSelectedExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id != expenseId));
        setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id != expenseId)); 
    };

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
                <div
                    className={`account-id ${isCardID ? 'active' : ''} ${
                    selectedIncomes.length > 0 || selectedExpenses.length > 0 ? 'with-data' : 'empty'
                    }`}
                >
                    <div className="account-data1">
                        <div className="container-card-id">
                            <div className="delete-account">
                                <IoTrashOutline  onClick={() => handleDeleteIdAccount(selectedAccount.id)}/>
                            </div>
                            <div className="account-data-id">
                                <div className="account-id-header">
                                    <p>{selectedAccount.accountName}</p>
                                    <IoWifiOutline className="icon"/>
                                </div>
                                <div className="account-id-main">
                                    <p>{formatCardNumber(selectedAccount.accountNumber)}</p>
                                    <p>{formatDate(selectedAccount.dueDate)}</p>
                                </div>
                                <div className="account-id-footer">
                                    <p>${selectedAccount.currentBalance}</p>
                                    <p>{selectedAccount.accountType}</p>
                                </div>
                            </div>
                        </div>
                        <div className={`container-info-id ${isCardID ? 'active' : ''} ${
                            selectedIncomes.length > 0 || selectedExpenses.length > 0 ? 'with-data' : 'empty'
                            }`}>
                            <p>Hi!</p>
                            <p>I have generated a breakdown of the transactions for the account you 
                                selected to help you better manage your finances.</p>
                            <span>Take a look!</span>
                        </div>
                    </div>
                    <div className="account-data2">
                        <div>
                            {selectedIncomes.length === 0 ? (
                                <div className='empty-data'>
                                    <p>Income not registered</p>
                                </div>
                            ) : (
                                <div className="container-account-concept-all">
                                    <h5>Incomes</h5>
                                    <div className='container-concept-id-all'>
                                        {selectedIncomes.map((income, index) => (
                                            <div key={index} className="container-concept-id">
                                                <div className="description-concept-id">
                                                    <p>Label: <span>{income.label.label_name}</span></p>
                                                    <p>Amount: <span>{income.incomeAmount}</span></p>
                                                    <p>Description: <span>{income.incomeDescription}</span></p>
                                                    <p>Date: <span>{income.incomeDate}</span></p>
                                                </div>
                                                <div className="delete-account">
                                                    <IoTrashOutline onClick={() => handleDeleteIncome(income.id)}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="account-data3">
                        <div>
                            {selectedExpenses.length === 0 ? (
                                <div className='empty-data'>
                                    <p>Expense not registered</p>
                                </div>
                            ) : (
                                <div className="container-account-concept-all">
                                    <h5>Expenses</h5>
                                    <div className="container-concept-id-all">
                                        {selectedExpenses.map((expense, index) => (
                                            <div key={index} className="container-concept-id">
                                                <div className="description-concept-id">
                                                    <p>Label: <span>{expense.label.label_name}</span></p>
                                                    <p>Amount: <span>{expense.expenseAmount}</span></p>
                                                    <p>Description: <span>{expense.expenseDescription}</span></p>
                                                    <p>Date: <span>{expense.expenseDate}</span></p>
                                                </div>
                                                <div className="delete-account">
                                                    <IoTrashOutline onClick={() => handleDeleteExpense(expense.id)}/>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    
}; 