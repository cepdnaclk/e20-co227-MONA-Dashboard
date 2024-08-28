import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: ["Tower 1", "Tower 2", "Tower 3"] }]}
      series={[
        { data: [4], label: "Tower 1" },
        { data: [3], label: "Tower 2" },
        { data: [6], label: "Tower 3" },
      ]}
      width={500}
      height={300}
    />
  );
}
