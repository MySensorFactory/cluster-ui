import React, {useState, useEffect} from "react";
import Typography from 'antd/es/typography/Typography';
import Card from 'antd/es/card/Card';
import ReactApexChart from 'react-apexcharts';
import {useAppState} from "../AppStateContext";
import {theme} from "../styles/theme";
import {tryRenderEditBox} from "./TryRenderEditBox";
import {useConfigContext} from "../../datasource/ConfigContext";
import {format} from "date-fns";

const {Title} = Typography;

const formatTime = (timestamp, days) => {
    const date = new Date(timestamp);
    if (days <= 1) {
        return format(date, 'HH:mm');
    }
    return format(date, 'dd HH:mm');
};

const LineTimedChart = ({
                            data,
                            yAxisUnit,
                            days,
                            dataKey,
                            realtime
                        }) => {
    // Format data for ApexCharts
    const series = [{
        name: dataKey,
        data: data.map(item => ({
            x: item.timestamp,
            y: item.values[dataKey]
        }))
    }];

    const options = {
        chart: {
            type: 'line',
            height: 300,
            toolbar: {
                show: false
            },
            background: 'transparent',
            zoom: {
                enabled: false
            },
            animations: {
                enabled: true,
                easing: 'linear',
                dynamicAnimation: {
                    speed: 500
                }
            }
        },
        colors: ['#00E396'],
        stroke: {
            curve: 'smooth',
            width: 2.5
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 0 // Hide markers for cleaner look
        },
        tooltip: {
            x: {
                formatter: function(val) {
                    return formatTime(val, days);
                }
            },
            y: {
                formatter: function(val) {
                    return `${val.toFixed(2)} ${yAxisUnit}`;
                }
            },
            theme: 'dark'
        },
        grid: {
            borderColor: 'rgba(255,255,255,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: true
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 10
            }
        },
        xaxis: {
            type: 'datetime',
            range: realtime ? 3600000 * 3 : undefined, // For realtime, show 3 hours of data
            labels: {
                formatter: function(val) {
                    return formatTime(val, days);
                },
                style: {
                    colors: theme.colors.textMuted,
                    fontSize: '11px'
                }
            },
            title: {
                text: 'Time',
                style: {
                    color: theme.colors.textMuted,
                    fontSize: '12px'
                }
            },
            axisBorder: {
                color: 'rgba(255,255,255,0.1)'
            },
            axisTicks: {
                color: 'rgba(255,255,255,0.1)'
            }
        },
        yaxis: {
            labels: {
                formatter: function(val) {
                    return val.toFixed(0);
                },
                style: {
                    colors: theme.colors.textMuted,
                    fontSize: '11px'
                }
            },
            title: {
                text: yAxisUnit,
                style: {
                    color: theme.colors.textMuted,
                    fontSize: '12px'
                }
            }
        },
        theme: {
            mode: 'dark',
            palette: 'palette1'
        }
    };

    return (
        <>
            <Title level={5} style={{
                color: theme.colors.textMuted,
                marginTop: theme.sizes.marginBottom.small,
                marginLeft: theme.sizes.marginLeft.large
            }}>
                {dataKey}
            </Title>
            <ReactApexChart 
                options={options} 
                series={series} 
                type="line" 
                height={300} 
            />
        </>
    );
};

export const TimeChart = ({
                              data,
                              sensorType,
                              title,
                              days,
                              numTicks,
                              onEdit,
                              onDelete,
                              realtime = false
                          }) => {
    const {config} = useConfigContext();
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);
    const dataKeys = data !== undefined && data.length > 0 ? Object.keys(data[0].values) : [];
    
    // For real-time charts, we'll set up a chart update at regular intervals
    const [chartData, setChartData] = useState(data);
    
    useEffect(() => {
        setChartData(data);
        
        // Set up real-time updates if the realtime prop is true
        let interval;
        if (realtime && data && data.length > 0) {
            // Keep track of the last timestamp
            let lastTimestamp = Date.now();
            
            // Determine update interval - for real charts this would be your data collection rate
            // For simulation, we'll use a faster rate for demo purposes
            const updateInterval = days <= 1 ? 500 : 1000; // Faster updates for shorter time ranges
            
            interval = setInterval(() => {
                // Update with new data point every interval
                setChartData(prevData => {
                    if (!prevData || prevData.length === 0) return prevData;
                    
                    // Create a copy of the existing data
                    const newData = [...prevData];
                    
                    // Get the last data point as reference
                    const lastPoint = newData[newData.length - 1];
                    
                    // Calculate next timestamp - increment by 15 seconds in chart time
                    const timeIncrement = days <= 1 ? 15 * 1000 : 60 * 1000; // 15 sec or 1 min based on scale
                    lastTimestamp = lastTimestamp + timeIncrement;
                    
                    // Create a new data point with values similar to the last one but with small changes
                    const newPoint = {
                        ...lastPoint,
                        timestamp: lastTimestamp,
                        values: Object.keys(lastPoint.values).reduce((acc, key) => {
                            // Calculate a new value with a small random change
                            const lastValue = lastPoint.values[key];
                            const change = (Math.random() - 0.5) * 1.5; // Random change between -0.75 and 0.75
                            
                            // Keep the general trend but add some randomness
                            acc[key] = lastValue + change;
                            return acc;
                        }, {})
                    };
                    
                    // Add the new point to the data array
                    newData.push(newPoint);
                    
                    // Limit the number of points to keep (for performance and to create scrolling effect)
                    // For real-time charts, we'll keep a reasonable number of points based on the time range
                    const hoursToKeep = days <= 1 ? 3 : 24; // Keep 3 hours or 24 hours of data
                    const pointsToKeep = hoursToKeep * 60 * 60 * 1000 / timeIncrement;
                    
                    if (newData.length > pointsToKeep) {
                        return newData.slice(newData.length - pointsToKeep);
                    }
                    
                    return newData;
                });
            }, updateInterval);
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [data, realtime, days]);

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
            {(!chartData || chartData.length === 0) ? (
                <Title style={{color: theme.colors.textMuted}}>
                    No data available for this chart
                </Title>
            ) : (
                dataKeys.map(dataKey =>
                    <LineTimedChart
                        key={dataKey}
                        data={chartData}
                        sensorType={sensorType}
                        yAxisUnit={config.unitMapping[sensorType][dataKey]}
                        days={days}
                        dataKey={dataKey}
                        realtime={realtime}
                    />
                )
            )}
            {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete)}
        </Card>
    );
};