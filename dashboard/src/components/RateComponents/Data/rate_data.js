// src/components/RateComponents/Data/rate_data.js
const generateHourlyRateData = () => {
  const data = [];
  for (let i = 1; i <= 24; i++) {
    data.push({
      hour: i.toString().padStart(2, "0"),
      rate: Math.floor(Math.random() * 100),
    });
  }
  return data;
};

const machineStatusData = [
  { machineNumber: 1, status: "operating", data: generateHourlyRateData() },
  { machineNumber: 2, status: "stuck", data: generateHourlyRateData() },
  { machineNumber: 3, status: "stopped", data: generateHourlyRateData() },
  { machineNumber: 4, status: "operating", data: generateHourlyRateData() },
  { machineNumber: 5, status: "stuck", data: generateHourlyRateData() },
  { machineNumber: 6, status: "stopped", data: generateHourlyRateData() },
  { machineNumber: 7, status: "operating", data: generateHourlyRateData() },
  { machineNumber: 8, status: "stuck", data: generateHourlyRateData() },
  { machineNumber: 9, status: "stopped", data: generateHourlyRateData() },
  { machineNumber: 10, status: "operating", data: generateHourlyRateData() },
  { machineNumber: 11, status: "stuck", data: generateHourlyRateData() },
  { machineNumber: 12, status: "stopped", data: generateHourlyRateData() },
  { machineNumber: 13, status: "operating", data: generateHourlyRateData() },
  { machineNumber: 14, status: "stuck", data: generateHourlyRateData() },
  { machineNumber: 15, status: "stopped", data: generateHourlyRateData() },
  { machineNumber: 16, status: "operating", data: generateHourlyRateData() },
  { machineNumber: 17, status: "stuck", data: generateHourlyRateData() },
  { machineNumber: 18, status: "stopped", data: generateHourlyRateData() },
  { machineNumber: 19, status: "operating", data: generateHourlyRateData() },
  { machineNumber: 20, status: "stuck", data: generateHourlyRateData() },
  { machineNumber: 21, status: "stopped", data: generateHourlyRateData() },
  { machineNumber: 22, status: "operating", data: generateHourlyRateData() },
  { machineNumber: 23, status: "stuck", data: generateHourlyRateData() },
  { machineNumber: 24, status: "stopped", data: generateHourlyRateData() },
  { machineNumber: 25, status: "operating", data: generateHourlyRateData() },
];

export { machineStatusData };
