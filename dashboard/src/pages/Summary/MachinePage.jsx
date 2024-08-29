import * as React from 'react';
import SummaryPage from './SummaryPage';
import './MachinePage.scss';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';


const MachinePage = () => {

  const machineLinechartData = [
    { name: 'Target Shots', data: [40, 30, 32, 36, 40, 35, 38] },
    { name: 'total Completed Shots', data: [31, 25, 26, 35, 33, 27, 31] },
    { name: 'Success Shots', data: [25, 20, 22, 32, 28, 25, 27] },
    { name: 'Failed Shots', data: [6, 5, 4, 1, 5, 2, 4] },
   
  ];

  const datesRange = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  
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
        <LineChart
          title="Machine Summary Chart"
          seriesData={machineLinechartData}
          categories={datesRange}
        />
        </div>
        <div className='exportButton'>
          export
        </div>

      </div>
    </div>
  );
};

export default MachinePage;
