import React from 'react';
import './SummaryTable.scss';
import JSONDATA from '../../../production.json';

const SummaryTable = ({ machineNumber }) => {
  // Find the machine object based on machine number
  const machine = JSONDATA.find(item => item.machine_no === machineNumber);

  // Default values for the table
  const defaultValues = {
    machine_no: "N/A",
    machine_name: "N/A",
    Success_shots: "N/A",
    failed_shots: "N/A",
    total_shots: "N/A",
    Success_percentage: "N/A",
    failed_percentage: "N/A",
    production_rate: "N/A"
  };

  // Use default values if no machine is found
  const data = machine || defaultValues;
  // Define keys and their corresponding labels
  const keyLabelMap = {
    machine_no: "MACHINE NUMBER",
    machine_name: "Machine Name",
    Success_shots: "Successive Shots",
    failed_shots: "Failed Shots",
    total_shots: "Total Shots",
    Success_percentage: "Successive Percentage",
    failed_percentage: "Failed Percentage",
    production_rate: "Production Rate"

  };

  const keys = Object.keys(keyLabelMap);

  return (
    <div className='summaryTable'>
      <table>
        <tbody>
          {keys.map((key, idx) => (
            <tr key={idx}>
              <td className="key-column">{keyLabelMap[key]}</td>
              <td className="value-column" align='center'>{data[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;
