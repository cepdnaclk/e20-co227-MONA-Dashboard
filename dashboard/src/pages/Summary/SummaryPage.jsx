import * as React from 'react';
import Header from '../../layouts/Header';
import SecondBar from '../../layouts/SecondBar';
import Dropdownbox from '../../components/SummaryComponents/Boxes/Dropdownbox';
import ProductDropdown from '../../components/SummaryComponents/DropDown/ProductDropdown';
import PartDropdown from '../../components/SummaryComponents/DropDown/PartDropdown';
import MachinesDropdown from '../../components/SummaryComponents/DropDown/MachinesDropdown';
import DurationDropdown from '../../components/SummaryComponents/DropDown/DurationDropdown';
import './Summary.scss';
import ThirdbarSummary from '../../layouts/ThirdbarSummary';

const SummaryPage = () => {
  return (
    <div className='summary'>
      <Header />
      <SecondBar />
      <ThirdbarSummary />
      <div className='summaryContainer'>
        <div className='box'>
          <Dropdownbox />
          <div className='pickers'>
            <ProductDropdown />
            <PartDropdown />
            <MachinesDropdown />
            <div className='date'>
              <DurationDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
