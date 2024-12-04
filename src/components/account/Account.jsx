import React from 'react';
import { useState, useEffect } from 'react';

import { Card } from './common/Card';
import { listAccounts } from '../../api/account';
import { listIncomes } from '../../api/incomes';
import { listExpenses } from '../../api/expenses';
import { Button } from '../common/Button';
import { DoughnutGrafic } from '../common/Doughnut';
import { CircularChart } from '../common/CircularChart';
import { BarPlot } from '../common/Bars';
import { ItemNotification } from '../common/Notification';

import { IoSwapHorizontalOutline, IoAnalyticsSharp , IoMailUnread, IoWallet, IoApps, 
    IoSettings, IoNotifications, IoPersonCircleSharp , IoChevronDownOutline, IoChevronForwardOutline, 
    IoArrowUpCircleOutline , IoChevronBackOutline, IoEllipsisHorizontal  } from "react-icons/io5";
import {IoIosArrowDroprightCircle } from "react-icons/io";


const HeaderAccount = () => {
    return (
        <header className='dashboard'>
            <div className="enterprise">
                <h2 className="company">SaveSmart</h2>
            </div>
            <nav className="dashboard-menu">
                <ul className="dashboard-menu-items">
                    <li className="items">
                        <IoApps className='db-icon'/>
                        <span>Dashboard</span>
                    </li>
                    <li className="items">
                        <IoAnalyticsSharp  className='db-icon'/>
                        <span>Static</span>
                    </li>
                    <li className="items">
                        <IoWallet  className='db-icon'/>
                        <span>My Wallet</span>
                    </li>
                    <li className="items">
                        <IoSwapHorizontalOutline className='db-icon'/>
                        <span>Transfers</span>
                    </li>
                    <li className="items">
                        <IoMailUnread  className='db-icon'/>
                        <span>Messages</span>
                    </li>
                </ul>
            </nav>
            <div className="tools-user">
                <ul className="dashboard-menu-items">
                    <li className="items">
                        <IoSettings className='db-icon'/>
                    </li>
                    <li className="items">
                        <IoNotifications className='db-icon'/>
                    </li>
                </ul>
                <div className="dashboard-user">
                    <IoPersonCircleSharp className='db-icon user'/>
                    <IoChevronDownOutline className='db-icon'/>
                </div>
            </div>
        </header>
    )
}; 

const MainAccount = () => {
    const [ accounts, setAccounts ] = useState([]);
    const [ totalBalance, setTotalBalance ] = useState(0); 
    const [ incomes, setIncomes ] = useState([]);
    const [ totalIncome, setTotalIncome ] = useState(0);
    const [ expenses, setExpenses] = useState([]);
    const [ totalExpense, setTotalExpense ] = useState(0);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [accountTypesMap, setAccountTypesMap] = useState({});
    
    const visibleCard = 3; 
    const visibleNotification = 2; 

    const getAccounts = async () => {
        const data = await listAccounts(); 
        setAccounts(data);
        const accountMap = data.reduce((acc, account) => {
            acc[account.accountName] = account.accountType;
            return acc;
        }, {});
        setAccountTypesMap(accountMap);  
        getCurrentBalance(data);
    };

    const getCurrentBalance = (accounts) => {
        const balance = accounts.map(account => parseFloat(account.currentBalance || 0)); 
        const totalCurrentBalance = balance.reduce((a, b) => a + b, 0); 
        setTotalBalance(totalCurrentBalance);
    }

    const getIncomes = async () => {
        const data = await listIncomes(); 
        setIncomes(data);
        getTotalIncomes(data);
    };

    const getTotalIncomes = (incomes) => {
        const incomeAmounts = incomes.map(income => parseFloat(income.incomeAmount || 0)); 
        const totalIncome = incomeAmounts.reduce((a, b) => a + b, 0);
        setTotalIncome(totalIncome);
    };

    const getExpenses = async () => {
        const data = await listExpenses(); 
        setExpenses(data);
        getTotalExpense(data);
    }; 
    
    const getTotalExpense = (expenses)=> {
        const expenseAmounts = expenses.map(expense => parseFloat(expense.expenseAmount || 0));
        const totalExpense = expenseAmounts.reduce((a, b) => a + b, 0);
        setTotalExpense(totalExpense);
    }; 

    const goPrev = () => {
        setCurrentIndex((currentIndex + 1) % accounts.length);
    };

    const goNext = () => {
        setCurrentIndex((currentIndex - 1 + accounts.length) % accounts.length);
    };

    const getAccountType = (accountName) => {
        const accountMap = accounts.reduce((map, account) => {
            map[account.accountName] = account.accountType;
            return map;
        }, {});
    
        return accountMap[accountName] || null; 
    };

    const getVisibleAccounts = () => {
        if (!accounts || accounts.length === 0) return []; 
        const visible = [];
        for (let i = 0; i < visibleCard; i++) {
            const index = (currentIndex + i) % accounts.length; 
            visible.unshift(accounts[index]); 
        }
        return visible;
    };

    const visibleAccounts = getVisibleAccounts();


    useEffect(() => {
        getAccounts();
        getIncomes();
        getExpenses();
    }, []);
    

    return (
        <main className="dashboard-main">
            <div className="container-main tools">
                <div className="container-main parts">
                    <div className="container-tools tools1">
                        <div className="description accounts">
                            <h4 className="company">SaveSmart</h4>
                            <p>Manage your <span className='finances'>finances</span> in a single app</p>
                            <p>Track the monet you spend</p>
                            <Button label="Learn more" className="learn-more"/>
                        </div>
                    </div>
                    <div className="container-tools tools2">
                        <div className="description balance">
                            <h4>Balance</h4>
                            <div className='description-detail'>
                                <p>Details</p>
                                <IoChevronForwardOutline/>
                            </div>
                        </div>
                        <div className="total balance">
                            <h4>Total</h4>
                            <p>${totalBalance}</p>
                            <div className="bar grafic">
                                <BarPlot
                                    totalAmount={totalBalance}
                                    accounts={accounts}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="container-tools tools3">
                        <IoArrowUpCircleOutline className="db-icon arrow"/>
                        <div className='total-container'>
                            <div className="total income">
                                <h4>Incomes</h4>
                                <p>${totalIncome}</p>
                            </div>
                            <div className="income grafic">
                                <DoughnutGrafic 
                                    totalAmount={totalBalance} 
                                    calcPercentage={totalIncome}  
                                    labels={['Incomes', 'Balance']}
                                />
                            </div>
                        </div>
                        <div className='income data-container'>
                            <div className='data-container-child'>
                                {incomes.map((income, index) => {
                                    if(index < visibleNotification){
                                        const accountName = income.account.account_name; 
                                        const accountType = getAccountType(accountName); 
                                        return (
                                            <ItemNotification
                                                key={income.id} 
                                                accountType={accountType} 
                                                labelName={income.label.label_name}
                                                description={income.incomeDescription}
                                            />
                                        );
                                    }
                                })}
                            </div>
                            <div className="container-view-all">
                                <Button className="views-all" label="View all"/>
                            </div>
                        </div>
                    </div>
                    <div className="container-tools tools4">
                        <IoArrowUpCircleOutline className="db-icon arrow"/>
                        <div className='total-container'>
                            <div className="total expense">
                                <h4>Expenses</h4>
                                <p>${totalExpense}</p>
                            </div>
                            <div className="expense grafic">
                                <CircularChart 
                                    totalAmount={totalBalance} 
                                    calcPercentage={totalExpense}   
                                    labels={['Expense', 'Balance']}
                                />
                            </div>
                        </div>
                        <div className='expense data-container'>
                            <div className="data-container-child">
                                {expenses.map((expense, index) => {
                                    if(index < visibleNotification){
                                        const accountName = expense.account.account_name; 
                                        const accountType = getAccountType(accountName); 
                                        return (
                                            <ItemNotification
                                                key={expense.id} 
                                                accountType={accountType} 
                                                labelName={expense.label.label_name}
                                                description={expense.expenseDescription}
                                            />
                                        );
                                    }
                                })}
                            </div>
                            <div className="container-view-all">
                                <Button className="views-all" label="View all"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-main cards">
                <div className="your-cards">
                    <div className="all-cards">
                        <div className="count-cards">
                            <h2>Your cards</h2>
                            <p className="total-card">{accounts.length}</p>
                        </div>
                        <div className="navigation-btn">
                            <IoChevronBackOutline className="db-icon" onClick={goPrev} />
                            <IoChevronForwardOutline className="db-icon" onClick={goNext} />
                        </div>
                    </div>
                    <div className="card-container">
                        {visibleAccounts.map((account, position) => {
                            if (!account) return null;

                            const classMap = ["A", "B", "C"];
                            const cardClass = classMap[visibleAccounts.indexOf(account)]; 

                            return (
                                <div key={account.id}>
                                    <div 
                                        className={`card-wrapper ${cardClass}`}
                                    >
                                        <Card
                                            accountNumber={account.accountNumber}
                                            accountType={account.accountType}
                                            className={`card ${cardClass}`} 
                                        />
                                    </div>
                                    <div className="transparent-card"></div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="new-card-btn">
                        <Button className="new-card" label="Add New Card" path="/account/cards/register"/>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </main>
    );
};


export const Account = () => {
    return (
        <div className="dashboard-content">
            <HeaderAccount />
            <MainAccount />
        </div>
    )
}; 