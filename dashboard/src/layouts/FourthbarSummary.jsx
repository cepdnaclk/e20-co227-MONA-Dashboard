import React from 'react';
import './Fourth.scss';
import Dropdown from '../components/SummaryComponents/DropDown/Dropdown';
import Dropdownbox from '../components/SummaryComponents/Boxes/Dropdownbox';
import DurationDropdown from '../components/SummaryComponents/DropDown/DurationDropdown';

const FourthbarSummary = ({ dropdownData, dropdownLabel }) => {
  return (
    <div>
      <div className='summaryContainer'>
        <div className='box'>
          <Dropdownbox />
          <div className='pickers'>
            <Dropdown data={dropdownData} label={dropdownLabel} />
            <div className='date'>
              <DurationDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthbarSummary;
