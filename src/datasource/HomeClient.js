import {ClientBase} from "./Common";

const qs = require('qs');

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
    userName: string;
    currentSensorValuesConfig: ValueConfig[];
    averageSensorValuesConfig: ValueConfig[];
    chartConfigs: ChartConfig[];

    constructor(userName: string, currentSensorValuesConfig: ValueConfig[], averageSensorValuesConfig: ValueConfig[], chartConfigs: ChartConfig[]) {
        this.userName = userName;
        this.currentSensorValuesConfig = currentSensorValuesConfig;
        this.averageSensorValuesConfig = averageSensorValuesConfig;
        this.chartConfigs = chartConfigs;
    }
}

export class Event {
    title: string;
    timestamp: number;
    isAlert: boolean;

    constructor(title: string, timestamp: number, isAlert: boolean) {
        this.title = title;
        this.timestamp = timestamp;
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

export class HomeApi extends ClientBase{

    getEvents(params = {}, onComplete, errorSetter) {
        return this.api.get('/events', {params})
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch((err) => this.handleError(err, errorSetter));
    }

    getCurrentSensorValues(dashboardConfigId, onComplete, errorSetter) {
        return this.api.get(`/sensor-values/${dashboardConfigId}`)
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch((err) => this.handleError(err, errorSetter));
    }

    getAverageSensorValues(dashboardConfigId, onComplete, errorSetter) {
        return this.api.get(`/average-sensor-values/${dashboardConfigId}`)
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch((err) => this.handleError(err, errorSetter));
    }

    getChartData(chartConfigIds, timeRange, onComplete, errorSetter) {
        return this.api.get('/chart-data', {
            params: {
                chartConfigIds, timeRange
            },
            'paramsSerializer': function (params) {
                return qs.stringify(params, {arrayFormat: 'repeat', allowEmptyArrays: true})
            }
        })
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch((err) => this.handleError(err, errorSetter));
    }

    getPredictions(chartConfigIds, timeRange, onComplete, errorSetter) {
        return this.api.get('/predictions', {
            params: {
                chartConfigIds, timeRange
            },
            'paramsSerializer': function (params) {
                return qs.stringify(params, {arrayFormat: 'repeat', allowEmptyArrays: true})
            }
        })
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch((err) => this.handleError(err, errorSetter));
    }

    getDashboardConfig(id, onComplete, errorSetter) {
        return this.api.get(`/dashboard-config/${id}`)
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch((err) => this.handleError(err, errorSetter));
    }

    updateDashboardConfig(id, config, onComplete, errorSetter) {
        return this.api.put(`/dashboard-config/${id}`, config)
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch((err) => this.handleError(err, errorSetter));
    }
}