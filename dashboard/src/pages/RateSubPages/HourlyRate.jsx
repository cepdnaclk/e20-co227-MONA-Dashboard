import React, { useState, useEffect, useRef } from "react";
import HourlyRateChart from "../../components/RateComponents/HourlyRate/HourlyRateChart";
import { machineStatusData } from "../../components/RateComponents/Data/rate_data";
import { productProgressData } from "../../components/RateComponents/Data/product_data";
import "./HourlyRate.scss"; 
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import Sidebar from "../../components/RateComponents/SideBar/SideBar";
import { motion } from "framer-motion";

const HourlyRate = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const centralBlockRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        centralBlockRef.current &&
        !centralBlockRef.current.contains(event.target)
      ) {
        setIsClosing(true);
        setTimeout(() => {
          setSelectedMachine(null);
          setIsClosing(false);
        }, 100); 
      }
    };

    if (selectedMachine) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedMachine]);

  const handleMachineClick = (machine) => {
    if (!isClosing) {
      setSelectedMachine(machine);
    }
  };

  const getProductDetails = (machineNumber) => {
    for (const product of productProgressData) {
      const machine = product.machines.find(
        (m) => m.machineNumber === machineNumber
      );
      if (machine) {
        return { productName: product.productName, progress: machine.progress };
      }
    }
    return { productName: "Unknown", progress: 0 };
  };

  return (
    <>
      <Header />
      <SecondBar />
      <Sidebar />

      <div className="hourly-rate-page">
        {machineStatusData.map((machine) => (
          <motion.div
            key={machine.machineNumber}
            className={`machine-block`}
            onClick={() => handleMachineClick(machine)}
          >
            <motion.div className={`status ${machine.status}`}>
              <motion.div className="Rmachine-number">
                M <br />
                {machine.machineNumber}
              </motion.div>
            </motion.div>
            <motion.div className="Rchart-container">
              <HourlyRateChart data={machine.data} />
            </motion.div>
            <motion.div className="popup">Status: {machine.status}</motion.div>
          </motion.div>
        ))}

        {selectedMachine && (
          <motion.div
            ref={centralBlockRef}
            className="central-block"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className={`status ${selectedMachine.status}`}>
              <motion.div className="Rmachine-number">
                Machine {selectedMachine.machineNumber} <br />
                {selectedMachine.status}
              </motion.div>
            </motion.div>
            <motion.div className="Rchart-container">
              <HourlyRateChart data={selectedMachine.data} />
            </motion.div>
            <motion.div className="additional-info">
              <div className="detail-item machine-type">
                Machine Type: {selectedMachine.machineType}
              </div>
              <div className="detail-item hours-active">
                Active Hours: {selectedMachine.activeHours}
              </div>
              <div className="detail-item product">
                Product Processing:{" "}
                {getProductDetails(selectedMachine.machineNumber).productName}
              </div>
              <div className="detail-item progress">
                Product Progress:{" "}
                {getProductDetails(selectedMachine.machineNumber).progress}%
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default HourlyRate;
