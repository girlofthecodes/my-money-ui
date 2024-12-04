import React from 'react';

import { Card } from "./Card"

import { IoChevronDown } from "react-icons/io5";

export const CardItem = ({ className, accountNumber, accountType, currentBalance, totalIncome, totalExpense, }) => {
    const cardClass = () => {
        switch (accountType) {
            case "Nómina":
                return "nomina";
            case "Crédito":
                return "credito";
            case "Wallet":
                return "wallet";
            case "Departamental":
                return "departamental";
            case "Ahorro":
                return "ahorro";
            case "Vales":
                return "vales";
            case "Efectivo":
                return "efectivo";
            default:
                return ""; 
        }
    };

    return (
        <div className="account-item">
            <div className="account-item1">
                <Card
                    className={className}
                    accountNumber={accountNumber} 
                    accountType={accountType}
                />
            </div>
            <div className="account-item2">
                <div className="card-item-balance">
                    <p className="card-item-label">BALANCE</p>
                    <p className="card-item-total">${currentBalance}<span> MX</span></p>
                </div>
                <div className="card-item-control">
                    <div>
                        <p className="card-item-label">Received</p>
                        <p className="card-item-total">+ ${totalIncome}</p>
                    </div>
                    <div>
                        <p className="card-item-label">Spent</p>
                        <p className="card-item-total">- ${totalExpense}</p>
                    </div>
                </div>
            </div>
            <div className={`account-item3 ${cardClass()}`}>
                <IoChevronDown/>
            </div>
        </div>
    )
}