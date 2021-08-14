import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';

const StateGraph = ({ labels, dataValues }) => {
  const history = useHistory();

  const graphClickEvent = (event, chartElements) => {
    if (chartElements.length > 0) {
      console.log(chartElements[0].index, data.labels[chartElements[0].index]);
      history.push(`/state/${data.labels[chartElements[0].index]}`);
    }
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        borderColor: 'blue',
        backgroundColor: 'rgb(0, 140, 255, 0.5)',
        borderWidth: 2,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };
  const options = {
    responsive: true,

    onClick: graphClickEvent,
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className='card dashCard'>
      <div className='row'>
        <div className='col s12 l6 offset-l3 center-align'>
          <h2 className='flow-text text-secondary'>State-Wise Distribution</h2>
        </div>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default StateGraph;
