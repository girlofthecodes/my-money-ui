import React from "react";
import { useState } from "react";

import { RiMastercardFill, RiVisaLine  } from "react-icons/ri";
import { HiMiniWallet } from "react-icons/hi2";
import { FaShop, FaCartShopping } from "react-icons/fa6";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { PiMoneyWavyFill } from "react-icons/pi";

import { cardIdentifier } from "../../../validators/account/cardIdentifier";
export const Card = ({ accountNumber, accountType }) => {
    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, "$1 ")
    };

    const cardIdentifierType = cardIdentifier(accountNumber); 

    const cardClass = () => {
        switch (accountType) {
            case "Debito":
                return "debito";
            case "Credito":
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
        <div className="card-container">
            
            <div className={`card ${cardClass()}`}>
                <div className="type-card-opt">
                    {accountType === "Debito" && cardIdentifierType == "Visa" && (
                        <div className="item-card">
                            <RiVisaLine className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Debito" && cardIdentifierType == "MasterCard" && (
                        <div className="item-card">
                            <RiMastercardFill className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Credito" && cardIdentifierType == "Visa" && (
                        <div className="item-card">
                            <RiVisaLine className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Credito" && cardIdentifierType == "MasterCard" && (
                        <div className="item-card">
                            <RiMastercardFill className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Wallet" && (
                        <div className="item-card">
                            <HiMiniWallet className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Departamental" && (
                        <div className="item-card">
                            <FaShop className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Ahorro" && (
                        <div className="item-card">
                            <BsFillPiggyBankFill className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}

                    {accountType === "Vales" && (
                        <div className="item-card">
                            <FaCartShopping className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Efectivo" && (
                        <div className="item-card">
                            <PiMoneyWavyFill className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                </div>
                <div className="number-card">
                    <p>{formatCardNumber(accountNumber)}</p>
                </div>
            </div>
        </div>
    );
};

