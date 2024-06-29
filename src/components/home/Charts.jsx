import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ChartsContainer = styled.div`
    background-color: #1C1C21;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
`;

const ChartsTitle = styled.h2`
    color: white;
    margin-bottom: 20px;
    font-size: 24px;
`;

const ChartWrapper = styled.div`
    margin-bottom: 30px;
`;

const ChartTitle = styled.h3`
    color: white;
    margin-bottom: 10px;
    font-size: 18px;
`;

const generateData = (min, max) => {
    const data = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const value = Math.random() * (max - min) + min;
            data.push({ time, value });
        }
    }
    return data;
};

const temperatureData = generateData(15, 25);
const pressureData = generateData(4, 6);
const flowData = generateData(100, 200);

const Chart = ({ data, title, dataKey, stroke, domain, yAxisUnit }) => (
    <ChartWrapper>
        <ChartTitle>{title}</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                    dataKey="time"
                    stroke="#888"
                    interval={23}
                    tickFormatter={(time) => time.split(':')[0]}
                    label={{ value: 'Time (hours)', position: 'insideBottom', offset: -10, fill: '#888' }}
                />
                <YAxis
                    stroke="#888"
                    domain={domain}
                    label={{ value: yAxisUnit, position: 'insideLeft', offset: -10, fill: '#888' }}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    contentStyle={{ backgroundColor: '#333', border: 'none' }}
                    labelStyle={{ color: 'white' }}
                    itemStyle={{ color: stroke }}
                    formatter={(value) => [`${value.toFixed(2)} ${yAxisUnit}`, '']}
                />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={stroke}
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    </ChartWrapper>
);

const Charts = () => {
    return (
        <ChartsContainer>
            <ChartsTitle>Realtime data charts</ChartsTitle>
            <Chart
                data={temperatureData}
                title="Temperature before compressor"
                dataKey="value"
                stroke="#4fc3f7"
                domain={[15, 25]}
                yAxisUnit="°C"
            />
            <Chart
                data={pressureData}
                title="Pressure after compressor"
                dataKey="value"
                stroke="#ff9800"
                domain={[4, 6]}
                yAxisUnit="MPa"
            />
            <Chart
                data={flowData}
                title="Flow rate"
                dataKey="value"
                stroke="#4caf50"
                domain={[100, 200]}
                yAxisUnit="m³/h"
            />
        </ChartsContainer>
    );
};

export default Charts;