import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[
        { scaleType: "band", data: ["Part 1", "Part 2", "Part 3", "Part 4","Part 5"] },
      ]}
      series={[
        { data: [1,3,4,1,1], label: "Machine 2" },
        { data: [2,2,2,3,3], label: "Machine 1" },
        { data: [3,4,2,1,4], label: "Machine 3" },
      ]}
      width={650}
      height={300}
    />
  );
}
