import React, { useState, useEffect } from 'react';
import SummaryPage from './SummaryPage';
import './PartPage.scss';
import Barchart from '../../components/SummaryComponents/Barchart/Barchart';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';
import FourthbarSummary from '../../layouts/FourthbarSummary';
import axios from 'axios';

const PartPage = () => {
    const [selectedProduct, setSelectedProduct] = useState('Product 1');
    const [selectedDateRange, setSelectedDateRange] = useState('last 1 month');
    const [selectedPart, setSelectedPart] = useState('Part 1');
    const [selectedMachine, setSelectedMachine] = useState('Machine 1');
    const [historymachine, setHistoryMachine] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [machineLinechartData, setMachineLinechartData] = useState([]);
    const [chartCategories, setChartCategories] = useState([]);
    const [datatable1, setDatatable1] = useState([]);
    const [successPercentage, setSuccessPercentage] = useState(0);
    const [completedPercentage, setCompletedPercentage] = useState(0);
    const [partInfo, setPartInfo] = useState([]);

    // Fetch partinfo and historymachine data
    useEffect(() => {
        const fetchPartData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/partinfo");
                setPartInfo(
                    response.data.sort((a, b) => a.week_count - b.week_count)
                );
            } catch (error) {
                console.error("Error fetching part info:", error);
            }
        };

        const fetchHistoryMachineData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/historymachine');
                setHistoryMachine(response.data.sort((a, b) => a.week_count - b.week_count));
            } catch (error) {
                console.error('Error fetching machine data:', error);
            }
        };

        fetchPartData();
        fetchHistoryMachineData();
    }, []);

    // Update selectedMachine when selectedProduct or selectedPart changes
    useEffect(() => {
        // Extract the numeric part using regex
        const productNumber = selectedProduct.match(/\d+/)?.[0]; // Extracts "1" from "Product 1" or "10" from "Product 10"
        const partNumber = selectedPart.match(/\d+/)?.[0]; // Extracts "1" from "Part 1" or "25" from "Part 25"

        if (productNumber && partNumber) {
            // Find the matching machine
            const matchedMachine = partInfo.find(
                (item) =>
                    item.ProductNumber === productNumber && item.PartNumber === partNumber
            );

            // Set selectedMachine as "Machine {number}" if a match is found
            setSelectedMachine(matchedMachine ? `Machine ${matchedMachine.MachineNumber}` : '');
        } else {
            setSelectedMachine('');
        }
    }, [selectedProduct, selectedPart, partInfo]);


    // Filter historymachine data based on selectedMachine and selectedDateRange
    useEffect(() => {
        const dateRangeToWeeks = {
            'last week': 1,
            'last 2 weeks': 2,
            'last 1 month': 4,
            'last 3 months': 12,
            'last 1 year': 52,
        };

        const selectedWeekCount = dateRangeToWeeks[selectedDateRange];

        const filtered = historymachine.filter(
            (machine) =>
                machine.machine_name === selectedMachine &&
                machine.week_count <= selectedWeekCount
        );

        setFilteredData(filtered);
    }, [selectedMachine, selectedDateRange, historymachine]);

    // Update chart data and x-axis categories based on filteredData
    useEffect(() => {
        const targetShots = [];
        const completedShots = [];
        const successShots = [];
        const failedShots = [];
        const categories = [];

        filteredData.forEach((machine) => {
            targetShots.push(machine.target_slots_count || 0);
            completedShots.push(machine.total_slots_count || 0);
            successShots.push(machine.success_slot_count || 0);
            failedShots.push(machine.failed_slot_count || 0);
            categories.push(`Week ${machine.week_count}`);
        });

        setMachineLinechartData([
            { name: 'Target Shots', data: targetShots },
            { name: 'Total Completed Shots', data: completedShots },
            { name: 'Success Shots', data: successShots },
            { name: 'Failed Shots', data: failedShots },
        ]);

        setChartCategories(categories);
    }, [filteredData]);

    // Update table data and percentages
    useEffect(() => {
        if (filteredData.length === 0) {
            setDatatable1([]);
            setSuccessPercentage(0);
            setCompletedPercentage(0);
            return;
        }

        const firstItem = filteredData[0];
        const totalTargetShots = filteredData.reduce((sum, item) => sum + (item.target_slots_count || 0), 0);
        const totalCompletedShots = filteredData.reduce((sum, item) => sum + (item.total_slots_count || 0), 0);
        const totalSuccessiveShots = filteredData.reduce((sum, item) => sum + (item.success_slot_count || 0), 0);
        const totalFailedShots = filteredData.reduce((sum, item) => sum + (item.failed_slot_count || 0), 0);
        const averageSuccessivePercentage = (filteredData.reduce((sum, item) => sum + (item.success_percentage || 0), 0) / filteredData.length).toFixed(2);
        const averageCompletedPercentage = (filteredData.reduce((sum, item) => sum + (item.completed_percentage || 0), 0) / filteredData.length).toFixed(2);

        setDatatable1([
            { detailName: 'Relevant Products', value: firstItem.relevant_product },
            { detailName: 'Part Name', value: selectedPart },
            { detailName: 'Machine Name', value: firstItem.machine_name },
            { detailName: 'Target Shot Count', value: totalTargetShots },
            { detailName: 'Total Shot Count', value: totalCompletedShots },
            { detailName: 'Successive Shot Count', value: totalSuccessiveShots },
            { detailName: 'Failed Shot Count', value: totalFailedShots },
            { detailName: 'Successive Percentage', value: `${averageSuccessivePercentage}%` },
            { detailName: 'Completed Percentage', value: `${averageCompletedPercentage}%` },
            { detailName: 'Material', value: firstItem.material },
        ]);

        setSuccessPercentage(Number(averageSuccessivePercentage));
        setCompletedPercentage(Number(averageCompletedPercentage));
    }, [filteredData]);
    const partDrop = ['Part 1', 'Part 2', 'Part 3', 'Part 4', 'Part 5', 'Part 6', 'Part 7', 'Part 8', 'Part 9', 'Part 10', 'Part 10', 'Part 11', 'Part 12'];
    const productDrop = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6', 'Product 7', 'Product 8', 'Product 9', 'Product 10',];
    const dateRangeDrop = [
        'last week',
        'last 2 weeks',
        'last 1 month',
        'last 3 months',
        'last 1 year'
    ];




    const columnstable1 = [
        { label: 'Part Detail', field: 'detailName' },
        { label: 'Value', field: 'value' },
    ];



    return (
        <div className='machinePage'>
            <SummaryPage />
            <FourthbarSummary
                dropdownData={productDrop}
                dropdownLabel="Select Product"
                dropdownData3={dateRangeDrop}
                dropdownLabel3="Select Duration"
                partDropdownData={partDrop}
                partDropdownLabel="Select Part"
                pdfname="part_page.pdf"
                selectedProduct={selectedProduct}
                onProductSelect={setSelectedProduct}
                selectedDateRange={selectedDateRange}
                onDateRangeSelect={setSelectedDateRange}
                selectedPart={selectedPart}
                onPartSelect={setSelectedPart}
            />

            {/* <div>
                <h1>Selected Product: {selectedProduct}</h1>
                <h1>Selected Part: {selectedPart}</h1>
                <h1>Selected Machine: {selectedMachine}</h1>
                <h1>Selected Date Range: {selectedDateRange}</h1>
            </div> */}

            <div id="pdfContent" className="container">
                <div className="progressBar">
                    <Progressbar title="Success %" value={successPercentage} gradientFrom="#99cc33" gradientTo="#99CC33" />
                    <Progressbar title="Completed %" value={completedPercentage} gradientFrom="#99cc33" gradientTo="#99CC33" />
                </div>
                <div className="table">
                    <Table columns={columnstable1} data={datatable1} />
                </div>
                <div className="graph">
                    <LineChart
                        title="Machine Summary Chart"
                        seriesData={machineLinechartData}
                        categories={chartCategories}
                    />
                </div>
                <div className="exportButton">
                    <GeneratePDFButton targetId="pdfContent" filename="machine_page.pdf" />
                </div>
            </div>
        </div>
    );
};

export default PartPage;
