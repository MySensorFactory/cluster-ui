import axios from 'axios';

export function useApi() {

    const baseURL = 'http://localhost:8080';

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

        getCurrentSensorValues: (onComplete) => {
            api.get('/sensor-values')
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getAverageSensorValues: (onComplete) => {
            api.get('/average-sensor-values')
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getChartData: (sensorType, timeRange, onComplete) => {
            api.get('/chart-data', {
                params: {sensorType, timeRange},
            })
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

    }
}