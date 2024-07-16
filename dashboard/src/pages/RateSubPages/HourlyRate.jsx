import React from "react";
import HourlyRateChart from "../../components/RateComponents/HourlyRate/HourlyRateChart";
import { machineStatusData } from "../../components/RateComponents/Data/rate_data";
import "./HourlyRate.scss";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import Sidebar from "../../components/RateComponents/SideBar/SideBar";

const HourlyRate = () => {
  return (
    <>
      <Header />
      <SecondBar />
      <Sidebar />

      <div className="hourly-rate-page">
        {machineStatusData.map((machine) => (
          <div
            key={machine.machineNumber}
            className={`machine-block ${machine.status}`}
          >
            <div className={`status ${machine.status}`}>
              <div className="machine-number">
                Machine <br />
                {machine.machineNumber}
              </div>
            </div>
            <div className="chart-container">
              <HourlyRateChart data={machine.data} />
            </div>
            <div className="popup">Status: {machine.status}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HourlyRate;
