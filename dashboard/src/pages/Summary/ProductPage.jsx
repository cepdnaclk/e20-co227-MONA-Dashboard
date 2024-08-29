// ProductPage.jsx
import React from 'react';
import SummaryPage from './SummaryPage';
import './ProductPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';

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

  const columnstable1 = [
    { label: 'Product Detail', field: 'detailName' },
    { label: 'Value', field: 'value' },
  ];

  const datatable1 = [
    { detailName: 'Product ID', value: 'PR001'},
    { detailName: 'Product Name', value: 'TOY 1'},
    { detailName: 'Target Product Count', value: 32},
    { detailName: 'Completed Product Count', value: 28},
    { detailName: 'Products to be Made', value: 2},
    { detailName: 'Completed Product Percentage', value: '90%'},
    
    
  ];

  const columnstable2 = [
    { label: 'Part Detail', field: 'detailName' },
    { label: 'Part 1', field: 'part1' },
    { label: 'Part 2', field: 'part2' },
    { label: 'Part 3', field: 'part3' },
    { label: 'Part 4', field: 'part4' },
    { label: 'Part 5', field: 'part5' },
  ];

  const datatable2 = [
    { detailName: 'Target Count', part1: 32, part2: 32,part3:32, part4: 32, part5:32},
    { detailName: 'Completed Count', part1: 30, part2: 29,part3:32, part4: 31, part5:28},
    
    
  ];

  return (
    <div className='productPage'>
      <SummaryPage />
      <div id='pdfContent' className='container'>
        <div className='barChart'>
          <Barchart data={productData} />
        </div>
        <div className='progressBar'>
        <Progressbar title="Success %" value={75} gradientFrom="#3357FF" gradientTo="#8E2DE2" />
        <Progressbar title="Completed %" value={50}  gradientFrom="#3357FF" gradientTo="#8E2DE2"/>
        </div>
        <div className='table'>
        <Table columns={columnstable1} data={datatable1} />
        </div>
        <div className='table2'>
        <Table columns={columnstable2} data={datatable2} />
        </div>
        <div className='graph'>
        <LineChart
          title="Product Summary Chart"
          seriesData={productLinechartData}
          categories={datesRange}
        />
        </div>
        <div className='exportButton'>
        <GeneratePDFButton targetId='pdfContent' filename='product_page.pdf' />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
