// PartPage.jsx
import React from 'react';
import SummaryPage from './SummaryPage';
import './PartPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';

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

  const columnstable1 = [
    { label: 'Part Detail', field: 'detailName' },
    { label: 'Value', field: 'value' },
  ];

  const datatable1 = [
    { detailName: 'Part ID', value: 'PP001'},
    { detailName: 'Part Name', value: 'Part 1'},
    { detailName: 'Target Part Count', value: 32},
    { detailName: 'Completed Part Count', value: 28},
    { detailName: 'Parts to be Made', value: 2},
    { detailName: 'Completed Parts Percentage', value: '90%'},
    { detailName: 'Product made by the Part', value: 'PR001'},
    { detailName: 'Material', value: 'APX67800'},
    
    
  ];

  const columnstable2 = [
    { label: 'Used Machines Detail', field: 'detailName' },
    { label: 'M101', field: 'm1' },
    { label: 'M239', field: 'm2' },
    { label: 'M023', field: 'm3' },
    { label: 'M109', field: 'm4' },
    { label: 'M440', field: 'm5' },
  ];

  const datatable2 = [
    { detailName: 'Target Count', m1: 15, m2: 20,m3:25, m4: 15, m5:20},
    { detailName: 'Completed Count', m1: 12, m2: 18,m3:22, m4: 10, m5:18},
    { detailName: 'Failed Count', m1: 3, m2: 2,m3:3, m4: 5, m5:2},
    
    
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
        <div className='table'>
        <Table columns={columnstable1} data={datatable1} />
        </div>
        <div className='table2'>
        <Table columns={columnstable2} data={datatable2} />
        </div>
        <div className='graph'>
        <LineChart
          title="Parts Summary Chart"
          seriesData={productLinechartData}
          categories={datesRange}
        />
        </div>
        <div className='exportButton'>
          <GeneratePDFButton targetId='pdfContent' filename='part_page.pdf' />
        </div>
      </div>
    </div>
  );
};

export default PartPage;
