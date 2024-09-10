import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./PartProgress.scss"; // Ensure your styles are in this file
import Header from "../../layouts/Header";
import SecondBar from "../../layouts/SecondBar";
import ThirdBar from "../../layouts/ThirdBar";

const PartProgress = () => {
  // Function to generate random progress values between 0 and 100
  const generateRandomProgressData = () => {
    const data = [];
    for (let i = 0; i < 120; i++) {
      data.push(Math.floor(Math.random() * 101));
    }
    return data;
  };

  // Store random progress values
  const progressData = generateRandomProgressData();

  return (
    <>
      <Header />
      <SecondBar />
      <ThirdBar />
      <div className="progress-page">
        {progressData.map((progress, index) => (
          <div key={index} className="progress-block">
            <CircularProgressbar value={progress} text={`${progress}%`} />
            <p>Block {index + 1}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PartProgress;
