import React from "react";
import "./Graph.css";
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import chartdata from "../Data/chartdata.json"

defaults.responsive = true;
defaults.maintainAspectRatio = false;

const Graph = () => {
  return (
    <div className="chart">
      <Line
        data={{
          labels: chartdata.map((data) => data.label),
          datasets: [
            {
              label: "Succesive Shots",
              data: chartdata.map((data) => data["Succesive Shots"]),
              backgroundColor: "#36a2eb",
              borderColor: "#36a2eb",
            },
            {
              label: "Failed Shots",
              data: chartdata.map((data) => data["Failed Shots"]),
              backgroundColor: "#ff6384",
              borderColor: "#ff6384",
            },
            {
              label: "Total Shots",
              data: chartdata.map((data) => data["Total Shots"]),
              backgroundColor: "#cc65fe",
              borderColor: "#cc65fe",
            },
          ],
        }}
      />
    </div>
  );
};

export default Graph;
