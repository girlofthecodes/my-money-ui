import React from 'react'; 

import { IoClose } from "react-icons/io5";
import { RiMastercardFill, RiVisaLine  } from "react-icons/ri";
import { HiMiniWallet } from "react-icons/hi2";
import { FaShop, FaCartShopping } from "react-icons/fa6";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { PiMoneyWavyFill } from "react-icons/pi";

export const ItemNotification = ({ accountType, labelName, description }) => {
    //console.log(accountType, labelName, description)
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
        <div className={`notification ${cardClass()}`}>
            <div className="type-account-nt">
                {accountType === "Nómina" && <RiVisaLine className="db-icon" />}
                {accountType === "Crédito" && <RiMastercardFill className="db-icon" />}
                {accountType === "Wallet" && <HiMiniWallet className="db-icon" />}
                {accountType === "Departamental" && <FaShop className="db-icon" />}
                {accountType === "Ahorro" && <BsFillPiggyBankFill className="db-icon" />}
                {accountType === "Vales" && <FaCartShopping className="db-icon" />}
                {accountType === "Efectivo" && <PiMoneyWavyFill className="db-icon" />}
            </div>
            <div className="data-nt">
                <h4>{labelName}</h4>
                <p>{description}</p>
            </div>
            <div className="exit-nt">
                <div className="close-nt">
                    <IoClose/>
                </div>
            </div>
        </div>
    )
}; 