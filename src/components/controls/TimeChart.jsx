import React, {useState} from "react";
import Typography from 'antd/es/typography/Typography';
import Card from 'antd/es/card/Card'
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useAppState} from "../AppStateContext";
import {theme} from "../styles/theme";
import {tryRenderEditBox} from "./TryRenderEditBox";
import type {SensorData} from "../../datasource/ReportsClient";
import {useConfigContext} from "../../datasource/ConfigContext";
import {format} from "date-fns";
import type {SensorValue} from "../../datasource/HomeClient";
import type {Config} from "../../datasource/ConfigClient";

const {Title} = Typography;

const formatTime = (timestamp: number, days: number): string => {
    const date = new Date(timestamp);
    if (days <= 1) {
        return format(date, 'HH:mm');
    }
    return format(date, 'dd HH:mm');
};

const calculateTicks = (data: SensorValue[], numTicks: number): number[] => {
    const step = Math.ceil(data.length / numTicks);
    return data.filter((_, index) => index % step === 0).map(item => item.timestamp);
};

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
}) => (
    <ResponsiveContainer width="100%" height={300}>
        <Title level={5} style={{
            color: theme.colors.textMuted,
            marginTop: theme.sizes.marginBottom.small,
            marginLeft: theme.sizes.marginLeft.large
        }}>
            {dataKey}
        </Title>
        <LineChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 40}}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.secondaryHover}/>
            <XAxis
                dataKey="timestamp"
                stroke={theme.colors.textMuted}
                tickFormatter={(time: number): string => formatTime(time, days)}
                domain={["auto", "auto"]}
                scale="time"
                type="number"
                ticks={ticks}
                label={{
                    value: "Time",
                    position: "insideBottom",
                    offset: -10,
                    fill: theme.colors.textMuted,
                }}
                tick={{dy: 10}}
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
                tickFormatter={(value: number): string => `${value}`}
            />
            <Tooltip
                contentStyle={{backgroundColor: theme.colors.secondaryHover, border: "none"}}
                labelStyle={{color: "white"}}
                itemStyle={{color: theme.colors.chartStroke}}
                formatter={(value: any): string[] => [`${value.toFixed(2)} ${yAxisUnit}`, ""]}
                labelFormatter={(time) => formatTime(time, days)}
            />
            <Line type="monotone" dataKey={"values." + dataKey} strokeWidth={2} dot={false}/>
        </LineChart>
    </ResponsiveContainer>
)

export const TimeChart = ({
                              data,
                              sensorType,
                              title,
                              days,
                              numTicks,
                              onEdit,
                              onDelete
                          }: {
    data: SensorData[],
    sensorType: string,
    title: string,
    days: number,
    numTicks: number,
    onEdit: () => void,
    onDelete: () => void
}) => {
    const {config}: {config: Config} = useConfigContext();
    const {homeSubMenu}: string = useAppState();
    const [isHovered: boolean, setIsHovered: (boolean) => void] = useState(false);
    const ticks: number[] = calculateTicks(data, numTicks);
    const dataKeys: string[] = Object.keys(data[0].values);

    return (
        <Card
            title={
                <Title level={4} style={{color: theme.colors.text}}>
                    {title}
                </Title>
            }
            hoverable
            style={{
                backgroundColor: theme.colors.background,
                marginBottom: theme.sizes.marginBottom.medium,
                borderColor: theme.colors.border
            }}
            bodyStyle={{padding: theme.sizes.padding.medium}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {dataKeys.map((dataKey: string) =>
                <LineTimedChart
                    key={dataKey}
                    data={data}
                    sensorType={sensorType}
                    yAxisUnit={config.unitMapping[sensorType][dataKey]}
                    days={days}
                    ticks={ticks}
                    dataKey={dataKey}
                />
            )}
            {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete)}
        </Card>
    );
};