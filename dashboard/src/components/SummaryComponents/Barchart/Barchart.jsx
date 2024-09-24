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
                <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 20, right: 20 }}
                    angle={270}
                    textAnchor="end "
                    height={50}
                    orientation='bottom'
                    
                />
                <YAxis
                     />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#99cc33" background={{ fill: '#eee' }} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Barchart;
