import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PartProgress.scss"; // Ensure your styles are in this file
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdbarRate from "../../layouts/ThirdbarRate";

// List of product names (10 products)
const products = [
  "Product 01",
  "Product 02",
  "Product 03",
  "Product 04",
  "Product 05",
  "Product 06",
  "Product 07",
  "Product 08",
  "Product 09",
  "Product 10",
];

// Function to generate random progress values between 0 and 100
const generateRandomProgressData = () => {
  const data = [];
  for (let i = 0; i < 120; i++) {
    const productIndex = Math.floor(i / 12); // Determine product based on index
    const partNumber = (i % 12) + 1; // Part numbers are from 1 to 12
    const progress = Math.floor(Math.random() * 101); // Random progress between 0 and 100
    const mold = `Mold ${Math.floor(Math.random() * 20) + 1}`; // Random mold
    const productionTime = `${Math.floor(Math.random() * 8) + 1} hours`; // Random production time
    data.push({
      product: products[productIndex],
      part: partNumber,
      progress,
      mold,
      productionTime,
    });
  }
  return data;
};

const PartProgress = () => {
  // Store random progress values
  const progressData = generateRandomProgressData();

  // State for managing expanded block
  const [expandedItem, setExpandedItem] = useState(null);

  // Function to handle block click
  const handleBlockClick = (item) => {
    setExpandedItem(item);
  };

  // Function to close the modal
  const handleClose = () => {
    setExpandedItem(null);
  };

  return (
    <>
      <Header />
      <SecondBar />
      <ThirdbarRate />
      <div className="progress-page">
        {progressData.map((item, index) => (
          <div
            key={index}
            className="progress-block"
            onClick={() => handleBlockClick(item)}
          >
            <p>
              {item.product} - Part {item.part}
            </p>
            <div style={{ width: "60px", height: "60px", marginLeft: "10%" }}>
              <CircularProgressbar
                value={item.progress}
                text={`${item.progress}%`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Modal for expanded details */}
      {expandedItem && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>
              &times; {/* Close button */}
            </button>
            <h2>
              {expandedItem.product} - Part {expandedItem.part}
            </h2>
            <p>Mold: {expandedItem.mold}</p>
            <p>Production Time: {expandedItem.productionTime}</p>
            <p>Current Progress: {expandedItem.progress}%</p>
          </div>
        </div>
      )}
    </>
  );
};

export default PartProgress;
