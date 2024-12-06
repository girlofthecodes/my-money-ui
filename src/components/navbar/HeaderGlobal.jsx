import React from "react";
import { useNavigate } from "react-router-dom";

import { IoSwapHorizontalOutline, IoAnalyticsSharp , IoMailUnread, IoWallet, IoApps, 
    IoSettings, IoNotifications, IoPersonCircleSharp , IoChevronDownOutline } from "react-icons/io5";

export const HeaderGlobal = () => {
    const navigate = useNavigate();

    const handleNavigate = (url) => {
        navigate(url)
    }; 

    return (
        <header className='dashboard'>
            <div className="enterprise">
                <h2 className="company">SaveSmart</h2>
            </div>
            <nav className="dashboard-menu">
                <ul className="dashboard-menu-items">
                    <li className="items" onClick={() => handleNavigate('/')}>
                        <IoApps className='db-icon'/>
                        <span>Dashboard</span>
                    </li>
                    <li className="items" onClick={() => handleNavigate('/account')}>
                        <IoAnalyticsSharp  className='db-icon'/>
                        <span>Static</span>
                    </li>
                    <li className="items" onClick={() => handleNavigate('/account/cards')}>
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