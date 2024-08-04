import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {AddSensorButton} from "./AddSensorButton";
import {useAppState} from "../AppStateContext";
import {tryRenderEditBox} from "./TryRenderEditBox";
import {calculateTicks, formatTime, generateData} from "../data/DataSource";
import {useApiContext} from "../../datasource/ApiContext";

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

const ChartWrapper = styled.div`
    margin-bottom: 30px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
`;

const ChartTitle = styled.h3`
    color: white;
    margin-bottom: 10px;
    font-size: 18px;
`;

const TimeRangeSelector = styled.select`
    background-color: #1C1C21;
    color: white;
    border: 1px solid #555;
    padding: 5px;
    margin-bottom: 20px;
`;

export const Chart = ({ data, title, dataKey, stroke, domain, yAxisUnit, days, numTicks, onEdit, onDelete }) => {
    const { homeSubMenu } = useAppState();
    const [isHovered, setIsHovered] = useState(false);
    const ticks = calculateTicks(data, numTicks);

    const chartClassName = "chart-wrapper"
    const parentSelector = ".".concat(chartClassName)

    return <ChartWrapper
        className={chartClassName}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <ChartTitle>{title}</ChartTitle>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 25}}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333"/>
                <XAxis
                    dataKey="time"
                    stroke="#888"
                    tickFormatter={(time) => formatTime(time, days)}
                    domain={['auto', 'auto']}
                    scale="time"
                    type="number"
                    ticks={ticks}
                    label={{value: 'Time', position: 'insideBottom', offset: -21, fill: '#888'}}
                    tick={{dy: 15}}
                />
                <YAxis
                    stroke="#888"
                    domain={domain}
                    label={{value: yAxisUnit, position: 'insideLeft', offset: -15, fill: '#888'}}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    contentStyle={{backgroundColor: '#333', border: 'none'}}
                    labelStyle={{color: 'white'}}
                    itemStyle={{color: stroke}}
                    formatter={(value) => [`${value.toFixed(2)} ${yAxisUnit}`, '']}
                    labelFormatter={(time) => formatTime(time, days)}
                />
                <Line
                    type="monotone"
                    dataKey={dataKey}
                    stroke={stroke}
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
        {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete, parentSelector)}
    </ChartWrapper>;
};

const Charts = ({onAddChartButtonClicked, onEditChartButtonClicked, onDeleteButtonClicked}) => {
    const [timeRange, setTimeRange] = useState('oneLastDay');
    const [temperatureData, setTemperatureData] = useState([]);
    const [pressureData, setPressureData] = useState([]);
    const [flowData, setFlowData] = useState([]);
    const [days, setDays] = useState(1);
    const { homeSubMenu} = useAppState();
    const { homeApi } = useApiContext();


    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const [tempResponse, pressureResponse, flowResponse] = await Promise.all([
                    homeApi.chartDataGet({ sensorType: 'temperature', timeRange }),
                    homeApi.chartDataGet({ sensorType: 'pressure', timeRange }),
                    homeApi.chartDataGet({ sensorType: 'flow', timeRange })
                ]);

                setTemperatureData(tempResponse.data);
                setPressureData(pressureResponse.data);
                setFlowData(flowResponse.data);

                setDays(getDaysFromTimeRange(timeRange));
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchChartData();
    }, [timeRange, homeApi]);

    const getDaysFromTimeRange = (range) => {
        switch (range) {
            case 'oneLastDay': return 1;
            case 'twoLastDays': return 2;
            case 'threeLastDays': return 3;
            case 'fiveLastDays': return 5;
            case 'lastWeek': return 7;
            default: return 1;
        }
    };

    return (
        <ChartsContainer>
            <ChartsTitle>Realtime data charts</ChartsTitle>
            <TimeRangeSelector onChange={(e) => setTimeRange(e.target.value)} value={timeRange}>
                <option value="oneLastDay">One last day</option>
                <option value="twoLastDays">Two last days</option>
                <option value="threeLastDays">Three last days</option>
                <option value="fiveLastDays">Five last days</option>
                <option value="lastWeek">Last week</option>
            </TimeRangeSelector>
            <Chart
                data={temperatureData}
                title="Temperature before compressor"
                dataKey="value"
                stroke="#4fc3f7"
                domain={[5, 40]}
                yAxisUnit="K"
                days={days}
                numTicks={10} // Set the number of ticks you want to show
                onEdit={onEditChartButtonClicked}
                onDelete={onDeleteButtonClicked}
            />
            <Chart
                data={pressureData}
                title="Pressure after compressor"
                dataKey="value"
                stroke="#ff9800"
                domain={[2, 8]}
                yAxisUnit="MPa"
                days={days}
                numTicks={10} // Set the number of ticks you want to show
                onEdit={onEditChartButtonClicked}
                onDelete={onDeleteButtonClicked}
            />
            <Chart
                data={flowData}
                title="Flow rate"
                dataKey="value"
                stroke="#4caf50"
                domain={[0, 300]}
                yAxisUnit="m³/h"
                days={days}
                numTicks={10} // Set the number of ticks you want to show
                onEdit={onEditChartButtonClicked}
                onDelete={onDeleteButtonClicked}
            />
            {homeSubMenu === 'edit' && (
                <AddSensorButton onButtonClicked={onAddChartButtonClicked} />
            )}
        </ChartsContainer>
    );
};

export default Charts;
