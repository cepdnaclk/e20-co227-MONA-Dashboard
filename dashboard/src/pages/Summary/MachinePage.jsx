import React, { useState } from 'react';
import SummaryPage from './SummaryPage';
import './MachinePage.scss';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';
import FourthbarSummary from '../../layouts/FourthbarSummary';

const sampleMachineData = [
    {
        "machine_id": "M#001",
        "machine_name": "Machine 1",
        "target_slots_count": 309,
        "total_slots_count": 272,
        "success_slot_count": 161,
        "failed_slot_count": 111,
        "completed_slot_count": 272,
        "success_percentage": 59.19,
        "completed_percentage": 88.03,
        "relevant_parts": [1, 2, 3],
        "material": "Steel",
        "working_hours": 40,
        "production_rate": 6.8,
        "week_count": 1
    },
    {
        "machine_id": "M#001",
        "machine_name": "Machine 1",
        "target_slots_count": 610,
        "total_slots_count": 520,
        "success_slot_count": 300,
        "failed_slot_count": 170,
        "completed_slot_count": 520,
        "success_percentage": 57.69,
        "completed_percentage": 85.25,
        "relevant_parts": [1, 2, 3],
        "material": "Steel",
        "working_hours": 80,
        "production_rate": 6.5,
        "week_count": 2
    },
    {
        "machine_id": "M#002",
        "machine_name": "Machine 2",
        "target_slots_count": 200,
        "total_slots_count": 180,
        "success_slot_count": 150,
        "failed_slot_count": 30,
        "completed_slot_count": 180,
        "success_percentage": 83.33,
        "completed_percentage": 90,
        "relevant_parts": [4, 5],
        "material": "Aluminum",
        "working_hours": 50,
        "production_rate": 7.2,
        "week_count": 1
    },
    {
        "machine_id": "M#002",
        "machine_name": "Machine 2",
        "target_slots_count": 432,
        "total_slots_count": 410,
        "success_slot_count": 300,
        "failed_slot_count": 110,
        "completed_slot_count": 410,
        "success_percentage": 76.78,
        "completed_percentage": 97.69,
        "relevant_parts": [4, 5],
        "material": "GPPS",
        "working_hours": 52,
        "production_rate": 8.12,
        "week_count": 2
    }
];

const MachinePage = () => {
    const [selectedMachineId, setSelectedMachineId] = useState(sampleMachineData[0].machine_id); // Default to the first machine's ID
    const [selectedDuration, setSelectedDuration] = useState('1 Week');

    // Create options for machines
    const machineOptions = Array.from(new Set(sampleMachineData.map(machine => machine.machine_id))) // Unique machine IDs
        .map(id => {
            const machine = sampleMachineData.find(m => m.machine_id === id);
            return { label: machine.machine_name, value: id };
        });

    // Handle changes in dropdowns
    const handleMachineChange = (machineId) => {
        setSelectedMachineId(machineId);
    };

    const handleDurationChange = (duration) => {
        setSelectedDuration(duration);
    };

    // Filter data based on selected machine and duration
    const filteredData = sampleMachineData.find(machine =>
        machine.machine_id === selectedMachineId && 
        (selectedDuration === '1 Week' ? machine.week_count === 1 : machine.week_count === 2)
    );

    // Check if filteredData is found
    if (!filteredData) {
        return <div>No data available for the selected machine and duration.</div>;
    }

    const columnstable1 = [
        { label: 'Machine Detail', field: 'detailName' },
        { label: 'Value', field: 'value' },
    ];

    const datatable1 = [
        { detailName: 'Machine ID', value: filteredData.machine_id },
        { detailName: 'Machine Name', value: filteredData.machine_name },
        { detailName: 'Target Shot Count', value: filteredData.target_slots_count },
        { detailName: 'Total Shot Count', value: filteredData.total_slots_count },
        { detailName: 'Success Shot Count', value: filteredData.success_slot_count },
        { detailName: 'Failed Shot Count', value: filteredData.failed_slot_count },
        { detailName: 'Success Percentage', value: `${filteredData.success_percentage}%` },
        { detailName: 'Completed Percentage', value: `${filteredData.completed_percentage}%` },
        { detailName: 'Relevant Part', value: filteredData.relevant_parts.join(', ') },
        { detailName: 'Material', value: filteredData.material },
        { detailName: 'Working Hours', value: `${filteredData.working_hours} hours` },
    ];

    const machineLinechartData = [
        { name: 'Success Shots', data: [filteredData.success_slot_count] }, 
        { name: 'Failed Shots', data: [filteredData.failed_slot_count] },
    ];

    return (
        <div className='machinePage'>
            <SummaryPage />

            <FourthbarSummary 
                dropdownData={machineOptions} 
                dropdownLabel="Select Machine" 
                onMachineChange={(option) => handleMachineChange(option.value)} // Pass machine ID directly
                dropdownData3={[
                    { label: '1 Week', value: '1 Week' }, 
                    { label: '2 Weeks', value: '2 Weeks' }
                ]}
                dropdownLabel3="Select Duration"
                onDurationChange={(option) => handleDurationChange(option.value)} // Pass selected duration directly
                pdfname='machine_page.pdf'
            />
            <div id='pdfContent' className='container'>
                <div className='progressBar'>
                    <Progressbar title="Production Rate %" value={filteredData.production_rate} gradientFrom="#99cc33" gradientTo="#99CC33" />
                    <Progressbar title="Success %" value={filteredData.success_percentage} gradientFrom="#99cc33" gradientTo="#99CC33" />
                    <Progressbar title="Completed %" value={filteredData.completed_percentage} gradientFrom="#99cc33" gradientTo="#99CC33" />
                </div>
                <div className='table'>
                    <Table columns={columnstable1} data={datatable1} />
                </div>
                <div className='graph'>
                    <LineChart
                        title="Machine Summary Chart"
                        seriesData={machineLinechartData}
                        categories={['Data']}
                    />
                </div>
                <div className='exportButton'>
                    <GeneratePDFButton targetId='pdfContent' filename='machine_page.pdf' />
                </div>
            </div>
        </div>
    );
};

export default MachinePage;
