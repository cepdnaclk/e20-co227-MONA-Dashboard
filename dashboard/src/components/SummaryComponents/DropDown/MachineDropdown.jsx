import React, { useState } from 'react';
import './MachineDropdown.css';
import JSONDATA from '../../../product.json';  

function MachineDropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className='machine-dropdown'>
      <div className='machine-dropdown-btn' onClick={() => setIsActive(!isActive)}>
        {selected}
        <span className='fas fa-caret-down'></span>
      </div>
      {isActive && (
        <div className='machine-dropdown-content'>
          {JSONDATA.map((val, key) => (
            <div
              key={key}  // Unique key for each item
              onClick={() => {
                setSelected(val.product_name);  
                setIsActive(false);
              }}
              className='machine-dropdown-item'
            >
              {val.product_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MachineDropdown;
