import React from 'react';
import styled from 'styled-components';
import SensorValueItem from './SensorValueItem';

const AverageMetricsContainer = styled.div`
  margin-bottom: 20px;
`;

const averageMetrics = [
    { label: 'Pressure after compressor', value: '5.4 MPa' },
    { label: 'Temperature before compressor', value: '300 K' },
    { label: 'Temperature in combustion chamber', value: '700 K' },
    { label: 'Input flow rate', value: '4 m^3/min' },
    { label: 'Output flow rate', value: '2.3 m^3/min' },
];

const AverageMetrics = () => {
    return (
        <AverageMetricsContainer>
            <h2>Average sensors metrics</h2>
            <div>
                {averageMetrics.map((metric, index) => (
                    <SensorValueItem key={index} label={metric.label} value={metric.value} />
                ))}
            </div>
        </AverageMetricsContainer>
    );
};

export default AverageMetrics;
