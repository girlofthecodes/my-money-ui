import React from 'react'; 
import { IoTrashOutline } from 'react-icons/io5'; 

export const TransactionList = ({ transactions, handleDelete, type, descriptionKey, amountKey, dateKey }) => {
    return (
        <div className='container-concept-id-all'>
            {transactions.length === 0 ? (
                <div className="empty-data">
                <p>{type} not registered</p>
                </div>
            ) : (
                transactions.map((transaction, index) => (
                    <div key={index} className="container-concept-id">
                        <div className="description-concept-id">
                        <p>Label: <span>{transaction.label.label_name}</span></p>
                        <p>Amount: <span>{transaction[amountKey]}</span></p>
                        <p>Description: <span>{transaction[descriptionKey]}</span></p>
                        <p>Date: <span>{transaction[dateKey]}</span></p>
                        </div>
                        <div className="delete-account">
                        <IoTrashOutline onClick={() => handleDelete(transaction.id)} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};