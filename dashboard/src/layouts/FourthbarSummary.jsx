import React from 'react';
import './Fourth.scss';
import Dropdown from '../components/SummaryComponents/DropDown/Dropdown';
import Dropdownbox from '../components/SummaryComponents/Boxes/Dropdownbox';
import DurationDropdown from '../components/SummaryComponents/DropDown/DurationDropdown';
import GeneratePDFButton from '../components/SummaryComponents/GeneratePDF/GeneratePDFButton';

const FourthbarSummary = ({ dropdownData, dropdownLabel, dropdownData2, dropdownLabel2 , pdfname}) => {
    return (
        <div>
            <div className='summaryContainer'>
                <div className='box' style={{marginTop:'10px',marginLeft:"1%"}}>
                    {/* <Dropdownbox /> */}
                    <div className='box1' style={{width:'96%'}}>
                        <div className='pickers'>
                            <Dropdown data={dropdownData} label={dropdownLabel} />

                            {dropdownData2 && <Dropdown data={dropdownData2} label={dropdownLabel2} />}
                        </div>
                        <div className='date'>
                            <DurationDropdown />
                        </div>
                    </div>
                    <div style={{ cursor: 'pointer', marginRight:'0.5%'}}>
                        <GeneratePDFButton targetId='pdfContent' filename={pdfname} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FourthbarSummary;
