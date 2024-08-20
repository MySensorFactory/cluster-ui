import {useAppState} from "../AppStateContext";
import React, {useState} from "react";
import {calculateTicks, formatTime} from "../data/DataSource";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {tryRenderEditBox} from "../home/TryRenderEditBox";
import {ChartWrapper, ChartTitle} from "../styles/ChartStyles";
import {theme} from "../styles/theme";

export const TimeChart = ({
                              data,
                              title,
                              dataKey,
                              stroke,
                              yAxisUnit,
                              days,
                              numTicks,
                              onEdit,
                              onDelete,
                          }) => {
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);
    const ticks = calculateTicks(data, numTicks);

    const chartClassName = "chart-wrapper";
    const parentSelector = "." + chartClassName;

    return (
        <ChartWrapper
            className={chartClassName}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ChartTitle>{title}</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{top: 20, right: 30, left: 20, bottom: 25}}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.secondaryHover}/>
                    <XAxis
                        dataKey="time"
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
                        itemStyle={{color: stroke}}
                        formatter={(value) => [`${value.toFixed(2)} ${yAxisUnit}`, ""]}
                        labelFormatter={(time) => formatTime(time, days)}
                    />
                    <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
            {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete, parentSelector)}
        </ChartWrapper>
    );
};