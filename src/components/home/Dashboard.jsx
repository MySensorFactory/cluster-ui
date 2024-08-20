import React, {useEffect, useState} from 'react';
import {Header} from './Header';
import {Events} from './Events';
import {CurrentSensorValues} from './CurrentSensorValues';
import {AverageSensorValues} from './AverageSensorValues';
import {Charts} from "./Charts";
import UpsertSensorPopup from './UpsertSensorPopup';
import {useApiContext} from "../../datasource/ApiContext";
import {Container, Overlay} from "../styles/CommonStyles";

const Dashboard = () => {
    const [isUpsertPopupActive, setIsUpsertPopupActive] = useState(false);
    const [postprocessor, setPostprocessor] = useState((_) => {
    })
    const [dashboardConfig, setDashboardConfig] = useState(null)
    const {homeApi} = useApiContext();

    const fetchDashboardConfig = () => {
        homeApi.getDashboardConfig('038833bf-9efb-40a2-945f-4b7ea29354d4', setDashboardConfig);
    }

    useEffect(() => {
        fetchDashboardConfig();
    }, [homeApi]);

    const activateUpsertPopup = (postprocessor) => {
        setPostprocessor(() => postprocessor)
        setIsUpsertPopupActive(true);
    };

    const handleClosePopup = () => {
        setIsUpsertPopupActive(false);
    };

    const handleOnSaveButtonClicked = (data) => {
        postprocessor(data)
        handleClosePopup()
    }

    const setChartConfigs = (newChartConfigs) => {
        const newConfig = dashboardConfig
        newConfig.chartConfigs = newChartConfigs
        homeApi.updateDashboardConfig('038833bf-9efb-40a2-945f-4b7ea29354d4', newConfig, (updatedDashboardConfig) => {
            setDashboardConfig(updatedDashboardConfig)
        })
        fetchDashboardConfig()
    }

    const setCurrentSensorValuesConfig = (newCurrentSensorValuesConfig) => {
        const newConfig = dashboardConfig
        newConfig.currentSensorValuesConfig = newCurrentSensorValuesConfig
        homeApi.updateDashboardConfig('038833bf-9efb-40a2-945f-4b7ea29354d4', newConfig, (_) => {
            fetchDashboardConfig()
        })
    }

    const setAverageSensorValuesConfig = (newAverageSensorValuesConfig) => {
        const newConfig = dashboardConfig
        newConfig.averageSensorValuesConfig = newAverageSensorValuesConfig
        homeApi.updateDashboardConfig('038833bf-9efb-40a2-945f-4b7ea29354d4', newConfig, (_) => {
            fetchDashboardConfig()
        })
    }

    return (
        dashboardConfig != null &&
        <>
            <Container
                isInfinitelyHigh={true}
                isBlurEnabled={isUpsertPopupActive}
            >
                <Header/>
                <Events/>
                <CurrentSensorValues
                    sensorValuesConfig={dashboardConfig.currentSensorValuesConfig}
                    setSensorValuesConfig={setCurrentSensorValuesConfig}
                    onDataModificationConfirmed={activateUpsertPopup}
                />
                <AverageSensorValues
                    averageSensorValuesConfig={dashboardConfig.averageSensorValuesConfig}
                    setAverageSensorValuesConfig={setAverageSensorValuesConfig}
                    onDataModificationConfirmed={activateUpsertPopup}
                />
                <Charts
                    chartConfigs={dashboardConfig.chartConfigs}
                    setChartConfigs={setChartConfigs}
                    onDataModificationConfirmed={activateUpsertPopup}
                />
            </Container>
            {
                isUpsertPopupActive && (
                    <>
                        <Overlay onClick={handleClosePopup}/>
                        <UpsertSensorPopup
                            onPopupClose={handleClosePopup}
                            onSaveButtonClicked={handleOnSaveButtonClicked}
                        />
                    </>
                )
            }
        </>
    )
        ;
};

export default Dashboard;