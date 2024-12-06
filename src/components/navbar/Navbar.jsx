import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { useUserData } from "../../hooks/useUserData";
import { useLogout } from '../../hooks/useLogout';
import { useDarkMode } from "../../context/DarkModeContext"; 

import { 
    faHouse, faCreditCard, faHandshake, faMoneyBillTransfer, 
    faHeadphones, faArrowsRotate, faUser, faWallet, faMagnifyingGlass, 
    faUserPlus, faPlus, faPenToSquare, faGear, faBell, faRightFromBracket,
    faClipboard, faCrown, faLightbulb, faToggleOn, faToggleOff, faMoon, faSun,
    faEllipsisVertical, faEllipsis, faEnvelope, faKey,
} from '@fortawesome/free-solid-svg-icons';

const Submenu = ({ 
    items, 
    isIconsOnly, 
    toggleIconsOnly, 
    isNotifications,
    toggleNotifications, 
    handleLogout}) => {
    
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    return (
        <ul className="container-submenu">
            <li className="item">
                <Button
                    className="navbar-icon menu"
                    icon={isIconsOnly ? faEllipsis : faEllipsisVertical}
                    onClick={toggleIconsOnly}
                />
            </li>
            {items.map((item, index) => (
                <li className={`item ${item.toggle ? 'toggle':''}`} key={index}>
                    <Button  
                        className="navbar-icon"
                        icon={item.icon} 
                        label={isIconsOnly ? "" : item.label}
                        onClick={item.action}
                    />
                    {item.toggle && !isIconsOnly && item.type === "darkMode" && (
                        <Button  
                            className="navbar-icon toggle"
                            icon={isDarkMode ? faToggleOn : faToggleOff} 
                            onClick={toggleDarkMode}
                        />
                    )}
                    {item.toggle && !isIconsOnly && item.type === "notifications" && (
                        <Button  
                            className="navbar-icon toggle"
                            icon={isNotifications ? faToggleOn : faToggleOff} 
                            onClick={toggleNotifications}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
}; 


export const Menu = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showSubmenuSettings, setShowSubmenuSettings] = useState(false);
    const [showSubmenuUser, setShowSubmenuUser] = useState(false);
    const [isIconsOnly, setIsIconsOnly] = useState(true);
    const [isNotificationsOn, setIsNotificationsOn] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode(); 

    const { userData } = useUserData();
    const handleLogout = useLogout(); 
    
    const navigate = useNavigate();

    const toggleSubmenuSettings = () => {
        setShowSubmenuSettings(prevState => !prevState);
        if (showSubmenuUser) setShowSubmenuUser(false);  
    };

    const toggleSubmenuUser = () => {
        setShowSubmenuUser(prevState => !prevState);
        if (showSubmenuSettings) setShowSubmenuSettings(false); 
    };

    const toggleIconsOnly = () => {
        setIsIconsOnly(!isIconsOnly); 
    };

    const toggleNotifications = () => {
        setIsNotificationsOn(!isNotificationsOn);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }); 

    const settingsMenuItems =[
        {
            icon: faPlus, 
            label: "Add Account"
        }, 
        {
            icon: faBell, 
            label: "Notifications", 
            toggle: true,
            type: "notifications"
        }, 
        {
            icon: isDarkMode ? faMoon: faSun, 
            label: isDarkMode ? "Dark Mode":" Light Mode",
            toggle: true, 
            type: "darkMode"
        }
    ]

    const userMenuItems = [
        {
            icon: faPenToSquare, 
            label: "Profile"
        }, 
        {
            icon: faCrown, 
            label: "Upgrade to PRO"
        }, 
        { 
            icon: faKey, 
            label: "Change Password",
            action: () => navigate('/auth/change-password')
        },
        {
            icon: faRightFromBracket, 
            label: "Logout",
            action: handleLogout
        }
    ]; 

    return (
        <nav className={`navbar ${isIconsOnly ? 'icons-only' : 'expanded'} ${isDarkMode ? 'dark-mode' : ''}`}>
            <ul className="container-navbar">
                <li className="item">
                    <Button 
                        className="navbar-icon menu"
                        icon={isIconsOnly ? faEllipsis : faEllipsisVertical} 
                        onClick={toggleIconsOnly}
                    />
                </li>
                {!isIconsOnly && (
                    <li className="item img">
                        <div className="img-container">
                            <img src="/src/assets/logo.png" alt="save smart" className="img-company"/>
                        </div>
                        <h2 className="company">SaveSmart</h2>
                    </li>
                )}
                <li className="item search">
                    {!isIconsOnly && (
                        <Input 
                            type="text" 
                            placeholder="Search" 
                            autoComplete="off"
                            className="search-input" 
                        />
                    )}
                    <Button  
                        className="navbar-icon search"
                        icon={faMagnifyingGlass}
                    />
                </li>
            {isAuthenticated ? (
            <>
                {!isIconsOnly && <p className="label-item">Menu</p>}
                <li className="item">
                    <Button  
                        className="navbar-icon"
                        icon={faHouse} 
                        label={isIconsOnly ? "" :"Dashboard"}
                        path="/"
                    />
                </li>
                <li className="item">
                    <Button  
                        className="navbar-icon"
                        icon={faCreditCard} 
                        label={isIconsOnly ? "" :"Accounts"}
                        path="/account"
                    />
                </li>
                <li className="item">
                    <Button  
                        className="navbar-icon"
                        icon={faHandshake} 
                        label={isIconsOnly ? "" : "Transactions"}
                    />
                </li>
                <li className="item">
                    <Button  
                        className="navbar-icon"
                        icon={faMoneyBillTransfer} 
                        label={isIconsOnly ? "" :"Savings Goals"}
                    /> 
                </li>
                <li className="item">
                    <Button    
                        className="navbar-icon"
                        icon={faArrowsRotate} 
                        label={isIconsOnly ? "" :"Refresh"}
                    />
                </li>
                <li className="item">
                    <Button  
                        className="navbar-icon"
                        icon={faGear} 
                        label={isIconsOnly ? "" : "Settings"} 
                        onClick={toggleSubmenuSettings} 
                    />
                </li>
                {showSubmenuSettings && (
                    <div className={`submenu ${isIconsOnly ? 'icons-only' : 'expanded'}`}>
                        <Submenu 
                            items={settingsMenuItems} 
                            isIconsOnly={isIconsOnly} 
                            toggleIconsOnly={toggleIconsOnly} 
                            isNotifications={isNotificationsOn}
                            toggleDarkMode={toggleDarkMode}
                            toggleNotifications={toggleNotifications} 
                        />
                    </div>
                )}
                <li className="item">
                    <Button
                        className="navbar-icon"
                        icon={faHeadphones} 
                        label={isIconsOnly ? "" :"Help Center"}
                    />
                </li>
                {!isIconsOnly && <p className="label-item">Account</p>}
                <li className="item">
                    <Button  
                        className="navbar-icon"
                        icon={faUser} 
                        label={isIconsOnly ? "" :"User"} 
                        onClick={toggleSubmenuUser}
                    />
                </li>
                {showSubmenuUser && (
                    <div className={`submenu ${isIconsOnly ? 'icons-only' : 'expanded'}`}>
                        <li className="item data">
                            <img src={"/src/assets/user-black.png"} alt="img-user" className="img-user"/>
                            {!isIconsOnly && (
                                <div className="user-info">
                                    <span className="username-data">{userData.username}</span>
                                    <span className="email-data">{userData.email}</span>
                                </div>
                            )}
                        </li>
                        <Submenu 
                            items={userMenuItems} 
                            isIconsOnly={isIconsOnly} 
                            toggleIconsOnly={toggleIconsOnly} 
                            handleLogout={handleLogout}
                        />
                    </div>
                )}
                <li className="item">
                    <Button 
                        className="navbar-icon"
                        icon={faEnvelope} 
                        label={isIconsOnly ? "" :"Message"}
                    />
                </li>
                
            </>
            ) : (
                <>
                    <li className="item">
                        <Button  
                            className="navbar-icon"
                            icon={faHouse} 
                            label={isIconsOnly ? "" :"Dashboard"}
                            path="/"
                        />
                    </li>
                    <li className="item">
                        <Button  
                            className="navbar-icon"
                            icon={faWallet} 
                            label={isIconsOnly ? "" :"Savings Simulator"}
                        />
                    </li>
                    <li className="item">
                        <Button  
                            className="navbar-icon"
                            icon={faClipboard} 
                            label={isIconsOnly ? "" :"Financial Tips"}
                        />
                    </li>
                    <li className="item">
                        <Button  
                            className="navbar-icon"
                            icon={faLightbulb} 
                            label={isIconsOnly ? "" :"About the App"}
                        />
                    </li>
                    <li className="item">
                        <Button  
                            className="navbar-icon"
                            icon={faUserPlus} 
                            label={isIconsOnly ? "" :"Sign Up"}
                            path="/auth/signup"
                        />
                    </li>
                    <li className="item">
                        <Button  
                            className="navbar-icon"
                            icon={faUser} 
                            label={isIconsOnly ? "" :"Login"} 
                            path="/auth/login"
                        />
                    </li>
                    <li className="item">
                        <Button  
                            className="navbar-icon"
                            icon={faGear} 
                            label={isIconsOnly ? "" :"Settings"}
                        />
                    </li>
                </>
            )}
            </ul>
        </nav>
    );
}    