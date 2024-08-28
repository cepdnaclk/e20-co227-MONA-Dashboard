import * as React from 'react';
import SummaryPage from './SummaryPage';
import './MachinePage.scss';


const MachinePage = () => {
  
  return (
    <div className='machinePage'>
      <SummaryPage/>
      <div className='container'>
        <div className='progressBar'>
          progressbar
        </div>
        <div className='table'>
          table
        </div>
        <div className='graph'>
          graph
        </div>
        <div className='exportButton'>
          export
        </div>

      </div>
    </div>
  );
};

export default MachinePage;
