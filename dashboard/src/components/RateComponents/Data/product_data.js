// src/components/ProductComponents/Data/product_data.js
export const productProgressData = [
  {
    productName: "Product 1",
    machines: [
      { machineNumber: 1, progress: 30 },
      { machineNumber: 2, progress: 50 },
      { machineNumber: 3, progress: 60 },
      { machineNumber: 4, progress: 80 },
      // add more machines if necessary
    ],
  },
  {
    productName: "Product 2",
    machines: [
      { machineNumber: 3, progress: 70 },
      { machineNumber: 4, progress: 40 },
      // add more machines if necessary
    ],
  },
  {
    productName: "Product 3",
    machines: [
      { machineNumber: 5, progress: 60 },
      { machineNumber: 6, progress: 90 },
      // add more machines if necessary
    ],
  },
  {
    productName: "Product 4",
    machines: [
      { machineNumber: 7, progress: 20 },
      { machineNumber: 8, progress: 80 },
      // add more machines if necessary
    ],
  },
  {
    productName: "Product 5",
    machines: [
      { machineNumber: 9, progress: 10 },
      { machineNumber: 10, progress: 100 },
      // add more machines if necessary
    ],
  },
];

// Function to calculate overall progress
export const calculateOverallProgress = (machines) => {
  const totalProgress = machines.reduce(
    (sum, machine) => sum + machine.progress,
    0
  );
  return (totalProgress / machines.length).toFixed(2); // returns the average progress
};
