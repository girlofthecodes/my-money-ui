import React from "react";
import { useState } from "react";

import { registerAccount } from "../../api/account";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { Button } from "../common/Button";
export const RegisterAccount = () => {
    
    const [formData, setFormData] = useState({
        accountName: '',
        accountType: '',
        accountNumber: '',
        currentBalance: '',
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        try { 
            await registerAccount(
                formData.accountName, 
                formData.accountType, 
                formData.accountNumber, 
                formData.currentBalance
            ); 
        } catch (error) {
            const errorData = JSON.parse(error.message); 
            setErrors(errorData);
        }
        
    }; 

    return (
        <div className="register-container">
            <div className="list"></div>
            <div className="register account">
                <form onSubmit={handleSubmit} className="form account">
                    <Input
                        id="accountName"
                        type="text"
                        name="accountName"
                        placeholder="Account Name"
                        value={formData.accountName} 
                        onChange={handleInputChange}
                        label="Account Name"
                    />
                    <Select
                        label="Account Type"
                        name="accountType"
                        options={accountTypes}
                        value={formData.accountType}
                        onChange={handleInputChange}
                        placeholder="Choose a type of account"
                    />
                    <Input
                        id="accountNumber"
                        type="text"
                        name="accountNumber"
                        placeholder="Account Number"
                        value={formData.accountNumber} 
                        onChange={handleInputChange}
                        label="Account Number"
                        autoComplete="off"
                    />
                    <Input
                        id="currentBalance"
                        type="number"
                        name="currentBalance"
                        placeholder="Current Balance"
                        value={formData.currentBalance}  
                        onChange={handleInputChange}
                        label="Current Balance"
                    />
                    <Button label="Add Card"/>
                </form>
            </div>
        </div>
    )
}; 