import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { AddSensorButton } from './AddSensorButton';
import { useAppState } from '../AppStateContext';
import { useApiContext } from '../../datasource/ApiContext';
import {Chart} from "../controls/Chart";

const ChartsContainer = styled.div`
    background-color: #1C1C21;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
`;

const ChartsTitle = styled.h2`
    color: white;
    margin-bottom: 20px;
    font-size: 24px;
`;

const TimeRangeSelector = styled.select`
    background-color: #1C1C21;
    color: white;
    border: 1px solid #555;
    padding: 5px;
    margin-bottom: 20px;
`;

const TIME_RANGE_OPTIONS = [
    { value: 'oneLastDay', label: 'One last day', days: 1 },
    { value: 'twoLastDays', label: 'Two last days', days: 2 },
    { value: 'threeLastDays', label: 'Three last days', days: 3 },
    { value: 'fiveLastDays', label: 'Five last days', days: 5 },
    { value: 'lastWeek', label: 'Last week', days: 7 },
];

const Charts = ({ onDataModificationConfirmed }) => {
    const [timeRange, setTimeRange] = useState(TIME_RANGE_OPTIONS[0].value);
    const [chartConfigs, setChartConfigs] = useState([]);
    const [chartData, setChartData] = useState({});
    const { homeSubMenu } = useAppState();
    const { homeApi } = useApiContext();

    const fetchChartsData = useCallback(() => {
        chartConfigs.forEach((config) => {
            homeApi.getChartData(config.sensorType, timeRange, (result) => {
                setChartData(prevData => ({ ...prevData, [config.id]: result }));
            });
        });
    }, [chartConfigs, timeRange, homeApi]);

    useEffect(() => {
        homeApi.getChartConfigs(setChartConfigs);
    }, [homeApi]);

    useEffect(() => {
        fetchChartsData();
    }, [fetchChartsData]);

    const handleAddChart = useCallback(() => {
        onDataModificationConfirmed((config) => {
            homeApi.addChartConfig(config, (addedChart) => {
                setChartConfigs(prevConfigs => [...prevConfigs, addedChart]);
            });
        });
    }, [homeApi, onDataModificationConfirmed]);

    const handleEditChart = useCallback((id, updatedChart) => {
        homeApi.updateChartConfig(id, updatedChart, (updatedChart) => {
            setChartConfigs(prevConfigs =>
                prevConfigs.map(config => config.id === id ? updatedChart : config)
            );
        });
    }, [homeApi]);

    const handleDeleteChart = useCallback((id) => {
        homeApi.deleteChartConfig(id, () => {
            setChartConfigs(prevConfigs => prevConfigs.filter(config => config.id !== id));
            setChartData(({ [id]: _, ...rest }) => rest);
        });
    }, [homeApi]);

    return (
        <ChartsContainer>
            <ChartsTitle>Realtime data charts</ChartsTitle>
            <TimeRangeSelector onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
                {TIME_RANGE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </TimeRangeSelector>
            {chartConfigs.map((config) => (
                <Chart
                    key={config.id}
                    data={chartData[config.id] || []}
                    title={config.title}
                    dataKey="value"
                    stroke="#4fc3f7"
                    domain={[config.minDomain, config.maxDomain]}
                    yAxisUnit={config.unit}
                    days={TIME_RANGE_OPTIONS.find(option => option.value === timeRange).days}
                    numTicks={10}
                    onEdit={() => handleEditChart(config.id, config)}
                    onDelete={() => handleDeleteChart(config.id)}
                />
            ))}
            {homeSubMenu === 'edit' && <AddSensorButton onButtonClicked={handleAddChart} />}
        </ChartsContainer>
    );
};

export default Charts;