import { useState, useEffect } from 'react';

// Hook para recuperar los datos del usuario
export const useUserData = () => {
    const [userData, setUserData] = useState({ username: '', email: '' });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("accessToken");
            
            if (!token) {
                setError("No token found");
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/auth/user/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const data = await response.json();
                setUserData({ username: data.username, email: data.email });
            } catch (error) {
                setError(error.message);
            } 
        };

        fetchUserData();
    }, []);

    return { userData, error };
};

