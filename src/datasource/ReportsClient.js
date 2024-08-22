import axios from 'axios';

export function createUpsertReportRequest({
                                              timeRange,
                                              sensorLabels,
                                              label,
                                              name,
                                              description,
                                          }) {
    return {
        timeRange,
        sensorLabels,
        label,
        name,
        description,
    };
}

export function createSearchReportsRequest({
                                               pageSize,
                                               page,
                                               sorting = [],
                                               filter,
                                           }) {
    return {
        pageSize,
        page,
        sorting,
        filter,
    };
}

export function createFilter({
                                 textQuery,
                                 keywords,
                                 textFields,
                                 from,
                                 to,
                             }) {
    return {
        textQuery,
        keywords,
        textFields,
        from,
        to,
    };
}

export function createSorting({
                                  order,
                                  name,
                              }) {
    return {
        order,
        name,
    };
}

export function createGetSingleReportRequest({
                                                 from,
                                                 to,
                                                 label,
                                                 sensorType,
                                             }) {
    return {
        from,
        to,
        label,
        sensorType,
    };
}

export function useReportsApi() {
    const baseURL = 'http://localhost:8080/api/v1';

    const api = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const nullSafeOnComplete = (result, onComplete) => {
        if (result.data != null) {
            onComplete(result.data);
        }
    };

    const handleError = (err) => {
        console.error('API request failed:', err);
    };

    return {
        createReport: (data, onComplete) => {
            api.post('/reports', data)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        searchReports: (data, onComplete) => {
            api.post('/reports/search', data)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getReportDetails: (id, onComplete) => {
            api.get(`/reports/${id}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        updateReport: (id, data, onComplete) => {
            api.patch(`/reports/${id}`, data)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        deleteReport: (id, onComplete) => {
            api.delete(`/reports/${id}`)
                .then(r => onComplete(r.status === 204))
                .catch(handleError);
        },

        getSingleReport: (sensorType, label, from, to, onComplete) => {
            api.get(`/reports/${sensorType}/${label}`, {
                params: {
                    from,
                    to,
                },
            })
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },
    };
}