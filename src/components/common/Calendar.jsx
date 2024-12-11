import React from "react";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export const ExpirationDatePicker = ({ selectedDate, onChange }) => {
    
    const handleDateChange = (date) => {
        const formattedDate = date.format("YYYY-MM-DD");
        console.log("Fecha formateada: ", formattedDate);  
        onChange(formattedDate);  
    };

    return (
        <div className="container-calendar">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                    onChange={handleDateChange}
                    value={selectedDate}
                    views={['day']} 
                />
            </LocalizationProvider>
        </div>
    );
}
