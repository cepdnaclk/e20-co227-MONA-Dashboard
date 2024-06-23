import React from 'react';
import './SummaryTable.scss';
import JSONDATA from '../../../production.json';

const SummaryTable = ({ machineNumber }) => {
  // Find the machine object based on machine number
  const machine = JSONDATA.find(item => item.machine_no === machineNumber);

  // Return null if machine is not found (optional, depending on your use case)
  if (!machine) return null;

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
              <td className="value-column" align='center'>{machine[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SummaryTable;
