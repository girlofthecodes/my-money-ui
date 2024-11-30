import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export const CircularChart = ({ totalAmount, calcPercentage, labels }) => {
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
                backgroundColor: ['#0054ff', '#f5d867'], 
                borderColor: '#fff',
                borderWidth: 2, 
            },
        ],
    };

    return (
        <div className="chart-wrapper">
            <div className="chart-container">
                <Pie data={chartData} width={160} height={100} />
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



