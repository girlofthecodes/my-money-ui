import React from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export const DoughnutGrafic = ({ totalAmount, calcPercentage, labels }) => {
    const calculatePercentage = () => {
        if (totalAmount === 0) return [0, 0];

        const calcPercentageValue = (calcPercentage / totalAmount) * 100;
        const remainingBalanceValue = ((totalAmount - calcPercentage) / totalAmount) * 100;
        
        return [calcPercentageValue, remainingBalanceValue];
    };

    const percentages = calculatePercentage(); 

    const chartData = {
        labels: [], 
        datasets: [
            {
                data: [calcPercentage, totalAmount - calcPercentage], 
                backgroundColor: ['#36A2EB', '#FF6384'], 
                borderColor: '#fff',
                borderWidth: 2, 
            },
        ],
    };

    return (
        <div className="chart-wrapper">
            <div className="chart-container">
                <Doughnut data={chartData} width={200} height={200} />
            </div>
            <div className="labels-container">
                {percentages.map((percentage, index) => {
                    if (percentage > 0) { 
                        return (
                            <div key={index} className="label-item">
                                <div
                                    className="color-box"
                                    style={{
                                        backgroundColor: chartData.datasets[0].backgroundColor[index],
                                    }}
                                />
                                <p>{labels[index]}: {percentage.toFixed(2)}%</p>
                            </div>
                        );
                    }
                    return null;                 
                })}
            </div>
        </div>
    );
};


