import {useMemo} from 'react';
import {Configuration, ReportsApi} from './generated';
import axiosInstance from 'axios';

export function useApi() {
    const configuration = useMemo(() => new Configuration({
        basePath: 'https://your-api-base-url.com',
        baseOptions: { axios: axiosInstance }
    }), []);

    const reportsApi = useMemo(() => new ReportsApi(configuration), [configuration]);

    return { reportsApi };
}