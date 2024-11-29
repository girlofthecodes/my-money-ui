import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

import { RiMastercardFill, RiVisaLine  } from "react-icons/ri";
import { HiMiniWallet } from "react-icons/hi2";
import { FaShop, FaCartShopping } from "react-icons/fa6";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { PiMoneyWavyFill } from "react-icons/pi";

import { cardIdentifier } from "../../../validators/account/cardIdentifier";
export const Card = ({ className, accountNumber, accountType }) => {
    const formatCardNumber = (number) => {
        return number.replace(/(\d{4})(?=\d)/g, "$1 ")
    };

    const cardIdentifierType = cardIdentifier(accountNumber); 

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
        <div>
            <div className={`card ${cardClass()} ${className}`}>
                <div className="type-card-opt">
                    {accountType === "Nómina" && cardIdentifierType == "Visa" && (
                        <div className="item-card">
                            <RiVisaLine className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Nómina" && cardIdentifierType == "MasterCard" && (
                        <div className="item-card">
                            <RiMastercardFill className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Crédito" && cardIdentifierType == "Visa" && (
                        <div className="item-card">
                            <RiVisaLine className="db-icon"/>
                            <p className="type-card">{accountType}</p>
                        </div>
                    )}
                    {accountType === "Crédito" && cardIdentifierType == "MasterCard" && (
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

Card.propTypes = {
    className: PropTypes.string,
    accountNumber: PropTypes.string,
    accountType: PropTypes.string,
};
