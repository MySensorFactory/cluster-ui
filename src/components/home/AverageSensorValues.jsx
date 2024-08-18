import React, {useCallback, useEffect, useState} from 'react';
import {useAppState} from "../AppStateContext";
import {useApiContext} from "../../datasource/ApiContext";
import {SensorValues} from "./SensorValues";

export const AverageSensorValues = ({
                                        averageSensorValuesConfig,
                                        setAverageSensorValuesConfig,
                                        onDataModificationConfirmed
                                    }) => {
    const {homeSubMenu} = useAppState();
    const [averageMetrics, setAverageMetrics] = useState([]);
    const {homeApi} = useApiContext();

    const fetchAverageMetrics = useCallback(() => {
        homeApi.getAverageSensorValues('038833bf-9efb-40a2-945f-4b7ea29354d4', setAverageMetrics);
    }, [averageMetrics]);

    useEffect(() => {
        fetchAverageMetrics();
    }, [fetchAverageMetrics]);

    const handleAddSensor = useCallback(() => {
        onDataModificationConfirmed((newSensor) => {
            const newConfig: Array = averageSensorValuesConfig
            newConfig.push(newSensor)
            setAverageSensorValuesConfig(newConfig)
        });
    }, [averageSensorValuesConfig]);

    const handleEditSensor = useCallback((id) => {
        onDataModificationConfirmed((newSensorConfig) => {
            const index = averageSensorValuesConfig.indexOf(averageSensorValuesConfig.find(s => s.id === id));
            if (index > -1) {
                const newConfig: Array = averageSensorValuesConfig
                newConfig[index] = newSensorConfig;
                setAverageSensorValuesConfig(newConfig);
            }
        })
    }, [averageSensorValuesConfig]);

    const handleDeleteSensor = useCallback((id) => {
        const index = averageSensorValuesConfig.indexOf(averageSensorValuesConfig.find(s => s.id === id));
        if (index > -1) {
            const newConfig: Array = averageSensorValuesConfig
            newConfig.splice(index, 1)
            setAverageSensorValuesConfig(newConfig);
        }
    }, [averageSensorValuesConfig]);

    return (<SensorValues
        title={"Average sensor values"}
        data={averageMetrics}
        handleEditSensor={handleEditSensor}
        handleDeleteSensor={handleDeleteSensor}
        handleAddSensor={handleAddSensor}
        isAddSensorButtonVisible={homeSubMenu === 'edit'}
    />);
};