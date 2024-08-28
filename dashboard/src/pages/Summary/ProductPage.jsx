// ProductPage.jsx
import React from 'react';
import SummaryPage from './SummaryPage';
import './ProductPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';

const ProductPage = () => {
  const productData = [
    { name: 'Part 1', count: 50 },
    { name: 'Part 2', count: 30 },
    { name: 'Part 3', count: 20 },
    { name: 'Part 4', count: 70 },
    { name: 'Part 5', count: 40 },
  ];

  const productLinechartData = [
    { name: 'Completed Products', data: [28, 29, 33, 36, 32, 32, 33] },
    { name: 'To be Made', data: [12, 11, 14, 18, 17, 13, 13] },
  ];

  const datesRange = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  return (
    <div className='productPage'>
      <SummaryPage />
      <div className='container'>
        <div className='barChart'>
          <Barchart data={productData} />
        </div>
        <div className='progressBar'>
        <Progressbar title="Success %" value={75} gradientFrom="#3357FF" gradientTo="#8E2DE2" />
        <Progressbar title="Completed %" value={50}  gradientFrom="#3357FF" gradientTo="#8E2DE2"/>
        </div>
        <div className='table'>table</div>
        <div className='graph'>
        <LineChart
          title="Product Summary Chart"
          seriesData={productLinechartData}
          categories={datesRange}
        />
        </div>
        <div className='exportButton'>export</div>
      </div>
    </div>
  );
};

export default ProductPage;
