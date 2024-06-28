import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartContainer = styled.div`
  background-color: #242428;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const ChartTitle = styled.h2`
  color: white;
  margin-bottom: 20px;
  font-size: 18px;
`;

const generateData = () => {
    const data = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const temperature = Math.random() * 10 + 15; // Random temperature between 15 and 25
            data.push({ time, temperature });
        }
    }
    return data;
};

const data = generateData();

const Chart = () => {
    return (
        <ChartContainer>
            <ChartTitle>Temperature before compressor</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                        dataKey="time"
                        stroke="#888"
                        interval={23}
                        tickFormatter={(time) => time.split(':')[0]}
                    />
                    <YAxis stroke="#888" domain={[15, 25]} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#333', border: 'none' }}
                        labelStyle={{ color: 'white' }}
                        itemStyle={{ color: '#4fc3f7' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#4fc3f7"
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

export default Chart;