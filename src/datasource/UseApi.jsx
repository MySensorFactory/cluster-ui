import {ReportsApi} from './generated/src';

export function useApi() {
    const reportsApi = new ReportsApi();
    return { reportsApi };
}