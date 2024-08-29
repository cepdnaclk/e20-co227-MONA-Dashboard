import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ title, seriesData, categories }) => {
  const options = {
    series: seriesData, // Use seriesData prop for data
    chart: {
      height: '90%', 
      width: '90%',  
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: [
      '#4B0082', // Indigo
      '#4169E1',
      '#87CEEB', // Sky Blue
      '#DC143C', // crimson
      '#4682B4', // Steel Blue
      '#00B2A9',  // syan
      '#FF7F50', // Coral

    ],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: title,  // Use title prop
      align: 'left',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: categories,  // Use categories prop for X-axis labels
      title: {
        text: 'Date Range',
      },
    },
    yaxis: {
      title: {
        text: 'Product Count',
      },
      min: 5,
      max: 40,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  return (
    <div id="chart" style={{ width: '100%', height: '100%' }}> {/* Set container to 100% */}
      <ReactApexChart options={options} series={seriesData} type="line" height="100%" width="100%" /> {/* Set chart height and width to 100% */}
    </div>
  );
};

export default LineChart;
