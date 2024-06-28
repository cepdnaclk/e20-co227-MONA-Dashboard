import React, { useState, useEffect } from 'react';
import './ProductionSummary.css';
import axios from 'axios';

function ProductionSummary() {
       
        const [dayinfo, setMachines] = useState([]); // Use clear variable name

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/dayinfo');
                    setMachines(response.data);
                } catch (error) {
                    console.error('Error fetching machine data:', error);
                }
            };
    
            const intervalId = setInterval(fetchData, 500); // Update every 5 seconds
    
            // Cleanup function to clear the interval when the component unmounts
            return () => clearInterval(intervalId);
        }, []); // Empty dependency array to fetch data only once on mount
        
      
  return (
    <div class="status-container">
        {dayinfo.map((dayinfo) => (
                <div style={{display:'flex',gap:'15px'}}>
                <div class="status-item">
                        <span class="status-name">Success Items</span>
                        <span class="status-value" id="success-items-value">{dayinfo.SuccessItems}</span>
                </div>
                <div class="status-item">
                        <span class="status-name">Failure Items</span>
                        <span class="status-value" id="failure-items-value">{dayinfo.FailureItems}</span>
                </div>
                <div class="status-item">
                        <span class="status-name">Success Rate</span>
                        <span class="status-value" id="success-rate-value">
                        {dayinfo.SuccessRate}%
                        </span>
                </div>
                </div>
        ))}
    </div>
  );

}

export default ProductionSummary;
