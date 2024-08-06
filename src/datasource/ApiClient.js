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
            api.get('/chart-data', {params: {sensorType, timeRange},}
            )
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        addSensorValue: (sensorValue, onComplete) => {
            api.post('/sensor-values', sensorValue)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError)
        },

        updateSensorValue: (index, sensorValue, onComplete) => {
            api.put(`/sensor-values/${index}`, sensorValue)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError)
        },

        deleteSensorValue: (index, onComplete) => {
            api.delete(`/sensor-values/${index}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        addChartConfig: (chartConfig, onComplete) => {
            api.post('/chart-configs', chartConfig)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError)
        },

        updateChartConfig: (index, chartConfig, onComplete) => {
            api.put(`/chart-configs/${index}`, chartConfig)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        deleteChartConfig: (index, onComplete) => {
            api.delete(`/chart-configs/${index}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError)
        },

        getChartConfigs: (onComplete) => {
            api.get('/chart-configs')
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError)
        },

    }
}