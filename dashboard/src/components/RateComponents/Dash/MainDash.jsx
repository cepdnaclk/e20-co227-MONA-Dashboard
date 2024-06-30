import React from "react";
import "./MainDash.css";
import Cards from "../Cards/Cards";
import Graph from "../Graph/Graph";
import DropdownContainer from "../Containers/DropDownContainer";
import Button from "../Button/Button";
import Table from "../Table/Table";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
const MainDash = () => {
  return (
    <div className="MainDash">
      <div className="drop-container">
        <DropdownContainer />
      </div>

      <div className="cards-container">
        <div className="button-container">
          <Button status="Stucked" />
        </div>
        <Cards />
      </div>

      <div className="graph-container">
        <Graph />
      </div>
      <div className="ButtonGroup">
        <ButtonGroup />
      </div>

      <Table />
    </div>
  );
};

export default MainDash;
