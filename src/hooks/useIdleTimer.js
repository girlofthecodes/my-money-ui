import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAccessToken, isTokenExpired } from '../api/token';
import { useLogout } from './useLogout';

const INACTIVITY_TIMEOUT = 120 * 60 * 1000; // 15 minutos de timeout (puedes ajustarlo a 120 minutos si lo prefieres)

export const useIdleTimer = () => {
    const navigate = useNavigate();
    const handleLogout = useLogout();
    const accessToken = getAccessToken();

    const [timeLeft, setTimeLeft] = useState(INACTIVITY_TIMEOUT); // Estado para mostrar el tiempo restante (solo en consola)

    useEffect(() => {
        if(!accessToken) return; 
        let inactivityTimer;
        let countdownInterval; // Intervalo para contar el tiempo restante

        const handleInactivity = async () => {
            const accessToken = getAccessToken();
            if (isTokenExpired(accessToken)) {
                await handleLogout();
            }
        };

        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            setTimeLeft(INACTIVITY_TIMEOUT); // Reiniciar el tiempo restante

            // Reiniciar el temporizador de inactividad
            inactivityTimer = setTimeout(() => {
                handleInactivity(); // Llamar a handleInactivity cuando se acabe el tiempo
            }, INACTIVITY_TIMEOUT);
        };

        // Configurar el intervalo para contar el tiempo restante (en segundos)
        countdownInterval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 0) {
                    clearInterval(countdownInterval); // Detener el intervalo
                    handleInactivity(); // Ejecutar el logout al llegar a 0
                    return 0; // No permitir que el tiempo sea negativo
                }
                return prevTime - 1000; // Decrementar el tiempo en 1 segundo
            });
        }, 1000);

        // Detectar eventos de actividad
        const events = ['mousemove', 'keydown', 'scroll'];
        events.forEach((event) => window.addEventListener(event, resetTimer));

        resetTimer(); // Iniciar el temporizador

        // Cleanup al desmontar el componente
        return () => {
            events.forEach((event) => window.removeEventListener(event, resetTimer));
            clearTimeout(inactivityTimer);
            clearInterval(countdownInterval);
        };
    }, [navigate, handleLogout]);

    return null; 
};
