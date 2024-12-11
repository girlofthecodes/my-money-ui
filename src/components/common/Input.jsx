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
        text,
        readonly=false, 
        classnamecontainer
    
}) => {
    const handleChange = readonly ? undefined : onChange;

    return (
        <div className={`component-global-common ${classnamecontainer}`}>
            <div className='component-global-data'>
                {label && <label htmlFor={id} className={`global-label ${className}`}>{label}</label>}
                {text && <p className={`global-text ${className}`}>{text}</p>}
            </div>
            <div>
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
                    classnamecontainer = {classnamecontainer}
                />
            </div>
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
    readonly: PropTypes.bool, 
    text: PropTypes.string, 
    classnamecontainer : PropTypes.string,
}