import React, { useState, useEffect } from 'react';
import './ButtonGrid.css'; // Import CSS for styling (optional)
import axios from 'axios';

const ButtonGrid = () => {
  const [realtimeinfo, setMachines] = useState([]); // Use clear variable name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/status');
        setMachines(response.data);
      } catch (error) {
        console.error('Error fetching machine data:', error);
      }
    };

    const intervalId = setInterval(fetchData, 5000); // Update every 5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to fetch data only once on mount

  const buttonStyle = (status) => {
    switch (status) {
      case "-1": // Use single quotes for string literals
        return { backgroundColor: '#cc6666' };
      case "0":
        return { backgroundColor: '#ffcc66' };
      case "1":
        return { backgroundColor: '#99cc33' };
      default:
        return { backgroundColor: '#bbb' };
    }
  };

  return (
    <div className="button-grid">
      {realtimeinfo.length === 0 ? (
        <p>Loading machines...</p>
      ) : (
        realtimeinfo.map((realtimeinfo) => (
          <button key={realtimeinfo.MachineNumber} style={buttonStyle(realtimeinfo.Status)}>
            {realtimeinfo.MachineNumber}
          </button>
        ))
      )}
    </div>
  );
};

export default ButtonGrid;
