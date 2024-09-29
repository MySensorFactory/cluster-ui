import axios from 'axios';
var qs = require('qs');

export class ValueConfig {
    id: string;
    label: string;
    sensorType: string;

    constructor(id: string, label: string, sensorType: string) {
        this.id = id;
        this.label = label;
        this.sensorType = sensorType;
    }
}

export class ChartConfig extends ValueConfig {
    constructor(id: string, label: string, sensorType: string) {
        super(id, label, sensorType);
    }
}

export class DashboardConfig {
    id: string;
    currentSensorValuesConfig: ValueConfig[];
    averageSensorValuesConfig: ValueConfig[];
    chartConfigs: ChartConfig[];

    constructor(id: string, currentSensorValuesConfig: ValueConfig[], averageSensorValuesConfig: ValueConfig[], chartConfigs: ChartConfig[]) {
        this.id = id;
        this.currentSensorValuesConfig = currentSensorValuesConfig;
        this.averageSensorValuesConfig = averageSensorValuesConfig;
        this.chartConfigs = chartConfigs;
    }
}

export class Event {
    title: string;
    time: string;
    isAlert: boolean;

    constructor(title: string, time: string, isAlert: boolean) {
        this.title = title;
        this.time = time;
        this.isAlert = isAlert;
    }
}

export class SensorValue extends ValueConfig {
    timestamp: number;
    values: Record<string, number>;

    constructor(id: string, label: string, sensorType: string, timestamp: number, values: Record<string, number>) {
        super(id, label, sensorType);
        this.timestamp = timestamp;
        this.values = values;
    }
}

export function useHomeApi() {
    const baseURL = 'http://localhost:8080/home';

    const api = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const nullSafeOnComplete = (result: any, onComplete?: (data: any) => void) => {
        if (!onComplete) {
            return;
        }

        if (result.data != null) {
            onComplete(result.data);
        }
    };

    const handleError = (err: any) => {
        console.error('API request failed:', err);
    };

    return {
        getEvents: (params: {
            showOnlyAlerts?: boolean,
            searchTerm?: string,
            startDate?: string,
            endDate?: string
        } = {}, onComplete?: (data: Event[]) => void) => {
            api.get('/events', {params})
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getCurrentSensorValues: (dashboardConfigId: string, onComplete?: (data: SensorValue[]) => void) => {
            api.get(`/sensor-values/${dashboardConfigId}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getAverageSensorValues: (dashboardConfigId: string, onComplete?: (data: Record<string,SensorValue[]>) => void) => {
            api.get(`/average-sensor-values/${dashboardConfigId}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getChartData: (chartConfigIds: string[], timeRange: string, onComplete?: (data: SensorValue[]) => void) => {
            api.get('/chart-data', {params: {
                chartConfigIds, timeRange
            },
                'paramsSerializer': function(params) {
                    return qs.stringify(params, {arrayFormat: 'repeat'})
                }
            })
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getDashboardConfig: (id: string, onComplete?: (data: DashboardConfig) => void) => {
            return api.get(`/dashboard-config/${id}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        updateDashboardConfig: (id: string, config: DashboardConfig, onComplete?: (data: DashboardConfig) => void) => {
            api.put(`/dashboard-config/${id}`, config)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },
    };
}