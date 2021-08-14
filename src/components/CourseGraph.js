import React from 'react';
import { Bar, defaults, Doughnut } from 'react-chartjs-2';
import { useHistory } from 'react-router-dom';

const CourseGraph = ({ labels, dataValues }) => {
  const history = useHistory();

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          '#B5EAEA',
          '#EDF6E5',
          '#FFBCBC',
          '#F38BA0',
          '#CDF0EA',
          '#D6D2C4',
          '#F7DBF0',
          '#BEAEE2',
          '#A2DBFA',
          '#39A2DB',
        ],
      },
    ],
  };

  const graphClickEvent = (event, chartElements) => {
    if (chartElements.length > 0) {
      console.log(chartElements[0].index, data.labels[chartElements[0].index]);
      history.push('/course/' + data.labels[chartElements[0].index]);
    }
  };

  const clickHandler = () => {
    history.push('/');
  };

  const options = {
    responsive: true,

    onClick: graphClickEvent,
    plugins: {
      legend: {
        position: 'left',
        onClick: clickHandler
      },
    },
  };


  return (
    <div className='card dashCard'>
      <div className='row'>
        <div className='col s12 l6 offset-l3 center-align'>
          <h2 className='flow-text text-secondary'>Course-Wise Distribution</h2>
        </div>
      </div>

      <div className='row'>
        <div className='col s12 l6 offset-l3'>
          {' '}
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CourseGraph;
