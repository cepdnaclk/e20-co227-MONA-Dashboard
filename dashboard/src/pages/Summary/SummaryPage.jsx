import './Summary.scss'
import Header from '../../layouts/Header';
import SecondBar from '../../layouts/SecondBar';
import { useState } from 'react'
import SummaryWidgets from '../../components/SummaryComponents/Widgets/SummaryWidgets';
import Dropdownbox from '../../components/SummaryComponents/Boxes/Dropdownbox';
import SummaryChart from '../../components/SummaryComponents/Charts/SummaryChart';
import SummaryPercentage from '../../components/SummaryComponents/Featured/SummaryPercentage';
import SummaryTable from '../../components/SummaryComponents/Tables/SummaryTable';
import MachineDropdown from '../../components/SummaryComponents/DropDown/MachineDropdown';
import DurationDropdown from '../../components/SummaryComponents/DropDown/DurationDropdown';

const SummaryPage = () => {
  const [selected, setSelected] = useState('Select duration');
  const [selectedMachine, setSelectedMachine] = useState('Select machine');
  const machineNumber = 1;

  return (
    
    <div className='summary'>
      <Header />
      <div className='summaryContainer'>
      <SecondBar/>
          <div className='box'>
          <Dropdownbox/>
            <div>
            <MachineDropdown selected={selectedMachine} setSelected={setSelectedMachine} />
            <DurationDropdown selected={selected} setSelected={setSelected}/>
            </div>
            
          </div>
          <div className='widget'>
            <SummaryWidgets type='success'/>
            <SummaryWidgets type='failed'/>
            <SummaryWidgets type='total'/>
          </div>
          <div className='rightCharts'>
            <SummaryChart/>
          </div>
          <div className='percentages'>
          <SummaryPercentage type='success' />
          <SummaryPercentage type ='failed'/>
          </div>
          <div className='table'>
            <div className='tableTitle'>Summary</div>
            <SummaryTable machineNumber={machineNumber}/>
          </div>
      </div> 
    </div>
  )
}

export default SummaryPage