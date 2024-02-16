import { Chart as ChartJS } from 'chart.js';

export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
};

export const CHART_BACKGROUNDS = {
  red: 'rgb(255, 99, 132, 0.2)',
  orange: 'rgb(255, 159, 64, 0.2)',
  yellow: 'rgb(255, 205, 86, 0.2)',
  green: 'rgb(75, 192, 192, 0.2)',
  blue: 'rgb(54, 162, 235, 0.2)',
  purple: 'rgb(153, 102, 255, 0.2)',
};

export const NAMED_COLORS = [
  CHART_COLORS.red,
  CHART_COLORS.orange,
  CHART_COLORS.yellow,
  CHART_COLORS.green,
  CHART_COLORS.blue,
  CHART_COLORS.purple,
];

export const NAMED_BACKGROUNDS = [
  CHART_BACKGROUNDS.red,
  CHART_BACKGROUNDS.orange,
  CHART_BACKGROUNDS.yellow,
  CHART_BACKGROUNDS.green,
  CHART_BACKGROUNDS.blue,
  CHART_COLORS.purple,
];

export const getChartColors = (dataLength) => {
  const length =
    dataLength < NAMED_COLORS.length ? dataLength : NAMED_COLORS.length;

  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(NAMED_COLORS[i]);
  }
  return colors;
};

export const getChartBackgrounds = (dataLength) => {
  const length =
    dataLength < NAMED_BACKGROUNDS.length
      ? dataLength
      : NAMED_BACKGROUNDS.length;

  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(NAMED_BACKGROUNDS[i]);
  }
  return colors;
};

export const CHART_TRIGGER = 768;

export const initialBarChartOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    onResize: function (chart, size) {
      ChartJS.defaults.font.size = window.innerWidth >= CHART_TRIGGER ? 14 : 12;
    },
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        font: { size: 16, weight: 600 },
        text: ['', ''],
      },
    },
    scales: {
      y: {
        ticks: {
          autoSkip: false,
        },
      },
      x: {
        beginAtZero: false,
        grace: '100%',
        ticks: {
          precision: 1,
        },
      },
    },
  };
};

export const initialRadarChartOptions = () => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    onResize: function (chart, size) {
      ChartJS.defaults.font.size = 12;
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        font: { size: 16, weight: 600 },
        text: ['Percentiles', ''],
      },
    },
    scales: {
      r: {
        pointLabels: {
          font: {
            size: 14,
          },
        },
        min: 0,
        max: 100,
      },
    },
  };
};
