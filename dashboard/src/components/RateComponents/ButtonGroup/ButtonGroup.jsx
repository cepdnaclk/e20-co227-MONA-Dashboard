import React from "react";
import "./ButtonGroup.css";

const ButtonGroup= () => {
  const statuses = [
    "running",
    "stopped",
    "stucked",
    "running",
    "running",
    "running",
    "running",
    "stopped",
    "running",
    "stopped",
    "running",
    "running",
    "running",
    "running",
    "running",
    "running",
    "stopped",
    "stopped",
    "running",
    "running",
    "running",
    "stopped",
    "running",
    "running",
    "running",
    "running",
    "running",
    "running",
    "running",
    "running",
    "running",
    "stopped",
    "stopped",
    "running",
    "stopped",
    "running",
    "stopped",
    "running",
    "running",
    "running",
    "running",
    "running",
    "running",
    "running",
    "stucked",
    "running",
    "running",
    "running",
    "stopped",
    "running",
  ];

  return (
    <div className="grid-container">

      <div className="button-group">
        {statuses.map((status, index) => (
          <button key={index} className={`grid-button ${status}`}>
            {index + 1}
          </button>
        ))}
      </div>
      <div className="status-legend">
        <div className="status running">RUNNING</div>
        <div className="status stopped">STOPPED</div>
        <div className="status stucked">STUCKED</div>
      </div>
    </div>
  );
};

export default ButtonGroup;
