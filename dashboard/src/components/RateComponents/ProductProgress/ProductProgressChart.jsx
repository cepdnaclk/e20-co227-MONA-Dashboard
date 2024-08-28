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

const ProductProgressChart = ({ data }) => {
  return (
    <ResponsiveContainer width={340} height={160}>
      <LineChart data={data} margin={{ top: 0, right: 30, left: 5, bottom: 10 }}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis
          dataKey="time"
          label={{ value: "Time", position: "insideBottomRight", offset: -10 }}
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
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="faliure"
          stroke="#cc6666"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProductProgressChart;
