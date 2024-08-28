import * as React from 'react';
import SummaryPage from './SummaryPage';
import './MachinePage.scss';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';


const MachinePage = () => {
  
  return (
    <div className='machinePage'>
      <SummaryPage/>
      <div className='container'>
        <div className='progressBar'>
        <Progressbar title="Production Rate %" value={70} gradientFrom="#FF5733" gradientTo="#FFC300"/>
        <Progressbar title="Success %" value={75} gradientFrom="#3357FF" gradientTo="#8E2DE2" />
        <Progressbar title="Completed %" value={50}  gradientFrom="#3357FF" gradientTo="#8E2DE2"/>
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
