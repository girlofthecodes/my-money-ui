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
import { HeaderGlobal } from '../navbar/HeaderGlobal'; 
import { TransactionList } from '../common/TransactionList'; 

import { IoTrashOutline, IoWifiOutline } from "react-icons/io5";


const ListAccount = () => {
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
                    <p>SaveSmart wishes you a good and productive day. Below, you can see the breakdown of your registered accounts. </p>
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
                            <h5>Incomes</h5>
                            <TransactionList
                                transactions={selectedIncomes}
                                handleDelete={handleDeleteIncome}
                                type="Income"
                                amountKey="incomeAmount"
                                descriptionKey="incomeDescription"
                                dateKey="incomeDate"
                            />
                        </div>
                    </div>
                    <div className="account-data3">
                        <div>
                            <h5>Expenses</h5>
                            <TransactionList
                                transactions={selectedExpenses}
                                handleDelete={handleDeleteExpense}
                                type="Expense"
                                amountKey="expenseAmount"
                                descriptionKey="expenseDescription"
                                dateKey="expenseDate"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
    
}; 

export const ListAccounts = () => {
    return (
        <div>
            <HeaderGlobal />
            <ListAccount />
        </div>
    )
};