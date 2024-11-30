import React, { useState } from 'react';
import SummaryPage from './SummaryPage';
import './ProductPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';
import FourthbarSummary from '../../layouts/FourthbarSummary';

const ProductPage = () => {
    const [selectedProduct, setSelectedProduct] = useState('Product 1');
    const [selectedDateRange, setSelectedDateRange] = useState('last week');

    const productDrop = [
        'Product 1',
        'Product 2',
        'Product 3',
        'Product 4',
        'Product 5',
        'Product 6',
        'Product 7',
        'Product 8',
        'Product 9',
        'Product 10',
    ];
    const dateRangeDrop = [
        'last week', 
        'last 2 weeks', 
        'last 1 month', 
        'last 3 months', 
        'last 1 year'
    ];

    const productData = [
        { name: 'Part 1', count: 50 },
        { name: 'Part 2', count: 30 },
        { name: 'Part 3', count: 20 },
        { name: 'Part 4', count: 70 },
        { name: 'Part 5', count: 40 },
        { name: 'Part 6', count: 60 },
        { name: 'Part 7', count: 30 },
        { name: 'Part 8', count: 40 },
        { name: 'Part 9', count: 60 },
        { name: 'Part 10', count: 50 },
        { name: 'Part 11', count: 30 },
        { name: 'Part 12', count: 20 },
    ];

    const productLinechartData = [
        { name: 'Completed Products', data: [28, 29, 33, 36, 32, 32, 33] },
        { name: 'To be Made', data: [12, 11, 14, 18, 17, 13, 13] },
    ];

    const columnstable1 = [
        { label: 'Product Detail', field: 'detailName' },
        { label: 'Value', field: 'value' },
    ];

    const datatable1 = [
        { detailName: 'Product ID', value: 'PR001' },
        { detailName: 'Product Name', value: 'TOY 1' },
        { detailName: 'Target Product Count', value: 32 },
        { detailName: 'Completed Product Count', value: 28 },
        { detailName: 'Products to be Made', value: 2 },
        { detailName: 'Completed Product Percentage', value: '90%' },
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
        { detailName: 'Target Count', part1: 32, part2: 32, part3: 32, part4: 32, part5: 32 },
        { detailName: 'Completed Count', part1: 30, part2: 29, part3: 32, part4: 31, part5: 28 },
    ];

    return (
        <div className="productPage">
            <SummaryPage />
            <FourthbarSummary
                dropdownData={productDrop}
                dropdownLabel="Select Product"
                dropdownData3={dateRangeDrop}
                dropdownLabel3="Select Duration"
                pdfname="product_page.pdf"
                selectedProduct={selectedProduct}
                onProductSelect={setSelectedProduct}
                selectedDateRange={selectedDateRange}
                onDateRangeSelect={setSelectedDateRange}
            />

            {/* <div>
                <h1 className="title">Selected Product: {selectedProduct}</h1>
                <h1>Selected Date Range: {selectedDateRange}</h1>
            </div> */}
            <div id="pdfContent" className="container">
                <div className="barChart">
                    <Barchart data={productData} />
                </div>
                <div className="progressBar">
                    <Progressbar title="Success %" value={74} gradientFrom="#99cc33" gradientTo="#99CC33" />
                    <Progressbar title="Completed %" value={50} gradientFrom="#99CC33" gradientTo="#99CC33" />
                </div>
                <div className="table">
                    <Table columns={columnstable1} data={datatable1} />
                </div>
                <div className="table2">
                    <Table columns={columnstable2} data={datatable2} />
                </div>
                <div className="graph">
                    <LineChart
                        title="Product Summary Chart"
                        seriesData={productLinechartData}
                        categories={dateRangeDrop}
                    />
                </div>
                <div className="exportButton">
                    <GeneratePDFButton targetId="pdfContent" filename="product_page.pdf" />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
