import React from 'react';
import './SummaryChart.scss';
import { Line } from "react-chartjs-2";
import { defaults } from 'chart.js/auto';
import chartdata from '../../../productChart.json';

defaults.responsive = true;
defaults.maintainAspectRatio = false;

const ProductChart = ({ productName }) => {
  let product;
  let data = [];
  let labels = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  if (productName) {
    product = chartdata.find(item => item.product_name === productName);
  }

  if (product) {
    data = product.data.map((data) => data['Completed Products']);
    labels = product.data.map((data) => data.label);
  } else {
    data = new Array(7).fill(0); // Default to 0 values if no product is selected or found
  }

  return (
    <div className='chart'>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: "Completed Products",
              data: data,
              backgroundColor: '#36a2eb',
              borderColor: '#36a2eb',
            },
          ],
        }}
      />
    </div>
  );
}

export default ProductChart;
