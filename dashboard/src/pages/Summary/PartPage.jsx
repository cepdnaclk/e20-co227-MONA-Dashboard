// PartPage.jsx
import React from 'react';
import SummaryPage from './SummaryPage';
import './PartPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';

const PartPage = () => {
  const partData = [
    { name: 'M101', count: 15 },
    { name: 'M239', count: 25 },
    { name: 'M023', count: 35 },
    { name: 'M109', count: 45 },
    { name: 'M440', count: 55 },
  ];

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
        <div className='graph'>graph</div>
        <div className='exportButton'>export</div>
      </div>
    </div>
  );
};

export default PartPage;
