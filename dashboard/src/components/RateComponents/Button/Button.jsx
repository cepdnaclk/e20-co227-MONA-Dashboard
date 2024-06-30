import React from "react";
import "./Button.css";

const Button = ({ status }) => {
  let statusText;
  let backgroundColor;

  switch (status) {
    case "Running":
      statusText = "Running";
      backgroundColor = "linear-gradient(135deg, #43cea2, #185a9d)";
      break;
    case "Stopped":
      statusText = "Stopped";
      backgroundColor = "linear-gradient(135deg, #f85032, #e73827)";
      break;
    case "Stucked":
      statusText = "Stucked";
      backgroundColor = "linear-gradient(135deg, #ffd700, #ffa500)";
      break;
    default:
      statusText = "Unknown";
      backgroundColor = "linear-gradient(135deg, #a445b2, #d41872)";
  }

  return (
    <div className="custom-button" style={{ background: backgroundColor }}>
      <div className="details">
        <span>{statusText}</span>
      </div>
    </div>
  );
};

export default Button;
