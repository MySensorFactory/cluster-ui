import React from 'react';
import styled from 'styled-components';
import SensorValueItem from './SensorValueItem';
import {useAppState} from "../AppStateContext";
import {AddSensorButton} from "./AddSensorButton";

const AverageMetricsContainer = styled.div`
    margin-bottom: 20px;
    padding: 20px;
`;

const SensorValuesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
`;

const averageMetrics = [
    {label: 'Pressure after compressor', value: '5.4 MPa'},
    {label: 'Temperature before compressor', value: '300 K'},
    {label: 'Temperature in combustion chamber', value: '700 K'},
    {label: 'Input flow rate', value: '4 m^3/min'},
    {label: 'Output flow rate', value: '2.3 m^3/min'},
];

const AverageMetrics = () => {
    const { homeSubMenu} = useAppState();

    const handleAddSensor = () => {
        // Implement logic to add a new sensor
        console.log('Add new sensor');
    };

    return (
        <AverageMetricsContainer>
            <h2>Average sensors metrics</h2>
            <SensorValuesGrid>
                {averageMetrics.map((sensor, index) => (
                    <SensorValueItem key={index} label={sensor.label} value={sensor.value}/>
                ))}
                {homeSubMenu === 'edit' && (
                    <AddSensorButton onClick={handleAddSensor}/>
                )}
            </SensorValuesGrid>
        </AverageMetricsContainer>
    );
};

export default AverageMetrics;
