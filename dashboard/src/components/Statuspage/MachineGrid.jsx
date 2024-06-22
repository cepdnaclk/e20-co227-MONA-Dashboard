import React, { useState, useEffect } from 'react';
import './MachineCard.css'; // Import CSS for styling (optional)

const MachineCard = ({ machine }) => {
  const { machineNumber, machineName, material, totalSlots, successSlots, failureSlots, rate } = machine;

  return (
    <div className="machine-card">
      <p>Machine Number: {machineNumber}</p>
      <p>Machine Name: {machineName}</p>
      <p>Material: {material}</p>
      <p>Total Slots: {totalSlots}</p>
      <p>Success Slots: {successSlots}</p>
      <p>Failure Slots: {failureSlots}</p>
      <p>Success Rate: {rate}%</p>
    </div>
  );
};

const MachineGrid = () => {
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMachines = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('https://your-backend-api/machines'); // Replace with your API endpoint
        const data = await response.json();
        setMachines(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachines();
  }, []);

  return (
    <div className="machine-grid">

      {isLoading && <p>Loading machines...</p>}
      {error && <p>Error fetching machines: {error.message}</p>}
      {!isLoading && !error && (
        <div className="grid-container">
          {machines.map((machine, index) => (
            <MachineCard key={index} machine={machine} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MachineGrid;
