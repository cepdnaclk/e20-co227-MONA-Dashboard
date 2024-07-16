import React from 'react';
import './ProductWidgets.scss';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import FunctionsRoundedIcon from '@mui/icons-material/FunctionsRounded';
import productData from '../../../product.json';

const ProductWidgets = ({ type, productName }) => {
  const product = productData.find(item => item.product_name === productName);

  let data;
  switch (type) {
    case 'target':
      data = {
        icon: <FunctionsRoundedIcon className='icon' />,
        title: 'TARGET PRODUCTS',
        count: product ? product.target_products : 'N/A',
      };
      break;
    case 'complete':
      data = {
        icon: <CheckCircleRoundedIcon className='icon' />,
        title: 'TOTAL PRODUCTS MADE',
        count: product ? product.total_products_made : 'N/A',
      };
      break;
    case 'tobe':
      data = {
        icon: <CancelRoundedIcon className='icon' />,
        title: 'PRODUCTS TO BE MADE',
        count: product ? product.left_products : 'N/A',
      };
      break;
    default:
      data = {
        icon: null,
        title: 'UNKNOWN TYPE',
        count: 'N/A',
      };
      break;
  }

  return (
    <div className='widgets'>
      <div className='top'>
        {data.icon}
        <span className='title'>{data.title}</span>
      </div>
      <div className='bottom'>
        <div className='count'>{data.count}</div>
      </div>
    </div>
  );
}

export default ProductWidgets;
