import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

export default function BasicLineChart() {
  const seriesData = [
    [0, 0.5, 0.75, 1.5, 1.25, 2, 2.5, 3, 3.5],
    [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8],
    [0, 0.9, 1.8, 2.7, 2.8, 2.9, 3.5, 3.6, 3.7],
  ];

  const totalSeries = seriesData[0].map((_, index) =>
    seriesData.reduce((sum, series) => sum + series[index], 0)
  );

  return (
    <LineChart
      xAxis={[{ data: [0, 3, 6, 9, 12, 15, 18, 21, 24] }]}
      series={[
        {
          data: seriesData[0],
          label: "Machine 1",
        },
        {
          data: seriesData[1],
          label: "Machine 2",
        },
        {
          data: seriesData[2],
          label: "Machine 3",
        },
        {
          data: seriesData[3],
          label:"Machine 4",
        },
        {
          data: totalSeries,
          label: "Total",
          color: "red", // Optional: Specify a color for the total series
        },
      ]}
      width={390}
      height={350}
    />
  );
}
