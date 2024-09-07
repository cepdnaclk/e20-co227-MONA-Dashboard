import React, { useState } from "react";
import "./ExpandableCard.scss"; // You can create a new SCSS file for styling
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const ExpandableCard = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`expandable-card ${isExpanded ? "expanded" : ""}`}>
      <div className="card-header" onClick={toggleExpand}>
        <h3>{title}</h3>
        {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>
      {isExpanded && <div className="card-content">{children}</div>}
    </div>
  );
};

export default ExpandableCard;
