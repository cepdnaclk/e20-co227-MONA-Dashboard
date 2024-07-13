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
//import DurationDropdown from '../../components/SummaryComponents/DropDown/DurationDropdown';
import DatePicker from '../../components/SummaryComponents/DatePicker/DatePicker';

const SummaryPage = () => {
  //const [selected, setSelected] = useState('Select duration');
  const [selectedMachine, setSelectedMachine] = useState('Select Product');
  const [selectedMachineNumber, setSelectedMachineNumber] = useState(null);

  return (
    
    <div className='summary'>
      <Header />
      <SecondBar/>
      <div className='summaryContainer'>

          <div className='box'>
          <Dropdownbox/>
            <div className='pickers'>
            <MachineDropdown
              selected={selectedMachine}
              setSelected={(machine) => {
                setSelectedMachine(machine);
                setSelectedMachineNumber(machine);
              }}
            />
            <DatePicker />
            {/*<DurationDropdown selected={selected} setSelected={setSelected}/>*/}
            </div>  
          </div>
          <div className='container2'>
            <div className='machines'>
              <div className='machineTitle'>Used Machines</div>
            </div>
            <div className='widgets3'>
              <SummaryWidgets type='success'/>
              <SummaryWidgets type='failed'/>
              <SummaryWidgets type='total'/>
            </div>
            <div className='graph'>
              <SummaryChart/>
            </div>
            <div className='table'>
              <div className='tableTitle'>Summary</div>
              <SummaryTable machineNumber={selectedMachineNumber}/>
            </div>
            <div className='percentages'>
              <SummaryPercentage type='success' />
              <SummaryPercentage type ='failed'/>
            </div>

          </div>
          
          
      </div> 
    </div>
  )
}

export default SummaryPage