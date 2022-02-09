/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, Title } from 'chart.js';

interface props {
  percentage: Percentage;
}

export default function Stats({ percentage }: props) {
  Chart.register(ArcElement, DoughnutController, Tooltip, Legend, Title);
  const data = {
    labels: ['General', 'Crypto', 'Maybe Scams', 'Hacking', 'Market', 'Illegal Adult Content'],
    datasets: [
      {
        label: '% of pastes',
        data: [
          percentage.General,
          percentage.Crypto,
          percentage.MaybeScams,
          percentage.Hacking,
          percentage.Market,
          percentage.IllegalAdultContent,
        ],
        backgroundColor: [
          'rgb(0, 176, 38)',
          'rgb(252, 149, 23)',
          'rgb(70, 137, 219)',
          'rgb(64, 64, 64)',
          'rgb(255, 226, 5)',
          'rgb(245, 0, 0)',
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 12,
          },
          boxWidth: 10,
          boxHeight: 10,
        },
        position: 'right',
      },
      title: {
        display: true,
        text: '% of pastes by category',
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="stats">
      {/* @ts-ignore */}
      <Doughnut options={options} data={data} />
    </div>
  );
}
