import {useAppState} from "../AppStateContext";
import {useApiContext} from "../../datasource/ApiContext";
import {useConfigContext} from "../../datasource/ConfigContext";
import type {Postprocessor} from "./Dashboard";
import type {ValueConfig} from "../../datasource/HomeClient";
import {useCallback, useEffect, useState} from "react";
import {KeycloakInterface} from "../../datasource/KeycloakInterface";
import {SensorValues} from "./SensorValues";
import {SensorValue} from "../../datasource/HomeClient";

export const CurrentSensorValues = ({sensorValuesConfig, setSensorValuesConfig, onDataModificationConfirmed}: {
    sensorValuesConfig: ValueConfig[],
    setSensorValuesConfig: (ValueConfig[]) => void,
    onDataModificationConfirmed: (Postprocessor) => void
}) => {
    const {homeSubMenu} = useAppState();
    const [currentSensorValues, setCurrentSensorValues] = useState([]);
    const {homeApi} = useApiContext();
    const {config} = useConfigContext();

    const fetchSensorValues = useCallback(() => {
        homeApi.getCurrentSensorValues(KeycloakInterface.getUsername(), setCurrentSensorValues);
    }, [homeApi]);

    useEffect(() => {
        fetchSensorValues();
    }, [sensorValuesConfig, homeSubMenu]);

    const handleAddSensor = useCallback(() => {
        onDataModificationConfirmed((sensorConfig: { sensorType: string, label: string }) => {
            const newValue = {
                id: crypto.randomUUID(),
                sensorType: sensorConfig.sensorType,
                label: sensorConfig.label
            };
            setSensorValuesConfig([...sensorValuesConfig, newValue]);
        });
    }, [sensorValuesConfig, setSensorValuesConfig]);

    const handleEditSensor = useCallback((id: string) => {
        onDataModificationConfirmed((sensorConfig: { sensorType: string, label: string }) => {
            const newConfig = sensorValuesConfig.map(value =>
                value.id === id ? {
                    ...value,
                    sensorType: sensorConfig.sensorType,
                    label: sensorConfig.label
                } : value
            );
            setSensorValuesConfig(newConfig);
        });
    }, [sensorValuesConfig, setSensorValuesConfig]);

    const handleDeleteSensor = useCallback((id: string) => {
        const newConfig = sensorValuesConfig.filter(value => value.id !== id);
        setSensorValuesConfig(newConfig);
    }, [sensorValuesConfig, setSensorValuesConfig]);

    const getDisplayName = (sensor: SensorValue): string => {
        const dataSource = config.dataSources[sensor.sensorType];
        if (!dataSource) return sensor.label;

        const labelInfo = dataSource.availableLabels.find(l => l.label === sensor.label);
        return `${dataSource.displayName} - ${labelInfo?.displayName || sensor.label}`;
    };

    return (
        <SensorValues
            title="Current sensor values"
            data={currentSensorValues}
            handleEditSensor={handleEditSensor}
            handleDeleteSensor={handleDeleteSensor}
            handleAddSensor={handleAddSensor}
            isAddSensorButtonVisible={homeSubMenu === 'edit'}
            getDisplayName={getDisplayName}
        />
    );
};