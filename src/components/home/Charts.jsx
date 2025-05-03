import React, {useCallback, useEffect, useState} from 'react';
import Typography from 'antd/es/typography/Typography'
import Select from 'antd/es/select';
import Space from 'antd/es/space'
import Divider from 'antd/es/divider';
import {AddButton} from '../controls/Buttons';
import {useAppState} from '../AppStateContext';
import {useConfigContext} from "../../datasource/ConfigContext";
import {TimeChart} from "../controls/TimeChart";
import {ChartConfig} from "../../datasource/HomeClient";
import {Postprocessor} from "./Dashboard";
import {useApiContext} from "../../datasource/ApiContext";
import {theme} from "../styles/theme";

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
    const {homeApi} = useApiContext();
    
    // State for prediction time range and data
    const [predictionTimeRange, setPredictionTimeRange] = useState('1d');
    const [predictedData, setPredictedData] = useState({});
    const [historicalPredictions, setHistoricalPredictions] = useState({});

    // Fetch historical predictions for comparison with actual data
    useEffect(() => {
        if (chartConfigs.length > 0 && chartData && Object.keys(chartData).length > 0) {
            const chartConfigIds = chartConfigs.map(c => c.id);
            
            // Call API for historical predictions using the same timeRange as actual data
            homeApi.getPredictions(chartConfigIds, timeRange, (data) => {
                setHistoricalPredictions(data);
            }, (error) => {
                console.error("Error fetching historical predictions:", error);
            });
        }
    }, [chartConfigs, timeRange, chartData, homeApi]);

    // Fetch future predictions whenever the prediction time range changes
    useEffect(() => {
        if (chartConfigs.length > 0) {
            const chartConfigIds = chartConfigs.map(c => c.id);
            
            // Call API for future predictions using the prediction timeRange
            homeApi.getPredictions(chartConfigIds, predictionTimeRange, (data) => {
                setPredictedData(data);
            }, (error) => {
                console.error("Error fetching predicted data:", error);
            });
        }
    }, [chartConfigs, predictionTimeRange, homeApi]);
    
    // Convert data to series format for TimeChart
    const prepareComparisonChartSeries = (chartId) => {
        const series = [];
        const dataValues = chartData[chartId];
        const historicalValues = historicalPredictions[chartId];
        
        if (!dataValues) return [];
        
        // Extract data keys
        const dataKeys = dataValues.length > 0 ? Object.keys(dataValues[0].values) : [];
        
        dataKeys.forEach(dataKey => {
            // Actual data series
            series.push({
                name: `Actual ${dataKey}`,
                dataKeys: { [dataKey]: true },
                color: theme.colors.chartStroke,
                data: dataValues.map(item => ({
                    x: item.timestamp,
                    y: item.values[dataKey],
                    dataKey
                }))
            });
            
            // Historical prediction series if available
            if (historicalValues) {
                series.push({
                    name: `Historical Prediction ${dataKey}`,
                    dataKeys: { [dataKey]: true },
                    dashArray: 5,
                    color: theme.colors.historicalPredictionColor || '#FFC107',
                    data: historicalValues.map(item => ({
                        x: item.timestamp,
                        y: item.values[dataKey],
                        dataKey
                    }))
                });
            }
        });
        
        return series;
    };
    
    const prepareFuturePredictionSeries = (chartId) => {
        const series = [];
        const futurePredictions = predictedData[chartId];
        
        if (!futurePredictions) return [];
        
        // Extract data keys
        const dataKeys = futurePredictions.length > 0 ? Object.keys(futurePredictions[0].values) : [];
        
        dataKeys.forEach(dataKey => {
            // Future prediction series
            series.push({
                name: `Predicted ${dataKey}`,
                dataKeys: { [dataKey]: true },
                color: theme.colors.predictedDataColor || '#FF9800',
                data: futurePredictions.map(item => ({
                    x: item.timestamp,
                    y: item.values[dataKey],
                    dataKey
                }))
            });
        });
        
        return series;
    };
    
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
                    value={predictionTimeRange}
                    onChange={setPredictionTimeRange}
                    placeholder="Select Time Range For Prediction"
                >
                    {config.timeRangeOptions.map((option) => (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                    ))}
                </Select>
            </Space>
            
            {/* Display charts in pairs - historical comparison followed by future prediction */}
            {chartData && 
             chartConfigs.map((c, index) => (
                <React.Fragment key={`chart-group-${c.id}`}>
                    {/* Add a divider between sensor groups */}
                    {index > 0 && (
                        <Divider style={{ margin: '32px 0', borderColor: theme.colors.border }} />
                    )}
                    
                    <div style={{ background: theme.colors.secondary, padding: '16px', borderRadius: '8px' }}>
                        <Title level={4} style={{ marginTop: 0 }}>{getDisplayName(c)}</Title>
                        
                        {/* Historical comparison chart */}
                        <TimeChart
                            key={`historical-${c.id}`}
                            series={prepareComparisonChartSeries(c.id)}
                            sensorType={c.sensorType}
                            title="Actual vs. Predicted Comparison"
                            days={config.timeRangeOptions.find((option) =>
                                option.value === timeRange).daysCount}
                            onEdit={() => handleEditChart(c.id)}
                            onDelete={() => handleDeleteChart(c.id)}
                        />
                        
                        {/* Subtle divider between the two charts */}
                        <Divider style={{ margin: '12px 0', borderStyle: 'dashed', borderColor: theme.colors.border }} />
                        
                        {/* Future prediction chart - only if we have prediction data */}
                        {predictedData[c.id] && (
                            <TimeChart
                                key={`future-${c.id}`}
                                series={prepareFuturePredictionSeries(c.id)}
                                sensorType={c.sensorType}
                                title="Future Predictions"
                                days={config.timeRangeOptions.find((option) =>
                                    option.value === predictionTimeRange).daysCount}
                                showAnnotations={true}
                                onEdit={() => handleEditChart(c.id)}
                                onDelete={() => handleDeleteChart(c.id)}
                            />
                        )}
                    </div>
                </React.Fragment>
            ))}
            
            {homeSubMenu === 'edit' && <AddButton onButtonClicked={handleAddChart}/>}
        </Space>
    );
};