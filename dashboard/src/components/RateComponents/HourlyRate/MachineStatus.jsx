// components/MachineStatus.jsx
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
      style={{ borderColor: statusColors[status] }}
    >
      <div className="header">
        <span>Machine {machineNumber}</span>
        <span
          className="status"
          style={{ backgroundColor: statusColors[status] }}
        >
          {status}
        </span>
      </div>
      <HourlyRateChart data={data} />
    </div>
  );
};

export default MachineStatus;
