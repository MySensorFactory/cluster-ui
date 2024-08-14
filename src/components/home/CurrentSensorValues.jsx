import React, {useEffect, useCallback, useState} from 'react';
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

const CurrentSensorValues = ({sensorValuesConfig, setSensorValuesConfig, onDataModificationConfirmed}) => {
    const {homeSubMenu} = useAppState();
    const [currentSensorValues, setCurrentSensorValues] = useState([]);
    const {homeApi} = useApiContext();

    const fetchSensorValues = useCallback(() => {
        homeApi.getCurrentSensorValues('038833bf-9efb-40a2-945f-4b7ea29354d4', setCurrentSensorValues);
    }, [homeApi]);

    useEffect(() => {
        fetchSensorValues();
    }, [sensorValuesConfig, homeSubMenu]);

    const handleAddSensor = useCallback(() => {
        onDataModificationConfirmed((newSensor) => {
            const newConfig: Array = sensorValuesConfig
            newConfig.push(newSensor)
            setSensorValuesConfig(newConfig)
        });
    }, [sensorValuesConfig]);

    const handleEditSensor = useCallback((id) => {
        onDataModificationConfirmed((newSensorConfig) => {
            const index = sensorValuesConfig.indexOf(sensorValuesConfig.find(s => s.id === id));
            if (index > -1) {
                const newConfig: Array = sensorValuesConfig
                newConfig[index] = newSensorConfig;
                setSensorValuesConfig(newConfig);
            }
        })
    }, [sensorValuesConfig]);

    const handleDeleteSensor = useCallback((id) => {
        const index = sensorValuesConfig.indexOf(sensorValuesConfig.find(s => s.id === id));
        if (index > -1) {
            const newConfig: Array = sensorValuesConfig
            newConfig.splice(index, 1)
            setSensorValuesConfig(newConfig);
        }
    }, [sensorValuesConfig]);

    return (
        <SensorValuesContainer>
            <h2>Current sensors values</h2>
            <SensorValuesGrid>
                {currentSensorValues != null && currentSensorValues.map((sensor, index) => (
                    <SensorItemWrapper
                        key={index}
                        className={sensor.label === 'Input gas composition' ? 'wide' : ''}
                    >
                        <SensorValueItem
                            label={sensor.label}
                            value={sensor.value}
                            onEdit={() => handleEditSensor(sensor.id)}
                            onDelete={() => handleDeleteSensor(sensor.id)}
                        />
                    </SensorItemWrapper>
                ))}
                {homeSubMenu === 'edit' && (
                    <SensorItemWrapper>
                        <AddSensorButton onButtonClicked={handleAddSensor}/>
                    </SensorItemWrapper>
                )}
            </SensorValuesGrid>
        </SensorValuesContainer>
    );
};

export default CurrentSensorValues;