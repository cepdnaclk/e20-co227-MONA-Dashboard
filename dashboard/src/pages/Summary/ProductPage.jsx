import React, { useState, useEffect } from 'react';
import SummaryPage from './SummaryPage';
import './ProductPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';
import FourthbarSummary from '../../layouts/FourthbarSummary';
import axios from 'axios';

const ProductPage = () => {
    const [selectedProduct, setSelectedProduct] = useState('All Products');
    const [productData, setProductData] = useState([]);
    const [productLinechartData, setProductLinechartData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [progressData, setProgressData] = useState({ success: 0, completed: 0 });
    const [dateRange, setDateRange] = useState({ start: '2023-01-01', end: '2023-12-31' });

    const productDrop = ['All Products', 'Product 1', 'Product 2', 'Product 3', 'Product 4'];
    const dateRangeDrop = ['1 week', '2 weeks', '1 month', '3 months', '1 year'];


    // Fetch product data based on selected product and date range
    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`/api/product/${selectedProduct}`, {
                    params: { startDate: dateRange.start, endDate: dateRange.end }
                });
                const product = response.data;

                // Update state with fetched data
                setProductData(product.parts); // Assuming parts data comes from the API
                setProgressData({
                    success: product.successPercentage,
                    completed: product.completedPercentage
                });
                setProductLinechartData(product.chartData); // Assuming API returns chart data
                setTableData(product.tableData); // Table data from the product
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        if (selectedProduct !== 'All Products') {
            fetchProductData();
        }
    }, [selectedProduct, dateRange]);

    // Handle product selection change
    const handleProductChange = (product) => {
        setSelectedProduct(product);
    };

    // Handle date range change (assuming a date picker component is used)
    const handleDateRangeChange = (start, end) => {
        setDateRange({ start, end });
    };

    const columnstable1 = [
        { label: 'Product Detail', field: 'detailName' },
        { label: 'Value', field: 'value' },
    ];

    const columnstable2 = [
        { label: 'Part Detail', field: 'detailName' },
        { label: 'Part 1', field: 'part1' },
        { label: 'Part 2', field: 'part2' },
        { label: 'Part 3', field: 'part3' },
        { label: 'Part 4', field: 'part4' },
        { label: 'Part 5', field: 'part5' },
    ];

    return (
        <div className='productPage'>
            <SummaryPage />
            <FourthbarSummary
                dropdownData={productDrop}
                dropdownLabel="Select Product"
                onSelect={handleProductChange}
                dropdownData3={dateRangeDrop}
                dropdownLabel3={"Select Duration"} // Call this on product change
                pdfname={'product_page.pdf'}
            />
            <div id='pdfContent' className='container'>
                <div className='barChart'>
                    <Barchart data={productData} />
                </div>
                <div className='progressBar'>
                    <Progressbar title="Success %" value={progressData.success} gradientFrom="#99cc33" gradientTo="#99CC33" />
                    <Progressbar title="Completed %" value={progressData.completed} gradientFrom="#99CC33" gradientTo="#99CC33" />
                </div>
                <div className='table'>
                    <Table columns={columnstable1} data={tableData} />
                </div>
                <div className='graph'>
                    <LineChart
                        title="Product Summary Chart"
                        seriesData={productLinechartData}
                        categories={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']}
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
