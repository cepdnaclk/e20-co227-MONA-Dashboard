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
    switch (1) {
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
