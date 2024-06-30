import React from 'react';
import styled from 'styled-components';
import SensorValueItem from './SensorValueItem';
import { useAppState } from '../AppStateContext';
import Add from "../../assets/Add";
import SvgResizer from "react-svg-resizer";

const SensorValuesContainer = styled.div`
    margin-bottom: 20px;
    padding: 20px;
`;

const SensorValuesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
`;

const AddSensorButton = styled.div`
    background-color: #4CAF5080 ;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    cursor: pointer;
    font-size: 24px;
    transition: background-color 0.3s ease;
    min-height: 100px;
    grid-column: span 1;  // Ensure it only takes up one column
    &:hover {
        background-color: #45a049;
    }
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
    const { homeSubMenu} = useAppState();

    const handleAddSensor = () => {
        // Implement logic to add a new sensor
        console.log('Add new sensor');
    };

    return (
        <SensorValuesContainer>
            <h2>Current sensors values</h2>
            <SensorValuesGrid>
                {sensorValues.map((sensor, index) => (
                    <SensorValueItem key={index} label={sensor.label} value={sensor.value} />
                ))}
                {homeSubMenu === 'edit' && (
                    <AddSensorButton onClick={handleAddSensor}>
                        <SvgResizer size={30}>
                            <Add/>
                        </SvgResizer>
                    </AddSensorButton>
                )}
            </SensorValuesGrid>
        </SensorValuesContainer>
    );
};

export default SensorValues;