import React, {useCallback, useEffect, useState} from 'react';
import {useAppState} from '../AppStateContext';
import {useApiContext} from "../../datasource/ApiContext";
import {SensorValues} from "./SensorValues";
import type {SensorValue, ValueConfig} from "../../datasource/HomeClient";
import type {Postprocessor} from "./Dashboard";
import {HomeApi} from "../../datasource/HomeClient";

export const CurrentSensorValues = ({sensorValuesConfig, setSensorValuesConfig, onDataModificationConfirmed}: {
    sensorValuesConfig: ValueConfig[],
    setSensorValuesConfig: (ValueConfig[]) => void,
    onDataModificationConfirmed: (Postprocessor) => void
}) => {
    const {homeSubMenu}: {homeSubMenu: string} = useAppState();
    const [currentSensorValues: SensorValue[], setCurrentSensorValues: (SensorValue[]) => void] = useState([]);
    const {homeApi} : {homeApi: HomeApi}= useApiContext();

    const fetchSensorValues = useCallback(() => {
        homeApi.getCurrentSensorValues('038833bf-9efb-40a2-945f-4b7ea29354d4', setCurrentSensorValues);
    }, [homeApi]);

    useEffect(() => {
        fetchSensorValues();
    }, [sensorValuesConfig, homeSubMenu]);

    const handleAddSensor = useCallback(() => {
        onDataModificationConfirmed((newSensor: ValueConfig) => {
            const newConfig: ValueConfig[] = sensorValuesConfig
            newConfig.push(newSensor)
            setSensorValuesConfig(newConfig)
        });
    }, [sensorValuesConfig]);

    const handleEditSensor = useCallback((id: string) => {
        onDataModificationConfirmed((newSensorConfig) => {
            const index = sensorValuesConfig.indexOf(sensorValuesConfig.find(s => s.id === id));
            if (index > -1) {
                const newConfig: ValueConfig[] = sensorValuesConfig
                newConfig[index] = newSensorConfig;
                setSensorValuesConfig(newConfig);
            }
        })
    }, [sensorValuesConfig]);

    const handleDeleteSensor = useCallback((id: string) => {
        const index = sensorValuesConfig.indexOf(sensorValuesConfig.find(s => s.id === id));
        if (index > -1) {
            const newConfig: ValueConfig[] = sensorValuesConfig
            newConfig.splice(index, 1)
            setSensorValuesConfig(newConfig);
        }
    }, [sensorValuesConfig]);


    return (
        <SensorValues
            title={"Current sensor values"}
            data={currentSensorValues}
            handleEditSensor={handleEditSensor}
            handleDeleteSensor={handleDeleteSensor}
            handleAddSensor={handleAddSensor}
            isAddSensorButtonVisible={homeSubMenu === 'edit'}
        />
    );
};
