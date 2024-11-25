import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export const PasswordValidation = ({ validations }) => {
    return (
        <div className="password-validation">
            <p>Your password must contain:</p>
            <ul>
                {validations.map((validation, index) => (
                    <li key={index}>
                        <FontAwesomeIcon className={`icon ${validation.isValid ? 'active' : ''}`} icon={faCheck}/>
                        {validation.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

