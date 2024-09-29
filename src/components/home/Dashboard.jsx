import React, {useCallback, useEffect, useState} from 'react';
import Layout from 'antd/es/layout';
import {Header} from './Header';
import {Events} from './Events';
import {CurrentSensorValues} from './CurrentSensorValues';
import {AverageSensorValues} from './AverageSensorValues';
import {Charts} from "./Charts";
import {UpsertSensorPopup} from './UpsertSensorPopup';
import {useApiContext} from "../../datasource/ApiContext";
import {theme} from "../styles/theme";
import {ChartConfig, DashboardConfig} from "../../datasource/HomeClient";
import type {SensorValue} from "../../datasource/HomeClient";
import {useConfigContext} from "../../datasource/ConfigContext";

const {Content} = Layout;

export const Dashboard = () => {
    const [isUpsertPopupActive, setIsUpsertPopupActive] = useState(false);
    const [postprocessor, setPostprocessor] = useState((_) => {})
    const [isReadyToShowCharts, setIsReadyToShowCharts] = useState(false)
    const [dashboardConfig: DashboardConfig, setDashboardConfig] = useState(null)
    const [chartData: Record<string, SensorValue[]>, setChartData] = useState({});
    const {homeApi} = useApiContext();
    const {config} = useConfigContext();
    const [timeRange: string, setTimeRange] = useState(config.timeRangeOptions[0].value);

    const fetchDashboardConfig = () => {
        homeApi.getDashboardConfig('038833bf-9efb-40a2-945f-4b7ea29354d4', setDashboardConfig);
    }

    useEffect(() => {
        fetchDashboardConfig();
    }, [homeApi]);

    const fetchChartsData = useCallback(() => {
        if (dashboardConfig == null) {
            return;
        }
        homeApi.getChartData(dashboardConfig.chartConfigs.map(c => c.id), timeRange, (result) => {
            setChartData(result);
            setIsReadyToShowCharts(true);
        });
    }, [dashboardConfig, timeRange, homeApi]);

    useEffect(() => {
        fetchChartsData();
    }, [dashboardConfig]);

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

    const setChartConfigs = (newChartConfigs: ChartConfig[]) => {
        setIsReadyToShowCharts(false);
        const newConfig = structuredClone(dashboardConfig);
        newConfig.chartConfigs = newChartConfigs
        homeApi.updateDashboardConfig('038833bf-9efb-40a2-945f-4b7ea29354d4', newConfig, (updatedDashboardConfig) => {
            setDashboardConfig(updatedDashboardConfig)
        })
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
        dashboardConfig && (
            <Layout style={{minHeight: '100vh', background: theme.colors.background, marginBottom: theme.sizes.marginBottom.xLarge}}>
                <Content style={{padding: theme.sizes.padding.xLarge, filter: isUpsertPopupActive ? 'blur(5px)' : 'none'}}>
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
                    {isReadyToShowCharts && <Charts
                        chartData={chartData}
                        chartConfigs={dashboardConfig.chartConfigs}
                        setChartConfigs={setChartConfigs}
                        onDataModificationConfirmed={activateUpsertPopup}
                        timeRange={timeRange}
                        setTimeRange={setTimeRange}
                    />}
                    </Content>
                {isUpsertPopupActive && (
                    <UpsertSensorPopup
                        onPopupClose={handleClosePopup}
                        onSaveButtonClicked={handleOnSaveButtonClicked}
                    />)}
            </Layout>)
    );
};