import DropDown from "../DropDown/DropDown";
import React, { useState } from "react";
import "./DropDownContainer.css";

function DropDownContainer() {
  const [selectedMachine, setSelectedMachine] = useState("");

  return (
    <>
      <div className="drop-down-container">
        <DropDown
          selected={"Machine Number " + selectedMachine}
          setSelected={setSelectedMachine}
        />
      </div>
    </>
  );
}

export default DropDownContainer;
