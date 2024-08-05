import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SensorValueItem from './SensorValueItem';
import {useAppState} from '../AppStateContext';
import {AddSensorButton} from "./AddSensorButton";
import {useApiContext} from "../../datasource/ApiContext";

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

const CurrentSensorValues = ({onAddSensorValueItem, onEditSensorValueItem}) => {
    const {homeSubMenu} = useAppState();
    const [sensorValues, setSensorValues] = useState([]);
    const { homeApi } = useApiContext();

    useEffect(() => homeApi.getCurrentSensorValues(setSensorValues), [homeSubMenu]);

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