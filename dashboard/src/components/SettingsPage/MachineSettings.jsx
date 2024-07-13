import React, { useState, useEffect } from "react";
import './settingspage.css'; // Import the CSS file
import axios from 'axios';

function MachineSettings() {
    const [machines, setMachines] = useState([]); // Array for machine data
    const [selectedMachine, setSelectedMachine] = useState(''); // State for selected machine
    const [selectedMachineDetails, setSelectedMachineDetails] = useState(null); // State for selected machine details
    const [isEditing, setIsEditing] = useState(false); // State for edit mode

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

    const defaultOption = {
        label: 'Select Machine',
        value: '', // Empty value for default selection
    };

    const options = [defaultOption, ...machines.map((machine) => ({
        label: "Machine " + machine.MachineNumber,
        value: machine.MachineNumber,
    }))];

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


            <select className="dropbox" aria-label="Machine Selection" value={selectedMachine} onChange={handleChange}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>



            <div >
                <h3 style={{ marginLeft: '30px' }}>Machine {selectedMachine} Details</h3>
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
                    <input
                        className="inputbox"
                        style={{ height: "120px", width: "300px",overflow:"visible" }}
                        type="text" // Consider number input type for production
                        id="info"
                        name="info"
                        value={selectedMachineDetails?.Info || ''}
                        disabled={!isEditing}
                        onChange={handleInputChange}
                    />
                </div>


                <button type="buttone" className="buttonedit"  onClick={handleEditClick} >
                    {isEditing ? 'Save' : 'Edit'}
                    
                </button>
            </div>

        </div>
    );
}

export default MachineSettings;



