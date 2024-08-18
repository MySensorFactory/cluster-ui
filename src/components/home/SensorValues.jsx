import SensorValueItem from "./SensorValueItem";
import {AddSensorButton} from "./AddSensorButton";
import React from "react";
import styled from "styled-components";

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

export const SensorValues = ({
                                 title,
                                 data,
                                 handleEditSensor,
                                 handleDeleteSensor,
                                 handleAddSensor,
                                 isAddSensorButtonVisible
                             }) => {
    return <SensorValuesContainer>
        <h2>{title}</h2>
        <SensorValuesGrid>
            {data.map((sensor, index) => (
                <SensorItemWrapper
                    key={sensor.id}
                    className={sensor.label === 'composition' ? 'wide' : ''}
                >
                    <SensorValueItem
                        label={sensor.label}
                        value={sensor.value}
                        onEdit={() => handleEditSensor(sensor.id)}
                        onDelete={() => handleDeleteSensor(sensor.id)}
                    />
                </SensorItemWrapper>
            ))}
            {isAddSensorButtonVisible && (
                <SensorItemWrapper>
                    <AddSensorButton onButtonClicked={handleAddSensor}/>
                </SensorItemWrapper>
            )}
        </SensorValuesGrid>
    </SensorValuesContainer>

}