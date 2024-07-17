import React, { useState, useEffect } from "react";
import './settingspage.css'; // Import the CSS file
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkpassword from './Checkpassword'; // Import the Checkpassword component

function MachineSettings() {
    const [machines, setMachines] = useState([]); // Array for machine data
    const [selectedMachine, setSelectedMachine] = useState(''); // State for selected machine
    const [selectedMachineDetails, setSelectedMachineDetails] = useState(null); // State for selected machine details
    const [isEditing, setIsEditing] = useState(false); // State for edit mode
    const [showPassword, setShowPassword] = useState(false); // State for showing password form

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/machineinfo');
                setMachines(response.data.sort((a, b) => a.MachineNumber - b.MachineNumber));
            } catch (error) {
                console.error('Error fetching machine data:', error);
            }
        };

        fetchData(); // Fetch data immediately on component mount

        return () => { }; // Empty cleanup function for clarity
    }, []); // Empty dependency array ensures data fetching runs only on mount



    const options = machines.map((machine) => ({
        label: "Machine " + machine.MachineNumber,
        value: machine.MachineNumber,
    }));

    const handleChange = (event) => {
        setSelectedMachine(event.target.value);
        // Find the selected machine details from the machines array
        const selectedMachineData = machines.find(
            (machine) => machine.MachineNumber === event.target.value
        );
        setSelectedMachineDetails(selectedMachineData || null);
        setIsEditing(false); // Reset editing mode on selection change
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing); // Toggle editing mode
    };

    const handleInputChange = (event) => {
        // Update a copy of selectedMachineDetails to avoid mutating state directly
        const updatedDetails = { ...selectedMachineDetails };
        updatedDetails[event.target.name] = event.target.value;
        setSelectedMachineDetails(updatedDetails);
    };

    const handleSave = async () => {
        // Send updated details to your backend to save changes (replace with your API call)
        try {
            const response = await axios.put(`http://localhost:8000/machine/${selectedMachine}`, selectedMachineDetails);
            console.log('Machine details saved:', response.data);
            // Update machines array locally if needed (depending on your data fetching strategy)
            setIsEditing(false); // Exit editing mode
        } catch (error) {
            console.error('Error saving machine details:', error);
        }
    };

    return (
        <div className="machinesettings">
            <h2 style={{ marginLeft: '320px' }}>Machines Settings</h2>

            <Box className="dropbox">
                <FormControl fullWidth sx={{height: 30, mt: 1 }}>
                    <InputLabel id="demo-simple-select-label">Select Machine</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedMachine}
                        label="Select Machine"
                        onChange={handleChange}
                    >
                        {options.map((option) => (
                        <MenuItem value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>



            <div >
                <h3 style={{ marginLeft: '60px', marginBottom: '30px' }}>Machine {selectedMachine} Details</h3>
                <div className="lablelayer">
                    <label className="lablelable" htmlFor="machineName">Machine Name:</label>
                    <input
                        className="inputbox"
                        type="text"
                        id="machineName"
                        name="MachineName"
                        value={selectedMachineDetails?.MachineName || ''} // Set initial value and handle potential null
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lablelayer" >
                    <label className="lablelable" htmlFor="material">Material:</label>
                    <input
                        className="inputbox"
                        type="text"
                        id="material"
                        name="Material"
                        value={selectedMachineDetails?.Material || ''}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lablelayer">
                    <label className="lablelable" htmlFor="production">Production:</label>
                    <input
                        className="inputbox"
                        type="text" // Consider number input type for production
                        id="production"
                        name="Production"
                        value={selectedMachineDetails?.Production || ''}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lablelayer">
                    <label className="lablelable" htmlFor="targetSlots">Target Slots:</label>
                    <input
                        className="inputbox"
                        type="number" // Use number input type for target slots
                        id="targetSlots"
                        name="TargetSlots"
                        value={selectedMachineDetails?.TargetSlots || ''}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="lablelayer" style={{ width: '450px' }}>
                    <label className="lablelable" htmlFor="info">Informations:</label>
                    <textarea
                        className="textbox"
                        style={{}}
                        type="text" // Consider number input type for production
                        id="info"
                        name="Info"
                        value={selectedMachineDetails?.Info || ''}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    ></textarea>
                </div>


                <button type="buttone" className="buttonedit" onClick = {!isEditing ? handleEditClick : () => setShowPassword(true)} >
                    {isEditing ? 'Update' : 'Edit'}

                </button>
            </div>
            {showPassword && <Checkpassword onclose1={() => setShowPassword(false)}/>}

        </div>
    );
}

export default MachineSettings;



