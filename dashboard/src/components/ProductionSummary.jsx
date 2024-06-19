import React, { useState, useEffect } from 'react';
import './ProductionSummary.css';

function ProductionSummary() {
  const [data, setData] = useState({
    failureItems: 0,
    successItems: 0,
    successRate: 0,
  });

  useEffect(() => {
    // Fetch data from backend (replace with your actual API call)
    fetch('https://your-api.com/data')
      .then(response => response.json())
      .then(fetchedData => setData(fetchedData))
      .catch(error => console.error(error));
  }, []); // Empty dependency array to fetch data only once on component mount

  return (
    <div class="status-container">
      <div class="status-item">
        <span class="status-name">Success Items</span>
        <span class="status-value" id="success-items-value">{data.successItems}</span>
      </div>
      <div class="status-item">
        <span class="status-name">Failure Items</span>
        <span class="status-value" id="failure-items-value">{data.failureItems}</span>
      </div>
      <div class="status-item">
        <span class="status-name">Success Rate</span>
        <span class="status-value" id="success-rate-value">
          {data.successItems > 0 && (data.successItems / data.totalItems) * 100}%
        </span>
      </div>
    </div>
  );
}

export default ProductionSummary;
