import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { productProgressData } from "../Data/product_data"; // Adjust the import path as needed

const ProductProgressChart = ({ productData }) => {
  const [selectedDataset, setSelectedDataset] = useState(0);

  // Ensure that the selected product and machines are defined before accessing them
  const selectedProduct = productData[selectedDataset];
  if (
    !selectedProduct ||
    !selectedProduct.machines ||
    selectedProduct.machines.length === 0
  ) {
    return <div>No product data available for the selected part.</div>;
  }

  const selectedMachines = selectedProduct.machines.filter(
    (machine) => machine.data && machine.data.length > 0
  );

  if (selectedMachines.length === 0) {
    return <div>No machine data available for the selected part.</div>;
  }

  // Create totalSeries by summing corresponding elements across all machines
  const totalSeries = selectedMachines[0].data.map((_, index) =>
    selectedMachines.reduce(
      (sum, machine) => sum + (machine.data[index] || 0),
      0
    )
  );

  const datasets = selectedMachines.map((machine, idx) => ({
    label: `Machine ${idx + 1}`,
    data: machine.data.map((arr) => arr.reduce((acc, val) => acc + val, 0)),
    borderColor: ["blue", "green", "orange", "purple"][idx % 4],
  }));

  datasets.push({
    label: "Total",
    data: totalSeries,
    borderColor: "red",
  });

  const chartData = {
    labels: [0, 3, 6, 9, 12, 15, 18, 21, 24],
    datasets,
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="progress">
      <div className="part-buttons">
        {productData.map((_, index) => (
          <button
            key={index}
            onClick={() => setSelectedDataset(index)}
            style={{ margin: "10px" }}
          >
            Part {index + 1}
          </button>
        ))}
      </div>
      <div
        className="chart-container"
        style={{ width: "530px", height: "400px" }}
      >
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ProductProgressChart;
