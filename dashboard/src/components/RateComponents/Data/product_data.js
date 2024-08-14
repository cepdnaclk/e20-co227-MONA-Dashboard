export const generateRandomData = () => {
  const machines = [
    { part: "part1", machineCount: 3 },
    { part: "part2", machineCount: 1 },
    { part: "part3", machineCount: 1 },
    { part: "part4", machineCount: 2 },
    { part: "part5", machineCount: 1 },
  ];

  const generateDataForPart = (machineCount) => {
    const data = [];
    for (let i = 0; i < machineCount; i++) {
      const machineData = Array.from({ length: 9 }, () => Math.random() * 100); // Generate random progress data between 0 and 100
      data.push(machineData);
    }
    return data;
  };

  const products = Array.from({ length: 3 }, (_, i) => ({
    productName: `Product ${i + 1}`,
    machines: machines.map(({ part, machineCount }) => ({
      part: `${part}-Product${i + 1}`,
      data: generateDataForPart(machineCount),
    })),
  }));

  console.log("Generated Products Data:", products); // Debug log to check the structure of generated data

  return products;
};

export const productProgressData = generateRandomData();

export const calculateOverallProgress = (machines) => {
  const totalProgress = machines.reduce((total, machine) => {
    const machineProgress = machine.data.flat();
    const averageProgress =
      machineProgress.reduce((sum, value) => sum + value, 0) /
      machineProgress.length;
    return total + averageProgress;
  }, 0);

  return totalProgress / machines.length;
};
