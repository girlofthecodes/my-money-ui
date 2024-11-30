import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({
        id, 
        type='text',
        name, 
        placeholder,
        value, 
        onChange,
        onFocus, 
        className='', 
        autoComplete='', 
        required = false, 
        label, 
        readonly=false
    
}) => {
    const handleChange = readonly ? undefined : onChange;

    return (
        <div>
            {label && <label htmlFor={id} className={`global-label ${className}`}>{label}</label>}
            <input 
                id={id}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}           
                onChange={handleChange}    
                onFocus={onFocus}
                className={`global-input ${className}`}
                autoComplete={autoComplete}
                required={required}
                readOnly={readonly}
            />
        </div>
    )
}

Input.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    className: PropTypes.string,
    autoComplete: PropTypes.string,
    required: PropTypes.bool, 
    label: PropTypes.string, 
    readonly: PropTypes.bool
}