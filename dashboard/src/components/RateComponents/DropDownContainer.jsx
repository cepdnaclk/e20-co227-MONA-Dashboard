import "./DropDownContainer.scss";
import DropDown from "./DropDown";
import React, { useState } from "react";


function DropDownContainer() {
  const [selectedMachine, setSelectedMachine] = useState("");

  return (
    <div className="drop-down-container">
      <DropDown
        selected={"Machine Number " + selectedMachine}
        setSelected={setSelectedMachine}
      />
    </div>
  );
}

export default DropDownContainer;
