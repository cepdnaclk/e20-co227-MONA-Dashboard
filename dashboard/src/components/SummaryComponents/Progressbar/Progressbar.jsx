import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Progressbar = ({ title, value }) => {
  const options = {
    series: [value],  // Use the value prop here
    chart: {
      height: 350,
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
          background: '#fff',
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
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
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
    <div id="chart">
      <ReactApexChart options={options} series={options.series} type="radialBar" height={350} />
    </div>
  );
};

export default Progressbar;
