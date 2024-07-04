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

const averageMetrics = [
    {label: 'Pressure after compressor', value: '5.4 MPa'},
    {label: 'Temperature before compressor', value: '300 K'},
    {label: 'Temperature in combustion chamber', value: '700 K'},
    {label: 'Input flow rate', value: '4 m\u00B3/min'},
    {label: 'Output flow rate', value: '2.3 m\u00B3/min'},
];

const AverageSensorValues = ({onAddSensorValueItem, onEditSensorValueItem, onDeleteButtonClicked}) => {
    const {homeSubMenu} = useAppState();

    return (
        <AverageMetricsContainer>
            <h2>Average sensors metrics</h2>
            <SensorValuesGrid>
                {averageMetrics.map((sensor, index) => (
                    <SensorItemWrapper
                        key={index}
                        className={sensor.label === 'Input gas composition' ? 'wide' : ''}
                    >
                    <SensorValueItem
                        key={index}
                        label={sensor.label}
                        value={sensor.value}
                        onEdit={onEditSensorValueItem}
                        onDelete={onDeleteButtonClicked}
                    />
                    </SensorItemWrapper>
                ))}
                {homeSubMenu === 'edit' && (
                    <SensorItemWrapper>
                    <AddSensorButton onButtonClicked={onAddSensorValueItem}/>
                    </SensorItemWrapper>
                )}
            </SensorValuesGrid>
        </AverageMetricsContainer>
    );
};

export default AverageSensorValues;
