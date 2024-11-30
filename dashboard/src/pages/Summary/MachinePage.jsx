import React, { useState, useEffect } from 'react';
import SummaryPage from './SummaryPage';
import './MachinePage.scss';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';
import FourthbarSummary from '../../layouts/FourthbarSummary';
import axios from 'axios';

const MachinePage = () => {
    const [historymachine, setHistoryMachine] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState('Machine 1');
    const [selectedDateRange, setSelectedDateRange] = useState('last week');
    const [machineLinechartData, setMachineLinechartData] = useState([]);
    const [chartCategories, setChartCategories] = useState([]);
    const [datatable1, setDatatable1] = useState([]);
    const [successPercentage, setSuccessPercentage] = useState(0);
    const [completedPercentage, setCompletedPercentage] = useState(0);
    const [selectedPart, setSelectedPart] = useState('Part 1');
    const [selectedProduct, setSelectedProduct] = useState('Product 1');

    useEffect(() => {
        const fetchHistoryMachineData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/historymachine');
                setHistoryMachine(response.data.sort((a, b) => a.week_count - b.week_count));
            } catch (error) {
                console.error('Error fetching machine data:', error);
            }
        };

        fetchHistoryMachineData();
    }, []);

    useEffect(() => {
        // Map date range to week count
        const dateRangeToWeeks = {
            'last week': 1,
            'last 2 weeks': 2,
            'last 1 month': 4,
            'last 3 months': 12,
            'last 1 year': 52,
        };

        const selectedWeekCount = dateRangeToWeeks[selectedDateRange];

        // Filter historymachine data
        const filtered = historymachine.filter((machine) =>
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
            categories.push(`Week ${machine.week_count}`); // Use week_count for x-axis
        });

        setMachineLinechartData([
            { name: 'Target Shots', data: targetShots },
            { name: 'Total Completed Shots', data: completedShots },
            { name: 'Success Shots', data: successShots },
            { name: 'Failed Shots', data: failedShots },
        ]);

        setChartCategories(categories);
    }, [filteredData]);

    useEffect(() => {
        if (filteredData.length === 0) {
            setDatatable1([]);
            setSuccessPercentage(0);
            setCompletedPercentage(0);
            return;
        }

        const firstItem = filteredData[0]; // Use the first item for specific fields
        const totalTargetShots = filteredData.reduce((sum, item) => sum + (item.target_slots_count || 0), 0);
        const totalCompletedShots = filteredData.reduce((sum, item) => sum + (item.total_slots_count || 0), 0);
        const totalSuccessiveShots = filteredData.reduce((sum, item) => sum + (item.success_slot_count || 0), 0);
        const totalFailedShots = filteredData.reduce((sum, item) => sum + (item.failed_slot_count || 0), 0);
        const averageSuccessivePercentage = (filteredData.reduce((sum, item) => sum + (item.success_percentage || 0), 0) / filteredData.length).toFixed(2);
        const averageCompletedPercentage = (filteredData.reduce((sum, item) => sum + (item.completed_percentage || 0), 0) / filteredData.length).toFixed(2);

        setDatatable1([
            { detailName: 'Machine ID', value: firstItem.machine_id },
            { detailName: 'Machine Name', value: firstItem.machine_name },
            { detailName: 'Relevant Products', value: firstItem.relevant_product },
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

    const machineDrop = [
        'Machine 1', 'Machine 2', 'Machine 3', 'Machine 4', 'Machine 5',
        'Machine 6', 'Machine 7', 'Machine 8', 'Machine 9', 'Machine 10',
        'Machine 11', 'Machine 12', 'Machine 13', 'Machine 14', 'Machine 15',
        'Machine 16', 'Machine 17', 'Machine 18', 'Machine 19', 'Machine 20',
        'Machine 21', 'Machine 22', 'Machine 23', 'Machine 24',
    ];
    // const partDrop = ['Part 1', 'Part 2', 'Part 3', 'Part 4', 'Part 5', 'Part 6', 'Part 7', 'Part 8', 'Part 9', 'Part 10', 'Part 10', 'Part 11', 'Part 12'];
    // const productDrop = ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6', 'Product 7', 'Product 8', 'Product 9', 'Product 10',];

    const dateRangeDrop = [
        'last week',
        'last 2 weeks',
        'last 1 month',
        'last 3 months',
        'last 1 year',
    ];

    const columnstable1 = [
        { label: 'Machine Detail', field: 'detailName' },
        { label: 'Value', field: 'value' },
    ];



    return (
        <div className="machinePage">
            <SummaryPage />
            <FourthbarSummary
                dropdownData={machineDrop}
                dropdownLabel="Select Machine"
                dropdownData3={dateRangeDrop}
                dropdownLabel3="Select Duration"
                pdfname="machine_page.pdf"
                selectedProduct={selectedMachine}
                onProductSelect={setSelectedMachine}
                selectedDateRange={selectedDateRange}
                onDateRangeSelect={setSelectedDateRange}
            />


            <div id="pdfContent" className="container">
                <div className="progressBar">
                    <Progressbar
                        title="Success %"
                        value={successPercentage}
                        gradientFrom="#99cc33"
                        gradientTo="#99CC33"
                    />
                    <Progressbar
                        title="Completed %"
                        value={completedPercentage}
                        gradientFrom="#99cc33"
                        gradientTo="#99CC33"
                    />
                </div>
                <div className="table">
                    <Table columns={columnstable1} data={datatable1} />
                </div>
                <div className="graph">
                    <LineChart
                        title="Machine Summary Chart"
                        seriesData={machineLinechartData}
                        categories={chartCategories} // Updated categories
                    />
                </div>
                <div className="exportButton">
                    <GeneratePDFButton targetId="pdfContent" filename="machine_page.pdf" />
                </div>
            </div>
        </div>
    );
};

export default MachinePage;
