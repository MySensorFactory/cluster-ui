import React, {useCallback, useEffect, useState} from 'react';
import Typography from 'antd/es/typography/Typography'
import Select from 'antd/es/select';
import Space from 'antd/es/space'
import {AddButton} from '../controls/Buttons';
import {useAppState} from '../AppStateContext';
import {useApiContext} from '../../datasource/ApiContext';
import {useConfigContext} from "../../datasource/ConfigContext";
import {TimeChart} from "../controls/TimeChart";

const {Title} = Typography;
const {Option} = Select;

export const Charts = ({
                           chartConfigs,
                           setChartConfigs,
                           onDataModificationConfirmed,
                       }) => {
    const {config} = useConfigContext();
    const [timeRange, setTimeRange] = useState(config.timeRangeOptions[0].value);
    const [chartData, setChartData] = useState({});
    const {homeSubMenu} = useAppState();
    const {homeApi} = useApiContext();

    const fetchChartsData = useCallback(() => {
        chartConfigs.forEach((config) => {
            homeApi.getChartData(config.sensorType, timeRange, (result) => {
                setChartData((prevData) => ({...prevData, [config.id]: result}));
            });
        });
    }, [chartConfigs, timeRange, homeApi]);

    useEffect(() => {
        fetchChartsData();
    }, [fetchChartsData]);

    const handleAddChart = useCallback(() => {
        onDataModificationConfirmed((newConfig) => {
            const newChartConfigs = [...chartConfigs, newConfig];
            setChartConfigs(newChartConfigs);
        });
    }, [chartConfigs, onDataModificationConfirmed, setChartConfigs]);

    const handleEditChart = useCallback((id) => {
        onDataModificationConfirmed((newChartConfig) => {
            const newChartConfigs = chartConfigs.map(config =>
                config.id === id ? newChartConfig : config
            );
            setChartConfigs(newChartConfigs);
        });
    }, [chartConfigs, onDataModificationConfirmed, setChartConfigs]);

    const handleDeleteChart = useCallback((id) => {
        const newChartConfigs = chartConfigs.filter(config => config.id !== id);
        setChartConfigs(newChartConfigs);
    }, [chartConfigs, setChartConfigs]);

    return (
        <Space direction="vertical" size="large" style={{width: '100%'}}>
            <Title level={3}>Realtime data charts</Title>
            <Select
                style={{width: 200}}
                value={timeRange}
                onChange={setTimeRange}
                placeholder="Select Time Range"
            >
                {config.timeRangeOptions.map(option => (
                    <Option key={option.value} value={option.value}>{option.label}</Option>
                ))}
            </Select>
            {chartConfigs.map((c) => (
                <TimeChart
                    key={c.id}
                    data={chartData[c.id] || []}
                    title={c.label}
                    dataKey="value"
                    yAxisUnit={config.unitMapping[c.sensorType]}
                    days={config.timeRangeOptions.find((option) => option.value === timeRange).days}
                    numTicks={10}
                    onEdit={() => handleEditChart(c.id)}
                    onDelete={() => handleDeleteChart(c.id)}
                />
            ))}
            {homeSubMenu === 'edit' && <AddButton onButtonClicked={handleAddChart}/>}
        </Space>
    );
};