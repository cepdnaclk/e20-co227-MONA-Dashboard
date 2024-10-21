import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SummaryPage from './SummaryPage';
import FourthbarSummary from '../../layouts/FourthbarSummary';
import Progressbar from '../../components/SummaryComponents/Progressbar/Progressbar';
import LineChart from '../../components/SummaryComponents/Linechart/Linechart';
import Table from '../../components/SummaryComponents/Tables/Table';
import GeneratePDFButton from '../../components/SummaryComponents/GeneratePDF/GeneratePDFButton';
import './MachinePage.scss';

const MachinePage = () => {
    const [machines, setMachines] = useState([]);
    const [selectedMachine, setSelectedMachine] = useState('');
    const [duration, setDuration] = useState('1_week');
    const [machineData, setMachineData] = useState(null);
    const [machineLinechartData, setMachineLinechartData] = useState(null);
    const [datesRange, setDatesRange] = useState([]);

    const dateRangeDrop = ['1 week', '2 weeks', '1 month', '3 months', '1 year'];

    // Fetch the machines for the dropdown
    useEffect(() => {
        axios.get('http://localhost:5000/api/machinesdropdown')
            .then(response => {
                setMachines(response.data);
                if (response.data.length > 0) {
                    setSelectedMachine(response.data[0]?.machine_id || '');
                }
            })
            .catch(error => {
                console.error("Error fetching machines:", error);
            });
    }, []);

    useEffect(() => {
        if (selectedMachine) {
            axios.get(`http://localhost:5000/api/machines/${selectedMachine}`, {
                params: { duration },
                timeout: 5000 
            })
            .then(response => {
                setMachineData(response.data[0]);  // Assuming the latest data
            })
            .catch(error => {
                console.error("Error fetching machine data:", error);
                setMachineData(null);
            });

            axios.get(`http://localhost:5000/api/machines/${selectedMachine}/linechart`, {
                params: { duration },
                timeout: 5000
            })
            .then(response => {
                setMachineLinechartData(response.data);
            })
            .catch(error => {
                console.error("Error fetching machine line chart data:", error);
                setMachineLinechartData(null);
            });
        }
    }, [selectedMachine, duration]);

    const handleMachineChange = (event) => {
        setSelectedMachine(event.target.value);
    };

    const handleDurationChange = (event) => {
        setDuration(event.target.value);
    };

    const columnstable1 = [
        { Header: 'Machine Name', accessor: 'machine_name' },
        { Header: 'Target Slots', accessor: 'target_slots_count' },
        { Header: 'Total Slots', accessor: 'total_slots_count' },
        { Header: 'Success Slots', accessor: 'success_slot_count' },
        { Header: 'Failed Slots', accessor: 'failed_slot_count' },
        { Header: 'Production Rate', accessor: 'production_rate' }
    ];

    const datatable1 = machineData ? [machineData] : [];

    return (
        <div className='machinePage'>
            <SummaryPage />
            <FourthbarSummary 
                dropdownData={machines.map(machine => ({ label: machine.machine_name, value: machine.machine_id }))} 
                dropdownLabel="Select Machine" 
                onMachineChange={handleMachineChange}
                dropdownData3={dateRangeDrop}
                dropdownLabel3="Select Duration"
                onDurationChange={handleDurationChange} 
                pdfname='machine_page.pdf'
            />
            {!machineData ? (
                <p>Loading machine data...</p>
            ) : (
                <div id='pdfContent' className='container'>
                    <div className='progressBar'>
                        <Progressbar title="Production Rate %" value={machineData.production_rate} gradientFrom="#99cc33" gradientTo="#99CC33" />
                        <Progressbar title="Success %" value={machineData.success_percentage} gradientFrom="#99cc33" gradientTo="#99CC33" />
                        <Progressbar title="Completed %" value={machineData.completed_percentage} gradientFrom="#99cc33" gradientTo="#99CC33" />
                    </div>
                    <div className='table'>
                        <Table columns={columnstable1} data={datatable1} />
                    </div>
                    <div className='graph'>
                        {machineLinechartData ? (
                            <LineChart
                                title="Machine Summary Chart"
                                seriesData={[
                                    { name: "Total Slots", data: machineLinechartData.total_slots },
                                    { name: "Success Slots", data: machineLinechartData.success_slots },
                                    { name: "Failed Slots", data: machineLinechartData.failed_slots }
                                ]}
                                categories={datesRange}
                            />
                        ) : (
                            <p>Loading chart data...</p>
                        )}
                    </div>
                    <div className='exportButton'>
                        <GeneratePDFButton targetId='pdfContent' filename='machine_page.pdf' />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MachinePage;
