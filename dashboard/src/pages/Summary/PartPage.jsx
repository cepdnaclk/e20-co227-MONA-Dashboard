// PartPage.jsx
import React from 'react';
import SummaryPage from './SummaryPage';
import './PartPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';

const PartPage = () => {
  const partData = [
    { name: 'M101', count: 15 },
    { name: 'M239', count: 25 },
    { name: 'M023', count: 35 },
    { name: 'M109', count: 45 },
    { name: 'M440', count: 55 },
  ];
  const productLinechartData = [
    { name: 'total Completed Parts', data: [31, 25, 26, 22, 33, 27, 31] },
    { name: 'M101', data: [19, 15, 11, 18, 18, 16, 18] },
    { name: 'M239', data: [17, 15, 10, 18, 17, 12, 18] },
    { name: 'M023', data: [19, 14, 20, 12, 12, 10, 18] },
    { name: 'M109', data: [10, 12, 17, 11, 12, 19, 19] },
    { name: 'M440', data: [10, 20, 14, 11, 11, 11, 17] },
  ];

  const datesRange = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];


  return (
    <div className='partPage'>
      <SummaryPage />
      <div className='container'>
        <div className='barChart'>
          <Barchart data={partData} />
        </div>
        <div className='progressBar'>
          <Progressbar title="Success %" value={75} />
          <Progressbar title="Completed %" value={50} />
        </div>
        <div className='table'>table</div>
        <div className='graph'>
        <LineChart
          title="Parts Summary Chart"
          seriesData={productLinechartData}
          categories={datesRange}
        />
        </div>
        <div className='exportButton'>export</div>
      </div>
    </div>
  );
};

export default PartPage;
