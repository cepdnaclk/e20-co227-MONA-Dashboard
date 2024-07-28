import React from "react";
import HourlyRateChart from "./HourlyRateChart";
import "./MachineStatus.scss";

const statusColors = {
  operating: "green",
  stuck: "orange",
  stopped: "red",
};

const MachineStatus = ({ machineNumber, status, data }) => {
  return (
    <div
      className="machine-status"
    >
      <div className="header">
        <span>Machin {machineNumber}</span>
        
      </div>
      <HourlyRateChart data={data} />
    </div>
  );
};

export default MachineStatus;
