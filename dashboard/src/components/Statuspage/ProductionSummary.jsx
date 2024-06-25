import React, { useState, useEffect } from 'react';
import './ProductionSummary.css';
import axios from 'axios';

function ProductionSummary() {
       
        const [dayInfo, setMachines] = useState([]); // Use clear variable name

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/status');
                    setMachines(response.data);
                } catch (error) {
                    console.error('Error fetching machine data:', error);
                }
            };
    
            const intervalId = setInterval(fetchData, 1000); // Update every 5 seconds
    
            // Cleanup function to clear the interval when the component unmounts
            return () => clearInterval(intervalId);
        }, []); // Empty dependency array to fetch data only once on mount
      /*
  return (
    <div class="status-container">
      <div class="status-item">
        <span class="status-name">Success Items</span>
        <span class="status-value" id="success-items-value">{successItems}</span>
      </div>
      <div class="status-item">
        <span class="status-name">Failure Items</span>
        <span class="status-value" id="failure-items-value">1</span>
      </div>
      <div class="status-item">
        <span class="status-name">Success Rate</span>
        <span class="status-value" id="success-rate-value">
          {0 > 0 && 0 * 100}%
        </span>
      </div>
    </div>
  );*/
return(
        <div>
                <table>
                        <tr>
                                <th>Doc</th>
                                <th>SuccessItems</th>
                                <th>FailureItems</th>
                                <th>TotalItems</th>
                                <th>SuccessRate</th>
                        </tr>
                        {dayInfo.map((dayinfo) => (
                        <tr>
                        
                                <td>{dayinfo.Doc}</td>
                                <td>{dayinfo.SuccessItems}</td>
                                <td>{dayinfo.FailureItems}</td>
                                <td>{dayinfo.TotalItems}</td>
                                <td>{dayinfo.SuccessRate}</td>
                        </tr>
                        ))}
                </table>
        </div>
)

}

export default ProductionSummary;
