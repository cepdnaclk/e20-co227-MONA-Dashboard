import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PartProgress.scss"; // Ensure your styles are in this file
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdBar from "../../layouts/ThirdBar";

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
    data.push({
      product: products[productIndex],
      part: partNumber,
      progress,
    });
  }
  return data;
};

const PartProgress = () => {
  // Store random progress values
  const progressData = generateRandomProgressData();

  return (
    <>
      <Header />
      <SecondBar />
      <ThirdBar />
      <div className="progress-page">
        {progressData.map((item, index) => (
          <div key={index} className="progress-block">
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
    </>
  );
};

export default PartProgress;
