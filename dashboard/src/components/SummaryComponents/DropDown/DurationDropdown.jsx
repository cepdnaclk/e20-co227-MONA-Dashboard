import React, { useState } from 'react';
import './DurationDropdown.css';

function DurationDropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const options = ['1 week', '2 weeks', '1 month', '3 months'];

  return (
    <div className='dropdown'>
      <div className='dropdown-btn' onClick={() => setIsActive(!isActive)}>
        {selected}
        <span className='fas fa-caret-down'></span>
      </div>
      {isActive && (
        <div className='dropdown-content'>
          {options.map(option => (
            <div
              key={option}
              onClick={() => {
                setSelected(option);
                setIsActive(false);
              }}
              className='dropdown-item'
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DurationDropdown;
