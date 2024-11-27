import React from 'react';

import { Card } from './common/Card';

import { IoSwapHorizontalOutline, IoAnalyticsSharp , IoMailUnread, IoWallet, IoApps, IoSettings, IoNotifications, IoPersonCircleSharp , IoChevronDownOutline } from "react-icons/io5";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle  } from "react-icons/io";
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
    return ( 
        <main className="dashboard-main">
            <div className="container-main tools">hola</div>
            <div className="container-main cards">
                <div className="all-cards">
                    <div className="count-cards">
                        <h2>Your cards</h2>
                        <p className='total-card'>3</p>
                    </div>
                    <div>
                        <IoIosArrowDropleftCircle className="db-icon"/>
                        <IoIosArrowDroprightCircle className="db-icon"/>
                    </div>
                </div>
                <Card accountNumber='5123456789045678' accountType="Vales"/>
            </div>
        </main>
    )
}; 

export const Account = () => {
    return (
        <div className="dashboard-content">
            <HeaderAccount />
            <MainAccount />
        </div>
    )
}; 