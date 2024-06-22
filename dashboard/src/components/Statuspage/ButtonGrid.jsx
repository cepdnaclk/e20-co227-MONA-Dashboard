/*
import React, { useState, useEffect } from 'react';
import './ButtonGrid.css'

const ButtonGrid = () => {
  const [machines, setMachines] = useState(new Array(50).fill(null));

  useEffect(() => {
    // Simulate fetching data from backend (replace with your actual API call)
    const fetchData = async () => {
      const response = await fetch('your-api-endpoint');
      const data = await response.json();
      setMachines(data);
    };

    fetchData();
  }, []);

  
  const buttonStyle = (status) => {
    switch (status) {
      case -1:
        return { backgroundColor: "#cc6666" };
      case 0:
        return { backgroundColor: '#ffcc66' };
      case 1:
        return { backgroundColor: '#99cc33' };
      default:
        return { backgroundColor: '#000' };
    }
  };

  return (
    <div className="button-grid">
      {machines.map((machine, index) => (
        <button key={index} style={buttonStyle(machine?.status)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;
*/
/*
import React, { useState, useEffect } from 'react';
import './ButtonGrid.css'

const ButtonGrid = () => {
  const [machines, setMachines] = useState(Array(50)); // Use an empty array for machines

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/machines');  // Use your actual API endpoint
      const data = await response.json();
      setMachines(data);
    };

    fetchData();
  }, []);

  const buttonStyle = (status) => {
        switch (status) {
          case -1:
            return { backgroundColor: "#cc6666" };
          case 0:
            return { backgroundColor: '#ffcc66' };
          case 1:
            return { backgroundColor: '#99cc33' };
          default:
            return { backgroundColor: '#000' };
        }
      };

  return (
    <div className="button-grid">
      {machines.map((machine, index) => (
        <button key={index} style={buttonStyle(machine?.Status)}>
          {machine.MachineNumber}
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;
*/

import React, { useState, useEffect } from 'react';
import './ButtonGrid.css';

const ButtonGrid = () => {
  const [machines, setMachines] = useState([]); // Use an empty array for machines

  useEffect(() => {
    // Simulate creating 50 machines with random Status (1, 0, or -1)
    const simulatedMachines = Array(50).fill().map((_, index) => ({
      MachineNumber: `${index + 1}`, // Unique machine numbers
      Status: Math.random() < 0.5 ? (Math.random() < 0.5 ? -1 : 0) : 1, // Generate random 1, 0, or -1
    }));

    setMachines(simulatedMachines);
  }, []);

  const buttonStyle = (status) => {
    switch (status) {
      case -1:
        return { backgroundColor: '#cc6666' };
      case 0:
        return { backgroundColor: '#ffcc66' };
      case 1:
        return { backgroundColor: '#99cc33' };
      default:
        return { backgroundColor: '#000' }; // Handle unexpected status values
    }
  };

  return (
    <div className="button-grid">
      {machines.map((machine, index) => (
        <button key={index} style={buttonStyle(machine.Status)}>
          {machine.MachineNumber}
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;

