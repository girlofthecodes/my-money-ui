import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import { clearTokens, getAccessToken, isTokenExpired } from '../api/token';
import { useCallback } from 'react'; 

export const useLogout = () => {
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            const token = getAccessToken();
            if(token || isTokenExpired(token)) {
                clearTokens();
                navigate('/auth/login');   
                return; 
            }

            const success = await logout();
            if (success) {
                clearTokens(); 
                navigate('/auth/login');  
            }
        } catch (error) {
            console.error("Error al hacer logout:", error);
            alert('Hubo un error al cerrar sesión. Por favor, inténtalo de nuevo.');
        }
    }, [navigate]);

    return handleLogout;
};