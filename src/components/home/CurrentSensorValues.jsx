import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import SensorValueItem from './SensorValueItem';
import { useAppState } from '../AppStateContext';
import { AddSensorButton } from "./AddSensorButton";
import { useApiContext } from "../../datasource/ApiContext";

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

const CurrentSensorValues = ({ onDataModificationConfirmed }) => {
    const { homeSubMenu } = useAppState();
    const [sensorValues, setSensorValues] = useState([]);
    const { homeApi } = useApiContext();

    const fetchSensorValues = useCallback(() => {
        homeApi.getCurrentSensorValues(setSensorValues);
    }, [homeApi]);

    useEffect(() => {
        fetchSensorValues();
    }, [fetchSensorValues]);

    const handleAddSensor = useCallback(() => {
        onDataModificationConfirmed((newSensor) => {
            homeApi.addSensorValue(newSensor, (addedSensor) => {
                setSensorValues(prevValues => [...prevValues, addedSensor]);
            });
        });
    }, [homeApi, onDataModificationConfirmed]);

    const handleEditSensor = useCallback((index, updatedSensor) => {
        homeApi.updateSensorValue(index, updatedSensor, (editedSensor) => {
            setSensorValues(prevValues =>
                prevValues.map((sensor, i) => i === index ? editedSensor : sensor)
            );
        });
    }, [homeApi]);

    const handleDeleteSensor = useCallback((index) => {
        homeApi.deleteSensorValue(index, () => {
            setSensorValues(prevValues => prevValues.filter((_, i) => i !== index));
        });
    }, [homeApi]);

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
                            onEdit={() => handleEditSensor(index, sensor)}
                            onDelete={() => handleDeleteSensor(index)}
                        />
                    </SensorItemWrapper>
                ))}
                {homeSubMenu === 'edit' && (
                    <SensorItemWrapper>
                        <AddSensorButton onButtonClicked={handleAddSensor} />
                    </SensorItemWrapper>
                )}
            </SensorValuesGrid>
        </SensorValuesContainer>
    );
};

export default CurrentSensorValues;