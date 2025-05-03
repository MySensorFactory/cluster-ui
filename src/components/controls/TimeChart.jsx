import React, {useState} from "react";
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
                            series,
                            yAxisUnit,
                            days,
                            dataKey,
                            showAnnotations = false
                        }) => {
    const now = new Date().getTime();
    
    // Configure annotations
    let annotations = {};
    
    // Add an annotation to show where predictions start if needed
    if (showAnnotations) {
        annotations = {
            xaxis: [{
                x: now, // Current time
                strokeDashArray: 0,
                borderColor: theme.colors.info,
                borderWidth: 2,
                label: {
                    text: 'Now',
                    style: {
                        color: '#fff',
                        background: theme.colors.info
                    }
                }
            }]
        };
    }

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
                easing: 'easeinout',
                speed: 800
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2,
            dashArray: series.map(s => s.dashArray || 0)
        },
        colors: series.map(s => s.color || theme.colors.chartStroke || '#00E396'),
        dataLabels: {
            enabled: false
        },
        tooltip: {
            shared: true,
            intersect: false,
            x: {
                formatter: function(val) {
                    return formatTime(val, days);
                }
            },
            y: {
                formatter: function(val) {
                    return `${val.toFixed(2)} ${yAxisUnit}`;
                }
            }
        },
        legend: {
            show: series.length > 1,
            position: 'top',
            horizontalAlign: 'right',
            labels: {
                colors: theme.colors.text
            }
        },
        xaxis: {
            type: 'datetime',
            labels: {
                formatter: function(val) {
                    return formatTime(val, days);
                },
                style: {
                    colors: theme.colors.textMuted
                }
            },
            title: {
                text: 'Time',
                style: {
                    color: theme.colors.textMuted
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function(val) {
                    return val.toFixed(1);
                },
                style: {
                    colors: theme.colors.textMuted
                }
            },
            title: {
                text: yAxisUnit,
                style: {
                    color: theme.colors.textMuted
                }
            }
        },
        grid: {
            borderColor: theme.colors.secondaryHover,
            strokeDashArray: 3
        },
        theme: {
            mode: 'dark'
        },
        markers: {
            size: 0
        },
        annotations: annotations
    };

    const chartSeries = series.map(s => ({
        name: s.name,
        data: s.data.map(item => ({
            x: item.x,
            y: item.y
        }))
    }));

    return (
        <>
            <Title level={5} style={{
                color: theme.colors.textMuted,
                marginTop: theme.sizes.marginBottom.small,
                marginLeft: theme.sizes.marginLeft.large
            }}>
                {dataKey}
            </Title>
            {chartSeries.length > 0 ? (
                <ReactApexChart 
                    options={options} 
                    series={chartSeries} 
                    type="line" 
                    height={300} 
                />
            ) : (
                <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <span style={{ color: theme.colors.textMuted }}>No data available for this chart</span>
                </div>
            )}
        </>
    );
};

export const TimeChart = ({
                              series,
                              sensorType,
                              title,
                              days,
                              showAnnotations = false,
                              onEdit,
                              onDelete
                          }) => {
    const {config} = useConfigContext();
    const {homeSubMenu} = useAppState();
    const [isHovered, setIsHovered] = useState(false);
    
    // Extract data keys from the first series, if available
    const dataKeys = series && series.length > 0 && series[0].data && series[0].data.length > 0
        ? Object.keys(series[0].dataKeys || {})
        : [];

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
            {dataKeys.length === 0 ? (
                <Title style={{color: theme.colors.textMuted}}>
                    No data available for this chart
                </Title>
            ) : (
                dataKeys.map(dataKey => {
                    // Filter series for this data key
                    const dataKeySeries = series.map(s => ({
                        ...s,
                        data: s.data.filter(d => d.dataKey === dataKey)
                    })).filter(s => s.data.length > 0);
                    
                    return (
                        <LineTimedChart
                            key={dataKey}
                            series={dataKeySeries}
                            dataKey={dataKey}
                            yAxisUnit={config.unitMapping[sensorType][dataKey]}
                            days={days}
                            showAnnotations={showAnnotations}
                        />
                    );
                })
            )}
            {tryRenderEditBox(homeSubMenu, isHovered, onEdit, onDelete)}
        </Card>
    );
};