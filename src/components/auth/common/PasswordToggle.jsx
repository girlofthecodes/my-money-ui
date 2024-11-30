import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Importar íconos de alguna librería o usar SVG
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const PasswordToggle = ({ 
    label,
    value, 
    onChange, 
    placeholder, 
    className='', 
    required = false
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const inputId = `password-${placeholder.replace(/\s+/g, '-').toLowerCase()}`;
    const toggleVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div>
            <label 
                htmlFor={inputId}
                className={`password-toggle-label ${className}`}
                >{label}
                <FontAwesomeIcon 
                    className="icon" 
                    icon={isPasswordVisible ? faEye:faEyeSlash}
                    onClick={toggleVisibility}
                />
            </label>
            <input
                id={inputId}
                type={isPasswordVisible ? 'text' : 'password'}  
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                maxLength={20}
                className={`password-toggle-input ${className}`}
                required={required}
            />
        </div>
    );
};

PasswordToggle.propTypes = {
    label: PropTypes.string, 
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string, 
    required: PropTypes.bool
}

