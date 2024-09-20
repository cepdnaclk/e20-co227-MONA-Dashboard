import * as React from 'react';
import SummaryPage from './SummaryPage';
import './MachinePage.scss';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';
import FourthbarSummary from '../../layouts/FourthbarSummary';


const MachinePage = () => {
  const machineDrop = ['Machine 1', 'Machine 2', 'Machine 3', 'Machine 4', 'Machine 5', 'Machine 6', 'Machine 7', 'Machine 8', 'Machine 9', 'Machine 10', 'Machine 11', 'Machine 12', 'Machine 13', 'Machine 14', 'Machine 15', 'Machine 16', 'Machine 17', 'Machine 18', 'Machine 19', 'Machine 20'];

  const machineLinechartData = [
    { name: 'Target Shots', data: [40, 30, 32, 36, 40, 35, 38] },
    { name: 'total Completed Shots', data: [31, 25, 26, 35, 33, 27, 31] },
    { name: 'Success Shots', data: [25, 20, 22, 32, 28, 25, 27] },
    { name: 'Failed Shots', data: [6, 5, 4, 1, 5, 2, 4] },
   
  ];

  const datesRange = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  const columnstable1 = [
    { label: 'Machine Detail', field: 'detailName' },
    { label: 'Value', field: 'value' },
  ];

  const datatable1 = [
    { detailName: 'Machine ID', value: 'm001'},
    { detailName: 'Machine Name', value: 'M401'},
    { detailName: 'Target Shot Count', value: 35},
    { detailName: 'Total Shot Count', value: 30},
    { detailName: 'Succesive Shot Count', value: 25},
    { detailName: 'Failed Shot Count', value: 5},
    { detailName: 'Succesive Percentage', value: '75%'},
    { detailName: 'Completed Percentage', value: '50%'},
    { detailName: 'Relevent Part', value: 'PP001'},
    { detailName: 'Product made by the Part', value: 'PR001'},
    { detailName: 'Material', value: 'APX67800'},
    { detailName: 'Working hours per Range', value: '36hours'},
    { detailName: 'Production Rate (Shots per hour)', value: '70%'},


    
    
  ];
  
  return (
    <div className='machinePage'>
      <SummaryPage/>
      <FourthbarSummary dropdownData={machineDrop} dropdownLabel="Select Machine" pdfname={'machine_page.pdf'}/>
      <div id='pdfContent' className='container'>
        <div className='progressBar'>
        <Progressbar title="Production Rate %" value={70} gradientFrom="#FF5733" gradientTo="#FFC300"/>
        <Progressbar title="Success %" value={75} gradientFrom="#3357FF" gradientTo="#8E2DE2" />
        <Progressbar title="Completed %" value={50}  gradientFrom="#3357FF" gradientTo="#8E2DE2"/>
        </div>
        <div className='table'>
        <Table columns={columnstable1} data={datatable1} />
        </div>
        <div className='graph'>
        <LineChart
          title="Machine Summary Chart"
          seriesData={machineLinechartData}
          categories={datesRange}
        />
        </div>
        <div className='exportButton'>
        <GeneratePDFButton targetId='pdfContent' filename='pmachine_page.pdf' />
        </div>

      </div>
    </div>
  );
};

export default MachinePage;
