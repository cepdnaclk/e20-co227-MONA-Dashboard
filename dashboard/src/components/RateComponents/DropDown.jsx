// src/Dropdown.js
import React, { useState } from "react";

import "./DropDown.scss";
import JSONDATA from "./productioncopy.json"; // Import JSON data

function Dropdown({ selected, setSelected }) {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsActive(!isActive);
    setIsOpen(!isOpen);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.closest(".rdropdown")) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    // Dropdown component
    <div className="rdropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        {selected}
        <span className="fas fa-caret-down"></span>
      </button>
      {isActive && (
        <div className={`dropdown-content ${isOpen ? "show" : ""}`}>
          {JSONDATA.map((val, key) => (
            <div
              key={key} // Unique key for each item
              onClick={() => {
                setSelected(val.machine_no); // Use machine_no from JSON data
                setIsActive(false);
              }}
              className="dropdown-item"
            >
              {"Machine No. " + val.machine_no}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
