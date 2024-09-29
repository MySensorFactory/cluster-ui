import React, {useState} from "react";
import Typography from 'antd/es/typography/Typography';
import Card from 'antd/es/card/Card'
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useAppState} from "../AppStateContext";
import {calculateTicks, formatTime} from "../data/DataSource";
import {theme} from "../styles/theme";
import {tryRenderEditBox} from "./TryRenderEditBox";
import type {SensorData} from "../../datasource/ReportsClient";
import {useConfigContext} from "../../datasource/ConfigContext";

const {Title} = Typography;

const LineTimedChart = ({
                            data,
                            yAxisUnit,
                            days,
                            ticks,
                            dataKey
                        }: {
    data: SensorData[],
    yAxisUnit: string,
    days: number,
    ticks: number,
    dataKey: string,
}) =>
    (
        <ResponsiveContainer width="100%" height={300}>
            <Title level={5} style={{
                color: theme.colors.textMuted,
                marginTop: theme.sizes.marginBottom.small,
                marginLeft: theme.sizes.marginLeft.large
            }}>
                {dataKey}
            </Title>
            <LineChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 25}}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.secondaryHover}/>
                <XAxis
                    dataKey="timestamp"
                    stroke={theme.colors.textMuted}
                    tickFormatter={(time) => formatTime(time, days)}
                    domain={["auto", "auto"]}
                    scale="time"
                    type="number"
                    ticks={ticks}
                    label={{
                        value: "Time",
                        position: "insideBottom",
                        offset: -21,
                        fill: theme.colors.textMuted,
                    }}
                    tick={{dy: 15}}
                />
                <YAxis
                    stroke={theme.colors.textMuted}
                    domain={["auto", "auto"]}
                    label={{
                        value: yAxisUnit,
                        position: "insideLeft",
                        offset: -15,
                        fill: theme.colors.textMuted,
                    }}
                    tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                    contentStyle={{backgroundColor: theme.colors.secondaryHover, border: "none"}}
                    labelStyle={{color: "white"}}
                    itemStyle={{color: theme.colors.chartStroke}}
                    formatter={(value) => [`${value.toFixed(2)} ${yAxisUnit}`, ""]}
                    labelFormatter={(time) => formatTime(time, days)}
                />
                <Line type="monotone" dataKey={"values." + dataKey} strokeWidth={2} dot={false}/>
            </LineChart>
        </ResponsiveContainer>
    )

export const TimeChart = (
    {
        data,
        sensorType,
        title,
        days,
        numTicks,
        onEdit,
        onDelete
    }:
        {
            data: SensorData[],
            sensorType: string,
            title: string,
            days: number,
            numTicks: number,
            onEdit: () => void,
            onDelete: () => void
        }
) => {

    const {config} = useConfigContext();
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);
    const ticks = calculateTicks(data, numTicks);
    const dataKeys = Object.keys(data[0].values);

    return (
        <Card
            title={<Title level={4} style={{color: theme.colors.text}}>{title}</Title>}
            hoverable
            style={{
                backgroundColor: theme.colors.background,
                marginBottom: theme.sizes.marginBottom.medium,
                borderColor: theme.colors.border
            }}
            bodyStyle={{padding: 0}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {dataKeys.map(dataKey =>
                <LineTimedChart
                    key={dataKey}
                    data={data}
                    sensorType={sensorType}
                    yAxisUnit={config.unitMapping[sensorType][dataKey]}
                    days={days}
                    ticks={ticks}
                    dataKey={dataKey}
                />)}
            {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete)}
        </Card>
    );
};