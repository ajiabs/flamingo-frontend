import React from 'react';
import PropTypes from 'prop-types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ChartFunction({ labels, data, title }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        // text: 'Chart.js Line Chart', "linebreak-style": ["error", "windows"],
      },
    },
  };
  const chartdata = {
    labels,
    datasets: data,
  };
  return <Line options={options} data={chartdata} />;
}
ChartFunction.propTypes = {
  labels: PropTypes.oneOfType([PropTypes.array]).isRequired,
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  title: PropTypes.string.isRequired,
};
export default ChartFunction;
