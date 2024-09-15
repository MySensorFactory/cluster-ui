import React, { useCallback, useEffect, useState } from 'react';
import { AddButton } from '../controls/Buttons';
import { useAppState } from '../AppStateContext';
import { useApiContext } from '../../datasource/ApiContext';
import { Container, Title } from "../styles/CommonStyles";
import {SingleSelect} from "../controls/Select";
import {TimeChart} from "../controls/TimeChart";
import {useConfigContext} from "../../datasource/ConfigContext";

export const Charts = ({
                           chartConfigs,
                           setChartConfigs,
                           onDataModificationConfirmed,
                       }) => {

    const {config} = useConfigContext();
    const [timeRange, setTimeRange] = useState(config.timeRangeOptions[0].value);
    const [chartData, setChartData] = useState({});
    const { homeSubMenu } = useAppState();
    const { homeApi } = useApiContext();


    const fetchChartsData = useCallback(() => {
        chartConfigs.forEach((config) => {
            homeApi.getChartData(config.sensorType, timeRange, (result) => {
                setChartData((prevData) => ({ ...prevData, [config.id]: result }));
            });
        });
    }, [chartConfigs, timeRange]);

    useEffect(() => {
        fetchChartsData();
    }, [timeRange, chartConfigs]);

    const handleAddChart = useCallback(() => {
        onDataModificationConfirmed((newConfig) => {
            const newChartConfigs: Array = chartConfigs;
            newChartConfigs.push(newConfig);
            setChartConfigs(newChartConfigs);
        });
    }, [chartConfigs]);

    const handleEditChart = useCallback((id) => {
        onDataModificationConfirmed((newChartConfig) => {
            const index = chartConfigs.indexOf(chartConfigs.find((s) => s.id === id));
            if (index > -1) {
                const newChartConfigs: Array = chartConfigs;
                newChartConfigs[index] = newChartConfig;
                setChartConfigs(newChartConfigs);
            }
        });
    }, [chartConfigs]);

    const handleDeleteChart = useCallback((id) => {
        const index = chartConfigs.indexOf(chartConfigs.find((s) => s.id === id));
        if (index > -1) {
            const newChartConfigs: Array = chartConfigs;
            newChartConfigs.splice(index, 1);
            setChartConfigs(newChartConfigs);
        }
    }, [chartConfigs]);

    const unitMap = {
        temperature: '°C',
        humidity: '%',
        pressure: 'hPa',
        flowRate: 'm3/s',
        windDirection: '°',
    };

    return (
        <Container>
            <Title>Realtime data charts</Title>
            <SingleSelect
                options={config.timeRangeOptions}
                value={timeRange}
                onChange={setTimeRange}
                placeholder="Select Time Range"
            />
            {chartConfigs.map((c) => (
                <TimeChart
                    key={chartConfigs.indexOf(c)}
                    data={chartData[c.id] || []}
                    title={c.label}
                    dataKey="value"
                    yAxisUnit={unitMap[c.sensorType]}
                    days={config.timeRangeOptions.find((option) => option.value === timeRange).days}
                    numTicks={10}
                    onEdit={() => handleEditChart(c.id)}
                    onDelete={() => handleDeleteChart(c.id)}
                />
            ))}
            {homeSubMenu === 'edit' && <AddButton onButtonClicked={handleAddChart} />}
        </Container>
    );
};