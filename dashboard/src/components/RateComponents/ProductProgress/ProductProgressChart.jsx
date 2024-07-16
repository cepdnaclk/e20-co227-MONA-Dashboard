// src/components/ProductComponents/ProductProgressChart/ProductProgressChart.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductProgressChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="machineNumber" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="progress" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductProgressChart;
