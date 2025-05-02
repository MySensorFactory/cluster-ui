import {ClientBase} from "./Common";

export class Sorting {
    order: 'asc' | 'desc';
    name: string;

    constructor(order: 'asc' | 'desc', name: string) {
        this.order = order;
        this.name = name;
    }
}

export class Filter {
    textQuery: string;
    sensorTypes: string[];
    sensorLabels: string[];
    from: number;
    to: number;

    constructor(textQuery: string | undefined,
                sensorTypes?: string[],
                sensorLabels?: string[],
                from?: number,
                to?: number) {
        this.textQuery = textQuery;
        this.sensorTypes = sensorTypes;
        this.sensorLabels = sensorLabels;
        this.from = from;
        this.to = to;
    }
}

export class SearchReportsRequest {
    pageSize: number;
    page: number;
    sorting: Sorting[];
    filter: Filter;

    constructor(filter: Filter, pageSize?: number, page?: number, sorting?: Sorting[]) {
        this.pageSize = pageSize;
        this.page = page;
        this.sorting = sorting;
        this.filter = filter;
    }
}

export class TimeRange {
    from: number;
    to: number;

    constructor(from: number, to: number) {
        this.from = from;
        this.to = to;
    }
}

export class UpsertReportRequest {
    timeRange: TimeRange;
    sensorLabels: Record<string, string[]>;
    name: string;
    description: string;
    label: string;

    constructor(timeRange: TimeRange,
                sensorLabels: Record<string, string[]>,
                name: string,
                description: string,
                label: string) {
        this.timeRange = timeRange;
        this.sensorLabels = sensorLabels;
        this.name = name;
        this.description = description;
        this.label = label;
    }
}

export class UpsertReportResponse {
    id: string;

    constructor(id: string) {
        this.id = id;
    }
}

export class ReportPreview {
    id: string;
    name: string;
    sensorLabels: Record<string, string[]>;
    timeRange: TimeRange;

    constructor(id: string, name: string, sensorLabels: Record<string, string>, timeRange: TimeRange) {
        this.id = id;
        this.name = name;
        this.sensorLabels = sensorLabels;
        this.timeRange = timeRange;
    }
}

export class GetReportListResponse {
    results: ReportPreview[];
    totalItems: number;

    constructor(results: ReportPreview[], totalItems: number) {
        this.results = results;
        this.totalItems = totalItems;
    }
}

export class SensorData {
    timestamp: number;
    values: Record<string, number>;

    constructor(timestamp: number, values: Record<string, number>) {
        this.timestamp = timestamp;
        this.values = values;
    }
}

export class GetReportDetailsResponse extends ReportPreview {
    description: string;
    label: string;
    dataBySensorType: Record<string, Record<string, SensorData[]>>;
}

export function createUpsertReportRequest(
    timeRange: TimeRange,
    sensorLabels: Record<string, string>,
    name: string,
    description: string,
): UpsertReportRequest {
    return new UpsertReportRequest(timeRange, sensorLabels, name, description);
}

export class ReportsApi extends ClientBase {
    createReport(data: UpsertReportRequest, onComplete?: (data: UpsertReportResponse) => void) {
        return this.api.post('/reports', data)
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch(this.handleError);
    }

    searchReports(data: SearchReportsRequest, onComplete?: (data: GetReportListResponse) => void) {
        return this.api.post('/reports/search', data)
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch(this.handleError);
    }

    getReportDetails(id: string, onComplete?: (data: GetReportDetailsResponse) => void) {
        return this.api.get(`/reports/${id}`)
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch(this.handleError);
    }

    updateReport(id: string, data: UpsertReportRequest, onComplete?: (data: UpsertReportResponse) => void) {
        return this.api.patch(`/reports/${id}`, data)
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch(this.handleError);
    }

    deleteReport(id: string, onComplete?: (success: boolean) => void) {
        return this.api.delete(`/reports/${id}`)
            .then(r => onComplete && onComplete(r.status === 204))
            .catch(this.handleError);
    }
}