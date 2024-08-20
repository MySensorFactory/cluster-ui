import React, {useCallback, useEffect, useState} from 'react';
import {AddButton} from '../controls/Buttons';
import {useAppState} from '../AppStateContext';
import {useApiContext} from '../../datasource/ApiContext';
import {Chart} from "../controls/Chart";
import {Container, Select, Title} from "../styles/CommonStyles";

const TIME_RANGE_OPTIONS = [
    {value: 'oneLastDay', label: 'One last day', days: 1},
    {value: 'twoLastDays', label: 'Two last days', days: 2},
    {value: 'threeLastDays', label: 'Three last days', days: 3},
    {value: 'fiveLastDays', label: 'Five last days', days: 5},
    {value: 'lastWeek', label: 'Last week', days: 7},
];

export const Charts = ({chartConfigs, setChartConfigs, onDataModificationConfirmed}) => {
    const [timeRange, setTimeRange] = useState(TIME_RANGE_OPTIONS[0].value);
    const [chartData, setChartData] = useState({});
    const {homeSubMenu} = useAppState();
    const {homeApi} = useApiContext();

    const fetchChartsData = useCallback(() => {
        chartConfigs.forEach((config) => {
            homeApi.getChartData(config.sensorType, timeRange, (result) => {
                setChartData(prevData => ({...prevData, [config.id]: result}));
            });
        });
    }, [chartConfigs, timeRange]);

    useEffect(() => {
        fetchChartsData();
    }, [timeRange, chartConfigs]);

    const handleAddChart = useCallback(() => {
        onDataModificationConfirmed((newConfig) => {
            const newChartConfigs: Array = chartConfigs
            newChartConfigs.push(newConfig)
            setChartConfigs(newChartConfigs)
        });
    }, [chartConfigs]);

    const handleEditChart = useCallback((id) => {
        onDataModificationConfirmed((newChartConfig) => {
            const index = chartConfigs.indexOf(chartConfigs.find(s => s.id === id));
            if (index > -1) {
                const newChartConfigs: Array = chartConfigs
                newChartConfigs[index] = newChartConfig;
                setChartConfigs(newChartConfigs);
            }
        })
    }, [chartConfigs]);

    const handleDeleteChart = useCallback((id) => {
        const index = chartConfigs.indexOf(chartConfigs.find(s => s.id === id));
        if (index > -1) {
            const newChartConfigs: Array = chartConfigs
            newChartConfigs.splice(index, 1)
            setChartConfigs(newChartConfigs);
        }
    }, [chartConfigs]);

    const unitMap = {
        temperature: '°C',
        humidity: '%',
        pressure: 'hPa',
        flowRate: 'm3/s',
        windDirection: '°'
    }

    return (
        <Container>
            <Title>Realtime data charts</Title>
            <Select onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
                {TIME_RANGE_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </Select>
            {chartConfigs.map((config) => (
                <Chart
                    key={chartConfigs.indexOf(config)}
                    data={chartData[config.id] || []}
                    title={config.label}
                    dataKey="value"
                    stroke="#4fc3f7"
                    yAxisUnit={unitMap[config.sensorType]}
                    days={TIME_RANGE_OPTIONS.find(option => option.value === timeRange).days}
                    numTicks={10}
                    onEdit={() => handleEditChart(config.id)}
                    onDelete={() => handleDeleteChart(config.id)}
                />
            ))}
            {homeSubMenu === 'edit' && <AddButton onButtonClicked={handleAddChart}/>}
        </Container>
    );
};
