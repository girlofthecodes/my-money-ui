import React from 'react';
import { useState, useEffect } from 'react';

import { Card } from './common/Card';
import { listAccounts } from '../../api/account';
import { Button } from '../common/Button';

import { IoSwapHorizontalOutline, IoAnalyticsSharp , IoMailUnread, IoWallet, IoApps, IoSettings, IoNotifications, IoPersonCircleSharp , IoChevronDownOutline } from "react-icons/io5";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle  } from "react-icons/io";

import { faPlus} from '@fortawesome/free-solid-svg-icons';

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
    const [accounts, setAccounts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const getAccounts = async () => {
        const data = await listAccounts(); 
        setAccounts(data);
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

    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <main className="dashboard-main">
            <div className="container-main tools">
                <h1>Hola</h1>
            </div>
            <div className="container-main cards">
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