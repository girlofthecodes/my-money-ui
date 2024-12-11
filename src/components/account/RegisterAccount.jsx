import React from "react";
import { useState } from "react";

import dayjs from 'dayjs';

import { registerAccount } from "../../api/account";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
import { ExpirationDatePicker } from "../common/Calendar";
import { useUserData} from '../../hooks/useUserData'; 

import { IoCreateOutline, IoWifi } from "react-icons/io5";
export const RegisterAccount = () => {
    const { userData } = useUserData();
    const [ accounts, setAccounts] = useState([]); 
    const [formData, setFormData] = useState({
        accountName: '',
        accountType: '',
        accountNumber: '',
        currentBalance: '',
        dueDate: '',
    })

    const [ errors, setErrors] = useState(''); 

    const accountTypes = [
        { value: "Ahorro", label: "Ahorro" },
        { value: "Nómina", label: "Nómina" },
        { value: "Efectivo", label: "Efectivo" },
        { value: "Crédito", label: "Crédito" },
        { value: "Wallet", label: "Wallet" },
        { value: "Departamental", label: "Departamental" },
        { value: "Vales", label: "Vales" }
    ];

    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (formattedDate) => {
        setSelectedDate(dayjs(formattedDate));  
        setFormData({
            ...formData,
            dueDate: formattedDate,  
        });
    };
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try { 
            await registerAccount(
                formData.accountName, 
                formData.accountType, 
                formData.accountNumber, 
                formData.currentBalance, 
                formData.dueDate
            ); 

            setAccounts((prevAccounts) => [
                ...prevAccounts,
                {
                    accountName: formData.accountName,
                    accountType: formData.accountType,
                    accountNumber: formData.accountNumber,
                    currentBalance: formData.currentBalance,
                    dueDate: formData.dueDate
                },
            ]);

            setFormData({
                accountName: '', 
                accountType: '',
                accountNumber: '',
                currentBalance: '',
                dueDate: '',
            }); 

        } catch (error) {
            const errorData = JSON.parse(error.message); 
            setErrors(errorData);
        }
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
        <div className="register-container">
            <div className="register account">
                <div className="container-aditional-register">
                    <div className="container-img-data">
                        <div className="img-container">
                            <img src="/src/assets/logo.png" alt="save smart" className="img-company"/>
                        </div>
                        <div>
                            <h4>Register Card</h4>
                        </div>
                    </div>
                    <div className="edit-register">
                        <IoCreateOutline className="icon"/>
                        <p>Edit</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="form func-account">
                    <Input
                        id="accountName"
                        type="text"
                        name="accountName"
                        placeholder="Account Name"
                        value={formData.accountName} 
                        onChange={handleInputChange}
                        label="Account Name"
                        text="Enter the name associated with the account"
                        className="item-account-register"
                        autoComplete="off"
                    />
                    <Input
                        id="accountNumber"
                        type="text"
                        name="accountNumber"
                        placeholder="Account Number"
                        value={formData.accountNumber} 
                        onChange={handleInputChange}
                        label=" Card Number"
                        text="Enter the 16-digit card number on the card"
                        autoComplete="off"
                        className="item-account-register"
                    />
                    <div className="container-row-form">
                        <Select
                            label="Account Type"
                            text="Enter the category of the account"
                            name="accountType"
                            options={accountTypes}
                            value={formData.accountType}
                            onChange={handleInputChange}
                            placeholder="Choose a type of account"
                            className="item-account-register select"
                            classnamecontainer = "row"
                        />
                        <Input
                            id="currentBalance"
                            type="number"
                            name="currentBalance"
                            placeholder="Current Balance"
                            value={formData.currentBalance}  
                            onChange={handleInputChange}
                            label="Current Balance"
                            text="Enter the total amount of money available in the account"
                            className="item-account-register balance"
                            classnamecontainer = "row"
                        />
                    </div>
                    <div className="expired-data calendar">
                        <label htmlFor="expirationDate" className="expiration-date ">Expiration Date</label>
                        <p className="expiration-date-text">Enter the expiration date of the card</p>
                        <ExpirationDatePicker selectedDate={selectedDate} onChange={handleDateChange} />
                    </div>
                    <Button 
                        label="Add Account"
                        type="submit"
                    />
                </form>
            </div>
            <div className="list">
                {accounts.length > 0 ? (
                    accounts.map((account, index) => (
                        <div key={index} className="data-register">
                            <div className="card-register">
                                <div className="card-register-icon">
                                    <img src="/src/assets/chip.png" alt="chip icon" className="img-chip-card"/>
                                    <IoWifi className="chip icon" />
                                </div>
                                <div>
                                    <p>{account.accountName}</p>
                                    <p>{formatCardNumber(account.accountNumber)}</p>
                                </div>
                                <div>
                                    <p>{formatDate(account.dueDate)}</p>
                                    <p>{account.accountType}</p>
                                </div>
                            </div>
                            <div className="data-global-register">
                                <p>Account Name: <span>{account.accountName}</span></p>
                                <p>Account Number: <span>{account.accountNumber}</span></p>
                                <p>Current Balance: <span>{account.currentBalance}</span></p>
                                <p>Expired Date: <span>{account.dueDate}</span></p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="data-register">
                        <div className="card-register">
                            <div className="card-register-icon">
                                <img src="/src/assets/chip.png" alt="chip icon" className="img-chip-card"/>
                                <IoWifi className="chip icon" />
                            </div>
                        </div>
                        <div className="data-global-register">
                            <p>Account Name:</p>
                            <p>Account Number: </p>
                            <p>Current Balance: </p>
                            <p>Expired Date: </p>
                        </div>
                    </div>
                )}
                <div className="current-balance-register">
                    <p>You total balance is</p>
                    <p><span>$ </span>{(accounts.reduce((total, acc) => total + parseFloat(acc.currentBalance || 0), 0)).toFixed(2)} <span> MX</span></p>
                </div>
            </div>
        </div>
    );
}; 