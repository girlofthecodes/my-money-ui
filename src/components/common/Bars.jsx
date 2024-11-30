import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export const BarPlot = ({ totalAmount, accounts }) => {
    const dataValues = accounts.map(account => (account.currentBalance / totalAmount) * 100);
    const chartData = {
        labels: accounts.map(account => account.accountName),  
        datasets: [
            {
                label: [],
                data: dataValues,  
                backgroundColor: '#5633d1',  
                borderColor: 'transparent',
                borderWidth: 1,
                barThickness: 40,  
            },
        ],
    };

    const chartOptions = {
        responsive: true,  
        maintainAspectRatio: false,  
        animation: {
            duration: 0, 
        },
        scales: {
            x: {
                grid: {
                    display: false,  
                },
                ticks: {
                    display: false,  
                },
            },
            y: {
                grid: {
                    display: false,  
                },
                ticks: {
                    display: false,  
                },
            },
        },
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.raw.toFixed(2) + '%';  
                    },
                },
            },
            legend: {
                display: false,  
            },
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: (value) => value.toFixed(2) + '%',  
                color: '#000',  
                font: {
                    weight: 'bold',
                },
            },
        },
    };

    return (
        <div className="bar-plot-container">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};
