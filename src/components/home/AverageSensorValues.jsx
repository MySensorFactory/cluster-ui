import React, {useCallback, useEffect, useState} from 'react';
import {useAppState} from "../AppStateContext";
import {useApiContext} from "../../datasource/ApiContext";
import {SensorValues} from "./SensorValues";
import type {ValueConfig} from "../../datasource/HomeClient";
import {HomeApi, SensorValue} from "../../datasource/HomeClient";
import type {Postprocessor} from "./Dashboard";
import {KeycloakInterface} from "../../datasource/KeycloakInterface";
import {useConfigContext} from "../../datasource/ConfigContext";

export const AverageSensorValues = ({
                                        averageSensorValuesConfig,
                                        setAverageSensorValuesConfig,
                                        onDataModificationConfirmed
                                    }: {
    averageSensorValuesConfig: ValueConfig[],
    setAverageSensorValuesConfig: (ValueConfig[]) => void,
    onDataModificationConfirmed: (Postprocessor) => void
}) => {
    const {homeSubMenu} = useAppState();
    const [averageMetrics, setAverageMetrics] = useState([]);
    const {homeApi}: { homeApi: HomeApi } = useApiContext();
    const {config} = useConfigContext();

    const fetchAverageMetrics = useCallback(() => {
        homeApi.getAverageSensorValues(KeycloakInterface.getUsername(), setAverageMetrics);
    }, [averageSensorValuesConfig, homeApi]);

    useEffect(() => {
        fetchAverageMetrics();
    }, [fetchAverageMetrics]);

    const handleAddSensor = useCallback(() => {
        onDataModificationConfirmed((sensorConfig: { sensorType: string, label: string }) => {
            const newValue = {
                id: crypto.randomUUID(),
                sensorType: sensorConfig.sensorType,
                label: sensorConfig.label
            };
            setAverageSensorValuesConfig([...averageSensorValuesConfig, newValue]);
        });
    }, [averageSensorValuesConfig, setAverageSensorValuesConfig]);

    const handleEditSensor = useCallback((id: string) => {
        onDataModificationConfirmed((sensorConfig: { sensorType: string, label: string }) => {
            const newConfig = averageSensorValuesConfig.map(value =>
                value.id === id ? {
                    ...value,
                    sensorType: sensorConfig.sensorType,
                    label: sensorConfig.label
                } : value
            );
            setAverageSensorValuesConfig(newConfig);
        });
    }, [averageSensorValuesConfig, setAverageSensorValuesConfig]);

    const handleDeleteSensor = useCallback((id: string) => {
        const newConfig = averageSensorValuesConfig.filter(value => value.id !== id);
        setAverageSensorValuesConfig(newConfig);
    }, [averageSensorValuesConfig, setAverageSensorValuesConfig]);

    const getDisplayName = (sensor: SensorValue): string => {
        const dataSource = config.dataSources[sensor.sensorType];
        if (!dataSource) return sensor.label;

        const labelInfo = dataSource.availableLabels.find(l => l.label === sensor.label);
        return `${dataSource.displayName} - ${labelInfo?.displayName || sensor.label}`;
    };

    return (
        <SensorValues
            title="Average sensor values"
            data={averageMetrics}
            handleEditSensor={handleEditSensor}
            handleDeleteSensor={handleDeleteSensor}
            handleAddSensor={handleAddSensor}
            isAddSensorButtonVisible={homeSubMenu === 'edit'}
            getDisplayName={getDisplayName}
        />
    );
};