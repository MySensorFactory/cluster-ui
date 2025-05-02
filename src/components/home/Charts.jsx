import React, {useCallback} from 'react';
import Typography from 'antd/es/typography/Typography'
import Select from 'antd/es/select';
import Space from 'antd/es/space'
import {AddButton} from '../controls/Buttons';
import {useAppState} from '../AppStateContext';
import {useConfigContext} from "../../datasource/ConfigContext";
import {TimeChart} from "../controls/TimeChart";
import {ChartConfig} from "../../datasource/HomeClient";
import {Postprocessor} from "./Dashboard";

const {Title} = Typography;
const {Option} = Select;

export const Charts = ({
                           chartData,
                           chartConfigs,
                           setChartConfigs,
                           onDataModificationConfirmed,
                           timeRange,
                           setTimeRange
                       }) => {
    const {config} = useConfigContext();
    const {homeSubMenu} = useAppState();

    const handleAddChart = useCallback(() => {
        onDataModificationConfirmed((sensorConfig) => {
            const newChartConfigs = [...chartConfigs, {
                id: crypto.randomUUID(),
                sensorType: sensorConfig.sensorType,
                label: sensorConfig.label
            }];
            setChartConfigs(newChartConfigs);
        });
    }, [chartConfigs, onDataModificationConfirmed, setChartConfigs]);

    const handleEditChart = useCallback((id) => {
        onDataModificationConfirmed((sensorConfig) => {
            const newChartConfigs = chartConfigs.map(config =>
                config.id === id ? {
                    ...config,
                    sensorType: sensorConfig.sensorType,
                    label: sensorConfig.label
                } : config
            );
            setChartConfigs(newChartConfigs);
        });
    }, [chartConfigs, onDataModificationConfirmed, setChartConfigs]);

    const handleDeleteChart = useCallback((id) => {
        const newChartConfigs = chartConfigs.filter(config => config.id !== id);
        setChartConfigs(newChartConfigs);
    }, [chartConfigs, setChartConfigs]);

    const getDisplayName = (chartConfig) => {
        const dataSource = config.dataSources[chartConfig.sensorType];
        if (!dataSource) {
            return chartConfig.sensorType;
        }

        const labelInfo = dataSource.availableLabels.find(l => l.label === chartConfig.label);
        return `${dataSource.displayName} - ${labelInfo?.displayName || chartConfig.label}`;
    };

    return (
        <Space direction="vertical" size="large" style={{width: '100%'}}>
            <Title level={3}>Realtime data charts</Title>
            <Space direction="horizontal" size="large">
                <Select
                    style={{width: 200}}
                    value={timeRange}
                    onChange={setTimeRange}
                    placeholder="Select Time Range"
                >
                    {config.timeRangeOptions.map((option) => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                </Select>
                <Select
                    style={{width: 200}}
                    value={timeRange}
                    onChange={setTimeRange}
                    placeholder="Select Time Range For Prediction"
                >
                    {config.timeRangeOptions.map((option) => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                </Select>
            </Space>
            {chartData && chartConfigs.map((c) => {
                return <TimeChart
                    key={c.id}
                    data={chartData[c.id]}
                    sensorType={c.sensorType}
                    title={getDisplayName(c)}
                    days={config.timeRangeOptions.find((option) =>
                        option.value === timeRange).daysCount}
                    numTicks={10}
                    onEdit={() => handleEditChart(c.id)}
                    onDelete={() => handleDeleteChart(c.id)}
                    realtime={true}
                />
            })}
            {homeSubMenu === 'edit' && <AddButton onButtonClicked={handleAddChart}/>}
        </Space>
    );
};