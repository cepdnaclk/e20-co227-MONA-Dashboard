import React, { useState, useEffect } from 'react';
import './Date.css';

function RealTimeDateTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup function
  }, []);

  const formattedDate = dateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });

  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div className="datetime-container">
      <h2>
        {formattedDate} - {formattedTime}
      </h2>
    </div>
  );
}

export default RealTimeDateTime;
