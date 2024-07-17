import React, { useState } from 'react';
import './MachineDropdown.css';
import JSONDATA from '../../../production.json';  

function MachineDropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='mdropdown'>
      <div className='mdropdown-btn' onClick={() => setIsActive(!isActive)}>
        {selected}
        <span className='fas fa-caret-down'></span>
      </div>
      {isActive && (
        <div className='mdropdown-content'>
          {JSONDATA.map((val, key) => (
            <div
              key={key}  // Unique key for each item
              onClick={() => {
                setSelected(val.machine_no);  // Use machine_no from JSON data
                setIsActive(false);
              }}
              className='mdropdown-item'
            >
              {val.machine_no}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MachineDropdown;
