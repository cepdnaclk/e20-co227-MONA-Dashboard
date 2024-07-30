const generateHourlyRateData = () => {
  const data = [];
  for (let i = 1; i <= 24; i++) {
    data.push({
      hour: i.toString().padStart(2, "0"),
      rate: Math.floor(Math.random() * 50),
    });
  }
  return data;
};

const machineStatusData = [
  {
    machineNumber: 1,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AB",
    activeHours: 5,
  },
  {
    machineNumber: 2,
    status: "stuck",
    data: generateHourlyRateData(),
    machineType: "AC",
    activeHours: 3,
  },
  {
    machineNumber: 3,
    status: "stopped",
    data: generateHourlyRateData(),
    machineType: "AD",
    activeHours: 8,
  },
  {
    machineNumber: 4,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AE",
    activeHours: 6,
  },
  {
    machineNumber: 5,
    status: "stuck",
    data: generateHourlyRateData(),
    machineType: "AB",
    activeHours: 4,
  },
  {
    machineNumber: 6,
    status: "stopped",
    data: generateHourlyRateData(),
    machineType: "AC",
    activeHours: 2,
  },
  {
    machineNumber: 7,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AD",
    activeHours: 7,
  },
  {
    machineNumber: 8,
    status: "stuck",
    data: generateHourlyRateData(),
    machineType: "AE",
    activeHours: 5,
  },
  {
    machineNumber: 9,
    status: "stopped",
    data: generateHourlyRateData(),
    machineType: "AB",
    activeHours: 1,
  },
  {
    machineNumber: 10,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AC",
    activeHours: 9,
  },
  {
    machineNumber: 11,
    status: "stuck",
    data: generateHourlyRateData(),
    machineType: "AD",
    activeHours: 4,
  },
  {
    machineNumber: 12,
    status: "stopped",
    data: generateHourlyRateData(),
    machineType: "AE",
    activeHours: 3,
  },
  {
    machineNumber: 13,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AB",
    activeHours: 6,
  },
  {
    machineNumber: 14,
    status: "stuck",
    data: generateHourlyRateData(),
    machineType: "AC",
    activeHours: 5,
  },
  {
    machineNumber: 15,
    status: "stopped",
    data: generateHourlyRateData(),
    machineType: "AD",
    activeHours: 2,
  },
  {
    machineNumber: 16,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AE",
    activeHours: 7,
  },
  {
    machineNumber: 17,
    status: "stuck",
    data: generateHourlyRateData(),
    machineType: "AB",
    activeHours: 4,
  },
  {
    machineNumber: 18,
    status: "stopped",
    data: generateHourlyRateData(),
    machineType: "AC",
    activeHours: 6,
  },
  {
    machineNumber: 19,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AD",
    activeHours: 5,
  },
  {
    machineNumber: 20,
    status: "stuck",
    data: generateHourlyRateData(),
    machineType: "AE",
    activeHours: 3,
  },
  {
    machineNumber: 21,
    status: "stopped",
    data: generateHourlyRateData(),
    machineType: "AB",
    activeHours: 2,
  },
  {
    machineNumber: 22,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AC",
    activeHours: 8,
  },
  {
    machineNumber: 23,
    status: "stuck",
    data: generateHourlyRateData(),
    machineType: "AD",
    activeHours: 7,
  },
  {
    machineNumber: 24,
    status: "stopped",
    data: generateHourlyRateData(),
    machineType: "AE",
    activeHours: 1,
  },
  {
    machineNumber: 25,
    status: "operating",
    data: generateHourlyRateData(),
    machineType: "AB",
    activeHours: 9,
  },
];

export { machineStatusData };
