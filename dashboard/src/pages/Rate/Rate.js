import React, { useState } from "react";
import "./Rate.css";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import MainDash from "../../components/RateComponents/Dash/MainDash";
import ButtonGroup from "../../components/RateComponents/ButtonGroup/ButtonGroup";

function Rate() {
  const [showMainDash, setShowMainDash] = useState(false);

  const handleButtonClick = () => {
    setShowMainDash(!showMainDash);
  };

  return (
    <>
      <Header />
      <SecondBar />
      <div className="rate-page">
        <div className="button-group-container">
          <ButtonGroup onButtonClick={handleButtonClick} />
        </div>
        <div className="dash-container">{showMainDash && <MainDash />}</div>
      </div>
    </>
  );
}

export default Rate;
