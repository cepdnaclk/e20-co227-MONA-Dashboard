// components/MachineStatusGrid.jsx
import React from "react";
import MachineStatus from "./MachineStatus";
import { machineStatusData } from "../Data/rate_data";
import "./MachineStatusGrid.scss";

const MachineStatusGrid = () => {
  return (
    <div className="machine-status-grid">
      {machineStatusData.map((machine) => (
        <MachineStatus
          key={machine.machineNumber}
          machineNumber={machine.machineNumber}
          status={machine.status}
          data={machine.data}
        />
      ))}
    </div>
  );
};

export default MachineStatusGrid;
