import { colors } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Progressbar = ({ title, value, gradientFrom, gradientTo }) => {
  const options = {
    series: [value],
    colors: ["#5662cc"],
    chart: {
      height: '100%', // Set height to 100%
      width: '100%',  // Set width to 100%
      type: 'radialBar',
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: '#e0e0e0',  // Track color
          strokeWidth: '67%',
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            color: '#888',
            fontSize: '17px',
            text: title,  // Use the title prop here
          },
          value: {
            formatter: function (val) {
              return `${parseInt(val)}%`;
            },
            color: '#111',
            fontSize: '36px',
            show: true,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientFromColors: ['#201F67'],  // Use the gradientFrom prop
        gradientToColors: ['#99cc33' ],  // Use the gradientTo prop
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [title],  // Use the title prop here
  };

  return (
    <div id="chart" style={{ width: '100%', height: '100%' }}> {/* Set container to 100% */}
      <ReactApexChart options={options} series={options.series} type="radialBar" height="100%" width="100%" /> {/* Set chart height and width to 100% */}
    </div>
  );
};

export default Progressbar;
