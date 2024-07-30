import React, { useState, useEffect, useRef } from "react";
import HourlyRateChart from "../../components/RateComponents/HourlyRate/HourlyRateChart";
import { productProgressData } from "../../components/RateComponents/Data/product_data";
import "./HourlyRate.scss";
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
// import Sidebar from "../../components/RateComponents/SideBar/SideBar";
import { motion } from "framer-motion";
import axios from "axios";

const HourlyRate = () => {
  const [realtimeinfo, setMachines] = useState([]); // Use clear variable name

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/machineinfo");
        setMachines(
          response.data.sort((a, b) => a.MachineNumber - b.MachineNumber)
        );
      } catch (error) {
        console.error("Error fetching machine data:", error);
      }
    };

    const intervalId = setInterval(fetchData, 1000); // Update every 0.5 seconds

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to fetch data only once on mount

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
      {/* <Sidebar /> */}

      <div className={`hourly-rate-page ${selectedMachine ? "blurred" : ""}`}>
        {realtimeinfo.map((realtimeinfo) => (
          <motion.div
            key={realtimeinfo.MachineNumber}
            className={`machine-block`}
            // onClick={() => handleMachineClick(machine)}
          >
            <motion.div
              className={`status`}
              style={{
                height: "18%",
                backgroundColor:
                  realtimeinfo.Status === "-1"
                    ? "#cc6666"
                    : realtimeinfo.Status === "off"
                    ? "#ababab"
                    : realtimeinfo.Status === "1"
                    ? "#99cc33"
                    : realtimeinfo.Status === "0"
                    ? "#77ccee"
                    : "#bbb",
              }}
            >
              <motion.div className="Rmachine-number">
                M <br />
                {realtimeinfo.MachineNumber}
              </motion.div>
            </motion.div>
            <motion.div className="Rchart-container">
              {/* <HourlyRateChart data={machine.data} /> */}
            </motion.div>
            <motion.div className="popup">
              Status: {realtimeinfo.Status}
            </motion.div>
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
