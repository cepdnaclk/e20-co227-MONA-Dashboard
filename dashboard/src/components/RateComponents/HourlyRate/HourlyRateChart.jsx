import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HourlyRateChart = ({ data }) => {
  // Determine the component state based on data availability
  const isLoading = data === undefined; // Data is being loaded
  const isEmpty = data && data.length === 0; // Data is loaded but empty

  return (
    <div style={{ width: '100%', height: "100%" }}>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px",marginTop:"10%",marginLeft:"30%"  ,color:"#888888" }}>
          Loading data...
        </div>
      ) : isEmpty ? (
        <div style={{ textAlign: "center", padding: "20px",marginTop:"10%",marginLeft:"30%"  ,color:"#888888"}}>
          No data to display
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis
              dataKey="time"
              label={{ value: "", position: "insideBottomRight", offset: -4 }}
            />
            <YAxis
              label={{
                value: "Slots/Time",
                angle: -90,
                position: "insideBottomLeft",
                offset: 20,
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="success"
              stroke="#99cc33"
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="faliure"
              stroke="#cc6666"
              strokeWidth={2}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HourlyRateChart;
