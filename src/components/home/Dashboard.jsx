import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import Header from './Header';
import Events from './Events';
import {CurrentSensorValues} from './CurrentSensorValues';
import {AverageSensorValues} from './AverageSensorValues';
import {Charts} from "./Charts";
import UpsertSensorPopup from './UpsertSensorPopup';
import {useApiContext} from "../../datasource/ApiContext";

const DashboardContainer = styled.div`
    padding: 20px;
    background-color: #1C1C21;
    padding-bottom: 150px;
    color: white;
    min-height: 100vh;
    filter: ${props => props.isBlurred ? 'blur(5px)' : 'none'};
    transition: filter 0.3s ease;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

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
            <DashboardContainer isBlurred={isUpsertPopupActive}>
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
            </DashboardContainer>
            {isUpsertPopupActive && (
                <>
                    <Overlay onClick={handleClosePopup}/>
                    <UpsertSensorPopup
                        onPopupClose={handleClosePopup}
                        onSaveButtonClicked={handleOnSaveButtonClicked}
                    />
                </>
            )}
        </>
    );
};

export default Dashboard;