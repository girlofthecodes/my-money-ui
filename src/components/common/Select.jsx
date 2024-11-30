import React from 'react'; 
import PropTypes from 'prop-types';

export const Select = ({ label, name, options, value, onChange, placeholder, className }) => {
    return (
        <div className='global-select'>
            <label htmlFor={name} className={`global-label ${className}`}>{label}</label>
            <select 
                className='global-select-options'
                name={name}
                id={name}
                value={value}    
                onChange={onChange}
                required
            >
                <option value="">{placeholder}</option>
                {options.map((option, index)=> (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}; 


Select.propTypes = {
    className: PropTypes.string,
    label : PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    }).isRequired),
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired, 
    placeholder: PropTypes.string
}