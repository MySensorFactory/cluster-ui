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
import {ChartConfig, DashboardConfig, HomeApi, ValueConfig} from "../../datasource/HomeClient";
import type {SensorValue} from "../../datasource/HomeClient";
import {useConfigContext} from "../../datasource/ConfigContext";
import type {Config} from "../../datasource/ConfigClient";
import {KeycloakInterface} from "../../datasource/KeycloakInterface";

const {Content} = Layout;

export type PostprocessorInput = {
    label: string;
    sensorType: string;
};

export type Postprocessor = (PostprocessorInput) => void;

export const Dashboard = () => {
    const [isUpsertPopupActive: boolean, setIsUpsertPopupActive: (boolean) => void] = useState(false);
    const [postprocessor: Postprocessor, setPostprocessor: (Postprocessor) => void] = useState((_) => {
    })
    const [isReadyToShowCharts: boolean, setIsReadyToShowCharts: (boolean) => void] = useState(false)
    const [dashboardConfig: DashboardConfig, setDashboardConfig: (DashboardConfig) => void] = useState(null)
    const [chartData: Record<string, SensorValue[]>, setChartData: (Record<string, SensorValue[]>) => void] = useState({});
    const {homeApi}: { homeApi: HomeApi } = useApiContext();
    const {config}: { config: Config } = useConfigContext();
    const [timeRange: string, setTimeRange: (string) => void] = useState(config.timeRangeOptions[0].value);

    const fetchDashboardConfig = () => {
        homeApi.getDashboardConfig( KeycloakInterface.getUsername(), setDashboardConfig);
    }

    useEffect(() => {
        fetchDashboardConfig();
    }, [homeApi]);

    const fetchChartsData = useCallback(() => {
        if (dashboardConfig == null) {
            return;
        }
        homeApi.getChartData(dashboardConfig.chartConfigs.map((c: ChartConfig): string => c.id), timeRange,
            (result: Record<string, SensorValue[]>) => {
                setChartData(result);
                setIsReadyToShowCharts(true);
            });
    }, [dashboardConfig, timeRange, homeApi]);

    useEffect(() => {
        fetchChartsData();
    }, [dashboardConfig]);

    const activateUpsertPopup = (postprocessor: Postprocessor) => {
        setPostprocessor(() => postprocessor)
        setIsUpsertPopupActive(true);
    };

    const handleClosePopup = () => {
        setIsUpsertPopupActive(false);
    };

    const handleOnSaveButtonClicked = (data: { label: string, sensorType: string }) => {
        postprocessor(data)
        handleClosePopup()
    }

    const setChartConfigs = (newChartConfigs: ChartConfig[]) => {
        setIsReadyToShowCharts(false);
        const newConfig = structuredClone(dashboardConfig);
        newConfig.chartConfigs = newChartConfigs
        homeApi.updateDashboardConfig(KeycloakInterface.getUsername(), newConfig, (updatedDashboardConfig: DashboardConfig) => {
            setDashboardConfig(updatedDashboardConfig)
        })
    }

    const setCurrentSensorValuesConfig = (newCurrentSensorValuesConfig: ValueConfig[]) => {
        const newConfig = dashboardConfig
        newConfig.currentSensorValuesConfig = newCurrentSensorValuesConfig
        homeApi.updateDashboardConfig(KeycloakInterface.getUsername(), newConfig, (_) => {
            fetchDashboardConfig()
        })
    }

    const setAverageSensorValuesConfig = (newAverageSensorValuesConfig: ValueConfig[]) => {
        const newConfig = dashboardConfig
        newConfig.averageSensorValuesConfig = newAverageSensorValuesConfig
        homeApi.updateDashboardConfig(KeycloakInterface.getUsername(), newConfig, (_) => {
            fetchDashboardConfig()
        })
    }

    return (
        dashboardConfig && (
            <Layout style={{
                minHeight: '100vh',
                background: theme.colors.background,
                marginBottom: theme.sizes.marginBottom.xLarge
            }}>
                <Content
                    style={{padding: theme.sizes.padding.xLarge, filter: isUpsertPopupActive ? 'blur(5px)' : 'none'}}>
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