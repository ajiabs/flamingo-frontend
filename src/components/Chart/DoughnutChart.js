import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({
  labels,
  datas,
  label,
  backgroundColor,
  borderColor,
  borderWidth,
  title,
  height,
  width,
}) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label,
        data: datas,
        backgroundColor,
        borderColor,
        borderWidth,
      },
    ],
  };
  return <Doughnut width={width} height={height} options={options} data={data} />;
}

DoughnutChart.defaultProps = {
  height: 500,
  width: 500,
};
DoughnutChart.propTypes = {
  labels: PropTypes.oneOfType([PropTypes.array]).isRequired,
  datas: PropTypes.oneOfType([PropTypes.array]).isRequired,
  label: PropTypes.string.isRequired,
  backgroundColor: PropTypes.oneOfType([PropTypes.array]).isRequired,
  borderColor: PropTypes.oneOfType([PropTypes.array]).isRequired,
  borderWidth: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};
export default DoughnutChart;
