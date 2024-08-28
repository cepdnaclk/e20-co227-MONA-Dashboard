// Barchart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Barchart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="95%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 5,
          bottom: 5,
        }}
        barSize={20}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="count" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Barchart;
