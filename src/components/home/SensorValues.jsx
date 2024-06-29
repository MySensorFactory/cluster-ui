import React from 'react';
import styled from 'styled-components';
import SensorValueItem from './SensorValueItem';

const SensorValuesContainer = styled.div`
    margin-bottom: 20px;
    padding: 20px;
`;

const SensorValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const sensorValues = [
    { label: 'Pressure after compressor', value: '5.4 MPa' },
    { label: 'Temperature before compressor', value: '300 K' },
    { label: 'Temperature in combustion chamber', value: '700 K' },
    { label: 'Input flow rate', value: '4 m^3/min' },
    { label: 'Output flow rate', value: '2.3 m^3/min' },
    { label: 'Input gas composition', value: '42 % CO2, 18 % H2, 10 % NH3, 15 % O2, 15% N2' },
];

const SensorValues = () => {
    return (
        <SensorValuesContainer>
            <h2>Current sensors values</h2>
            <SensorValuesGrid>
                {sensorValues.map((sensor, index) => (
                    <SensorValueItem key={index} label={sensor.label} value={sensor.value} />
                ))}
            </SensorValuesGrid>
        </SensorValuesContainer>
    );
};

export default SensorValues;
