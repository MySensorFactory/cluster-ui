import React, {useCallback, useEffect, useState} from 'react';
import {useAppState} from "../AppStateContext";
import {useApiContext} from "../../datasource/ApiContext";
import {SensorValues} from "./SensorValues";
import type {ValueConfig} from "../../datasource/HomeClient";
import {HomeApi, SensorValue} from "../../datasource/HomeClient";
import type {Postprocessor} from "./Dashboard";
import {KeycloakInterface} from "../../datasource/KeycloakInterface";

export const AverageSensorValues = ({
                                        averageSensorValuesConfig,
                                        setAverageSensorValuesConfig,
                                        onDataModificationConfirmed
                                    }:{
    averageSensorValuesConfig: ValueConfig[],
    setAverageSensorValuesConfig: (ValueConfig[]) => void,
    onDataModificationConfirmed: (Postprocessor) => void
}) => {
    const {homeSubMenu}: {homeSubMenu: string} = useAppState();
    const [averageMetrics: SensorValue[], setAverageMetrics: (SensorValue[]) => void] = useState([]);
    const {homeApi} : {homeApi: HomeApi}= useApiContext();

    const fetchAverageMetrics = useCallback(() => {
        homeApi.getAverageSensorValues(KeycloakInterface.getUsername(), setAverageMetrics);
    }, [averageSensorValuesConfig, homeApi]);

    useEffect(() => {
        fetchAverageMetrics();
    }, [fetchAverageMetrics]);

    const handleAddSensor = useCallback(() => {
        onDataModificationConfirmed((newSensor: ValueConfig) => {
            const newConfig: ValueConfig[] = averageSensorValuesConfig
            newConfig.push(newSensor)
            setAverageSensorValuesConfig(newConfig)
        });
    }, [averageSensorValuesConfig]);

    const handleEditSensor = useCallback((id: string) => {
        onDataModificationConfirmed((newSensorConfig: ValueConfig) => {
            const index = averageSensorValuesConfig.indexOf(averageSensorValuesConfig.find(s => s.id === id));
            if (index > -1) {
                const newConfig: ValueConfig[] = averageSensorValuesConfig
                newConfig[index] = newSensorConfig;
                setAverageSensorValuesConfig(newConfig);
            }
        })
    }, [averageSensorValuesConfig]);

    const handleDeleteSensor = useCallback((id: string) => {
        const index = averageSensorValuesConfig.indexOf(averageSensorValuesConfig.find(s => s.id === id));
        if (index > -1) {
            const newConfig: ValueConfig[] = averageSensorValuesConfig
            newConfig.splice(index, 1)
            setAverageSensorValuesConfig(newConfig);
        }
    }, [averageSensorValuesConfig]);

    return (
        <SensorValues
            title={"Average sensor values"}
            data={averageMetrics}
            handleEditSensor={handleEditSensor}
            handleDeleteSensor={handleDeleteSensor}
            handleAddSensor={handleAddSensor}
            isAddSensorButtonVisible={homeSubMenu === 'edit'}
        />
    );
};