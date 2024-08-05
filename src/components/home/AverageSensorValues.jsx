import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import SensorValueItem from './SensorValueItem';
import {useAppState} from "../AppStateContext";
import {AddSensorButton} from "./AddSensorButton";
import {useApiContext} from "../../datasource/ApiContext";

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

const AverageSensorValues = ({onAddSensorValueItem, onEditSensorValueItem, onDeleteButtonClicked}) => {
    const {homeSubMenu} = useAppState();
    const [averageMetrics, setAverageMetrics] = useState([]);
    const {homeApi} = useApiContext();

    useEffect(() => homeApi.getAverageSensorValues(setAverageMetrics), [homeSubMenu]);

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
