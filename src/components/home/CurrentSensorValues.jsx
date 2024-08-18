import React, {useCallback, useEffect, useState} from 'react';
import {useAppState} from '../AppStateContext';
import {useApiContext} from "../../datasource/ApiContext";
import {SensorValues} from "./SensorValues";

export const CurrentSensorValues = ({sensorValuesConfig, setSensorValuesConfig, onDataModificationConfirmed}) => {
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


    return (<SensorValues
        title={"Current sensor values"}
        data={currentSensorValues}
        handleEditSensor={handleEditSensor}
        handleDeleteSensor={handleDeleteSensor}
        handleAddSensor={handleAddSensor}
        isAddSensorButtonVisible={homeSubMenu === 'edit'}
    />);
};
