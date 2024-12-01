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
    IoArrowUpCircleOutline  } from "react-icons/io5";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";


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

export const MainAccount = () => {
    const [ accounts, setAccounts ] = useState([]);
    const [ totalBalance, setTotalBalance ] = useState(0); 
    const [ incomes, setIncomes ] = useState([]);
    const [ totalIncome, setTotalIncome ] = useState(0);
    const [ expenses, setExpenses] = useState([]);
    const [ totalExpense, setTotalExpense ] = useState(0);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [accountTypesMap, setAccountTypesMap] = useState({});
    
    //console.log(incomes)
    //console.log(accounts)
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
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? accounts.length - 1 : prevIndex - 1
        );
    };

    const goNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === accounts.length - 1 ? 0 : prevIndex + 1
        );
    };

    const getAccountType = (accountName) => {
        const accountMap = accounts.reduce((map, account) => {
            map[account.accountName] = account.accountType;
            //console.log(map)
            return map;
        }, {});
    
        return accountMap[accountName] || null; 
    };

    useEffect(() => {
        getAccounts();
        getIncomes();
        getExpenses();
    }, []);
    

    return (
        <main className="dashboard-main">
            <div className="container-main tools">
                <div className="container-main parts">
                    <div className="container-tools tools1">hola</div>
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
                            <div className='description-detail'>
                                <p>View All</p>
                                <IoChevronForwardOutline className="db-icon"/>
                            </div>
                            {incomes.map((income, index) => {
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
                            })}
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
                            <div className='description-detail '>
                                <p>View All</p>
                                <IoChevronForwardOutline className="db-icon"/>
                            </div>
                            {expenses.map((expense, index) => {
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
                            })}
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
                            <IoIosArrowDropleftCircle className="db-icon" onClick={goPrev} />
                            <IoIosArrowDroprightCircle className="db-icon" onClick={goNext} />
                        </div>
                    </div>
                    <div className="card-container">
                        {accounts.map((account, index) => (
                            <div
                                key={account.id}
                                className={`card-wrapper ${index === currentIndex ? "visible" : "hidden"}`}
                            >
                                <Card
                                    accountNumber={account.accountNumber}
                                    accountType={account.accountType}
                                    className={index === currentIndex ? "visible-card" : "hidden-card"}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="new-card-btn">
                        <Button className="new-card" label="Add New Card" path="/account/register"/>
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