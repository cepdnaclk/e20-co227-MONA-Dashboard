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
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" label={{ value: "Time", position: "insideBottomRight", offset: -4 }}/>
        <YAxis label={{ value: "Slots/Time", angle: -90, position: "insideBottomLeft", offset: 20}}/>
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
  );
};

export default HourlyRateChart;
