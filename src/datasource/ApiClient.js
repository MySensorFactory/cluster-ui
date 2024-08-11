import axios from 'axios';

export function useApi() {

    const baseURL = 'http://localhost:8080/home';

    const api = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const nullSafeOnComplete = (result, onComplete) => {
        if (result.data != null) {
            onComplete(result.data)
        }
    }

    const handleError = (err) => {
        console.error('API request failed:', err);
    }

    return {
        getEvents: (params = {}, onComplete) => {
            api.get('/events', {params})
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getCurrentSensorValues: (dashboardId, onComplete) => {
            api.get(`/sensor-values/${dashboardId}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getAverageSensorValues: (dashboardId, onComplete) => {
            api.get(`/average-sensor-values/${dashboardId}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getChartData: (sensorType, timeRange, onComplete) => {
            api.get('/chart-data', {params: {sensorType: sensorType, timeRange: timeRange},}
            )
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getDashboardConfig: (dashboardId, onComplete) => {
            return api.get(`/dashboard-config/${dashboardId}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        updateDashboardConfig: (dashboardId, config, onComplete) => {
            api.put(`/dashboard-config/${dashboardId}`, config)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

    }
}