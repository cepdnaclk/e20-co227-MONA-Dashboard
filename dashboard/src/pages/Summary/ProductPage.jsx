// ProductPage.jsx
import React from 'react';
import SummaryPage from './SummaryPage';
import './ProductPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';

const ProductPage = () => {
  const productData = [
    { name: 'Part 1', count: 50 },
    { name: 'Part 2', count: 30 },
    { name: 'Part 3', count: 20 },
    { name: 'Part 4', count: 70 },
    { name: 'Part 5', count: 40 },
  ];

  return (
    <div className='productPage'>
      <SummaryPage />
      <div className='container'>
        <div className='barChart'>
          <Barchart data={productData} />
        </div>
        <div className='progressBar'>progressbar
          <Progressbar/>
        </div>
        <div className='table'>table</div>
        <div className='graph'>graph</div>
        <div className='exportButton'>export</div>
      </div>
    </div>
  );
};

export default ProductPage;
