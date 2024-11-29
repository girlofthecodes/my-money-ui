import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Button = ({ 
    path, 
    icon, 
    label, 
    className, 
    onClick, 
}) => {
    const navigate = useNavigate(); 

    const handleNavigation = () => {
        if (path) {
            navigate(path);
        } else if (onClick) {
            onClick();  
        }
    }

    return (
        <button 
            onClick={handleNavigation} 
            className={`global-button ${className}`}>
                { icon && <FontAwesomeIcon icon={icon} className='icon'/> }
                { label && <span className='label'>{label}</span> }
        </button>
    )    
}


Button.propTypes = {
    path: PropTypes.string,
    icon: PropTypes.object,
    label: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
};