import React from 'react';
import './Fourth.scss';
import Dropdown from '../components/SummaryComponents/DropDown/Dropdown';
import GeneratePDFButton from '../components/SummaryComponents/GeneratePDF/GeneratePDFButton';

const FourthbarSummary = ({
  dropdownData,
  dropdownLabel,
  dropdownData3,
  dropdownLabel3,
  partDropdownData,
  partDropdownLabel,
  pdfname,
  selectedProduct,
  onProductSelect,
  selectedDateRange,
  onDateRangeSelect,
  selectedPart,
  onPartSelect,
}) => {
  return (
    <div>
      <div className="summaryContainer">
        <div className="box" style={{ marginTop: '10px' }}>
          <div className="box1" style={{ width: '97%' }}>
            <div className="pickers">
              <Dropdown
                data={dropdownData}
                label={dropdownLabel}
                value={selectedProduct}
                onChange={onProductSelect}
              />
            
            
            {partDropdownData && partDropdownData.length > 0 && (
              <div className="parts">
                <Dropdown
                  data={partDropdownData}
                  label={partDropdownLabel}
                  value={selectedPart}
                  onChange={onPartSelect}
                />
              </div>
            )}
          </div>
          </div>
          <div className="date">
              <Dropdown
                data={dropdownData3}
                label={dropdownLabel3}
                value={selectedDateRange}
                onChange={onDateRangeSelect}
              />
            </div>
          <div style={{ cursor: 'pointer', margin: '0.2%' }}>
            <GeneratePDFButton targetId="pdfContent" filename={pdfname} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthbarSummary;
