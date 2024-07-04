import React from 'react';
import styled from 'styled-components';
import SensorValueItem from './SensorValueItem';
import {useAppState} from '../AppStateContext';
import {AddSensorButton} from "./AddSensorButton";

const SensorValuesContainer = styled.div`
    margin-bottom: 20px;
    padding: 20px;
`;

const SensorValuesGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const SensorItemWrapper = styled.div`
    flex: 0 0 calc(20.0% - 20px);
    
    &.wide {
        flex: 0 0 calc(40.00% - 20px);
    }
`;

const sensorValues = [
    {label: 'Pressure after compressor', value: '5.4 MPa'},
    {label: 'Temperature before compressor', value: '300 K'},
    {label: 'Temperature in combustion chamber', value: '700 K'},
    {label: 'Input flow rate', value: '4 m\u00B3/min'},
    {label: 'Output flow rate', value: '2.3 m\u00B3/min'},
    {label: 'Input gas composition', value: '42 % CO₂, 18 % H₂, 10 % NH₃, 15 % O₂, 15% N₂'},
];

const CurrentSensorValues = ({onAddSensorValueItem, onEditSensorValueItem}) => {
    const {homeSubMenu} = useAppState();

    const handleDeleteSensor = (index) => {
        // Implement logic to delete a sensor
        console.log('Delete sensor at index', index);
    };

    return (
        <SensorValuesContainer>
            <h2>Current sensors values</h2>
            <SensorValuesGrid>
                {sensorValues.map((sensor, index) => (
                    <SensorItemWrapper
                        key={index}
                        className={sensor.label === 'Input gas composition' ? 'wide' : ''}
                    >
                        <SensorValueItem
                            label={sensor.label}
                            value={sensor.value}
                            onEdit={onEditSensorValueItem}
                            onDelete={() => handleDeleteSensor(index)}
                        />
                    </SensorItemWrapper>
                ))}
                {homeSubMenu === 'edit' && (
                    <SensorItemWrapper>
                        <AddSensorButton onButtonClicked={onAddSensorValueItem}/>
                    </SensorItemWrapper>
                )}
            </SensorValuesGrid>
        </SensorValuesContainer>
    );
};

export default CurrentSensorValues;