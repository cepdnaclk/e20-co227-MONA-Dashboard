import React, { useState, useEffect } from 'react';
import SummaryPage from './SummaryPage';
import './MachinePage.scss';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';
import FourthbarSummary from '../../layouts/FourthbarSummary';
import axios from "axios";


const MachinePage = () => {
    const [historymachine, sethistorymachine] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState('Machine 1');
    const [selectedDateRange, setSelectedDateRange] = useState('last week');

    useEffect(() => {
        const fetchHistoryMachineData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/historymachine");
                console.log(response.data); // Debugging: Check data structure
                sethistorymachine(
                    response.data.sort((a, b) => a.machine_id - b.machine_id)
                );
            } catch (error) {
                console.error("Error fetching machine data:", error);
            }
        };

        fetchHistoryMachineData();
    }, []);

    const machineDrop = [
        'Machine 1', 'Machine 2', 'Machine 3', 'Machine 4', 'Machine 5',
        'Machine 6', 'Machine 7', 'Machine 8', 'Machine 9', 'Machine 10',
        'Machine 11', 'Machine 12', 'Machine 13', 'Machine 14', 'Machine 15',
        'Machine 16', 'Machine 17', 'Machine 18', 'Machine 19', 'Machine 20',
        'Machine 21', 'Machine 22', 'Machine 23', 'Machine 24'
    ];
    const dateRangeDrop = [
        'last week',
        'last 2 weeks',
        'last 1 month',
        'last 3 months',
        'last 1 year'
    ];

    const machineLinechartData = [
        { name: 'Target Shots', data: [40, 30, 32, 36, 40, 35, 38] },
        { name: 'Total Completed Shots', data: [31, 25, 26, 35, 33, 27, 31] },
        { name: 'Success Shots', data: [25, 20, 22, 32, 28, 25, 27] },
        { name: 'Failed Shots', data: [6, 5, 4, 1, 5, 2, 4] },
    ];

    const columnstable1 = [
        { label: 'Machine Detail', field: 'detailName' },
        { label: 'Value', field: 'value' },
    ];

    const datatable1 = [
        { detailName: 'Machine ID', value: 'm001' },
        { detailName: 'Machine Name', value: selectedMachine },
        { detailName: 'Relevant Products', value: 'PP001' },
        { detailName: 'Target Shot Count', value: 35 },
        { detailName: 'Total Shot Count', value: 30 },
        { detailName: 'Successive Shot Count', value: 25 },
        { detailName: 'Failed Shot Count', value: 5 },
        { detailName: 'Successive Percentage', value: '75%' },
        { detailName: 'Completed Percentage', value: '50%' },
        { detailName: 'Material', value: 'APX67800' }
    ];

    const sampleData = [
        {
            machine_id: 'm001',
            machine_name: 'Machine 1',
            week_count: 1,
            target_slots_count: 40,
            total_slots_count: 35,
            success_slot_count: 30,
            failed_slot_count: 5,
            success_percentage: 85,
            completed_percentage: 90,
            relevant_product: 'Product A'
        },
        {
            machine_id: 'm002',
            machine_name: 'Machine 2',
            week_count: 3,
            target_slots_count: 50,
            total_slots_count: 45,
            success_slot_count: 40,
            failed_slot_count: 5,
            success_percentage: 88,
            completed_percentage: 95,
            relevant_product: 'Product B'
        },
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
            <div>
                <h1 className="title">Selected Machine: {selectedMachine}</h1>
                <h1>Selected Date Range: {selectedDateRange}</h1>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Machine ID</th>
                                <th>Machine Name</th>
                                <th>Target Shot Count</th>
                                <th>Total Shot Count</th>
                                <th>Successive Shot Count</th>
                                <th>Failed Shot Count</th>
                                <th>Successive Percentage</th>
                                <th>Completed Percentage</th>
                                <th>Relevant Products</th>
                            </tr>
                        </thead>
                        {/* <tbody>

                            {historymachine 
                            .filter(machine =>
                                    machine.machine_name === selectedMachine && // Ensure names match
                                    Number(machine.week_count) <= 2 // Ensure week_count is numeric
                                )
                                .map(machine => (
                                    <tr key={machine.machine_id}>
                                        <td>{machine.machine_id}</td>
                                        <td>{machine.machine_name}</td>
                                        <td>{machine.target_slots_count}</td>
                                        <td>{machine.total_slots_count}</td>
                                        <td>{machine.success_slot_count}</td>
                                        <td>{machine.failed_slot_count}</td>
                                        <td>{machine.success_percentage}%</td>
                                        <td>{machine.completed_percentage}%</td>
                                        <td>{machine.relevant_product}</td>
                                    </tr>
                                ))}

                        </tbody> */}
                        <tbody>
                            {sampleData
                                .filter(machine =>
                                    machine.machine_name === selectedMachine &&
                                    Number(machine.week_count) <= 4
                                ).length === 0 ? (
                                <tr>
                                    <td colSpan="9">No data available</td>
                                </tr>
                            ) : (
                                sampleData
                                    .filter(machine =>
                                        machine.machine_name === selectedMachine &&
                                        Number(machine.week_count) <= 4
                                    )
                                    .map(machine => (
                                        <tr key={machine.machine_id}>
                                            <td>{machine.machine_id}</td>
                                            <td>{machine.machine_name}</td>
                                            <td>{machine.target_slots_count}</td>
                                            <td>{machine.total_slots_count}</td>
                                            <td>{machine.success_slot_count}</td>
                                            <td>{machine.failed_slot_count}</td>
                                            <td>{machine.success_percentage}%</td>
                                            <td>{machine.completed_percentage}%</td>
                                            <td>{machine.relevant_product}</td>
                                        </tr>
                                    ))
                            )}

                        </tbody>

                    </table>
                </div>
            </div>

            <div id="pdfContent" className="container">
                <div className="progressBar">
                    <Progressbar title="Production Rate %" value={70} gradientFrom="#99cc33" gradientTo="#99CC33" />
                    <Progressbar title="Success %" value={75} gradientFrom="#99cc33" gradientTo="#99CC33" />
                    <Progressbar title="Completed %" value={50} gradientFrom="#99cc33" gradientTo="#99CC33" />
                </div>
                <div className="table">
                    <Table columns={columnstable1} data={datatable1} />
                </div>
                <div className="graph">
                    <LineChart
                        title="Machine Summary Chart"
                        seriesData={machineLinechartData}
                        categories={dateRangeDrop}
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
