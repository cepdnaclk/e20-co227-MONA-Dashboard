import React from 'react';
import './Fourth.scss';
import Dropdown from '../components/SummaryComponents/DropDown/Dropdown';
import GeneratePDFButton from '../components/SummaryComponents/GeneratePDF/GeneratePDFButton';



const FourthbarSummary = ({ dropdownData, dropdownLabel, dropdownData2, dropdownLabel2, dropdownData3, dropdownLabel3 , pdfname}) => {


    return (
        <div>
            <div className='summaryContainer'>
                <div className='box' style={{marginTop:'10px'}}>
                    {/* <Dropdownbox /> */}
                    <div className='box1' style={{width:'97%'}}>
                        <div className='pickers'>
                            <Dropdown data={dropdownData} label={dropdownLabel} />

                            {dropdownData2 && <Dropdown data={dropdownData2} label={dropdownLabel2} />}
                        </div>
                        <div className='date'>
                            <Dropdown data={dropdownData3} label={dropdownLabel3} />
                        </div>
                    </div>
                    <div style={{ cursor: 'pointer', margin:'0.2%'}}>
                        <GeneratePDFButton targetId='pdfContent' filename={pdfname} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default FourthbarSummary;
