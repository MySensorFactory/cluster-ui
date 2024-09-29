import React, {useCallback} from 'react';
import Typography from 'antd/es/typography/Typography'
import Select from 'antd/es/select';
import Space from 'antd/es/space'
import {AddButton} from '../controls/Buttons';
import {useAppState} from '../AppStateContext';
import {useConfigContext} from "../../datasource/ConfigContext";
import {TimeChart} from "../controls/TimeChart";
import type {SensorValue} from "../../datasource/HomeClient";
import {ChartConfig} from "../../datasource/HomeClient";

const {Title} = Typography;
const {Option} = Select;

export const Charts = ({
                           chartData,
                           chartConfigs,
                           setChartConfigs,
                           onDataModificationConfirmed,
                           timeRange,
                           setTimeRange
                       }: {
    chartData: Record<string, SensorValue[]>,
    chartConfigs: ChartConfig[],
    setChartConfigs: (ChartConfig[]) => void,
    onDataModificationConfirmed: (any) => void,
    timeRange: string,
    setTimeRange: (string) => void
}) => {

    const {config} = useConfigContext();
    const {homeSubMenu} = useAppState();

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
            {chartData && chartConfigs.map((c: ChartConfig) => {
                return <TimeChart
                    key={c.id}
                    data={chartData[c.id]}
                    sensorType={c.sensorType}
                    title={c.label}
                    days={config.timeRangeOptions.find((option) => option.value === timeRange).daysCount}
                    numTicks={10}
                    onEdit={() => handleEditChart(c.id)}
                    onDelete={() => handleDeleteChart(c.id)}
                />
            })}
            {homeSubMenu === 'edit' && <AddButton onButtonClicked={handleAddChart}/>}
        </Space>
    );
};