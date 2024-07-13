import React from 'react';
import './SummaryPercentage.scss';
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import productData from '../../../product.json';

const ProductPercentage = ({ type, productName }) => {
  const product = productData.find(item => item.product_name === productName);

  let data1;

  if (!productName || !product) {
    // Show default progress bar with 0% when no product is selected
    data1 = {
      icon: null,
      title: 'Progress',
      chart: (
        <CircularProgressbar
          value={0}
          text={`0%`}
        />
      )
    };
  } else {
    switch (type) {
      case 'complete':
        data1 = {
          icon: <DoneAllRoundedIcon className='icon' />,
          title: 'COMPLETED PERCENTAGE',
          chart: (
            <CircularProgressbar
              value={product.completed_percentage}
              text={`${product.completed_percentage}%`}
            />
          )
        };
        break;
      case 'notComplete':
        data1 = {
          icon: <PriorityHighRoundedIcon className='icon' />,
          title: 'TO BE COMPLETED PERCENTAGE',
          chart: (
            <CircularProgressbar
              value={100 - product.completed_percentage}
              text={`${100 - product.completed_percentage}%`}
            />
          )
        };
        break;
      default:
        data1 = {
          icon: null,
          title: 'UNKNOWN TYPE',
          chart: null,
        };
        break;
    }
  }

  return (
    <div className='percentage'>
      <div className='top'>
        {data1.icon}
        <span className='title'>{data1.title}</span>
      </div>
      <div className='bottom'>
        <div className='chart'>
          {data1.chart}
        </div>
      </div>
    </div>
  );
}

export default ProductPercentage;
