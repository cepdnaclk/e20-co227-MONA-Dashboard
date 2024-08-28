export const productProgressData = [
  {
    productName: "Product I",
    machines: [
      { machineNumber: 1, progress: 30 },
      { machineNumber: 2, progress: 50 },
      { machineNumber: 3, progress: 60 },
      { machineNumber: 4, progress: 80 },
    ],
  },
  {
    productName: "Product II",
    machines: [
      { machineNumber: 3, progress: 70 },
      { machineNumber: 4, progress: 40 },
    ],
  },
  {
    productName: "Product III",
    machines: [
      { machineNumber: 5, progress: 60 },
      { machineNumber: 6, progress: 90 },
    ],
  },

];

// Function to calculate overall progress
export const calculateOverallProgress = (machines) => {
  const totalProgress = machines.reduce(
    (sum, machine) => sum + machine.progress,
    0
  );
  return (totalProgress / machines.length).toFixed(2); 
};
