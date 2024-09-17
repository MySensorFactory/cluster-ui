import axios from 'axios';

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
    keywords: Record<string, string[]>;
    textFields: string[];
    from: number;
    to: number;

    constructor(textQuery: string | undefined, keywords: Record<string, string[]>, textFields: string[], from?: number, to?: number) {
        this.textQuery = textQuery;
        this.keywords = keywords;
        this.textFields = textFields;
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
    includedSensors: string[];
    label: string;
    name: string;
    description: string;

    constructor(timeRange: TimeRange, includedSensors: string[], label: string, name: string, description: string) {
        this.timeRange = timeRange;
        this.includedSensors = includedSensors;
        this.label = label;
        this.name = name;
        this.description = description;
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
    includedSensors: string[];
    label: string;
    timeRange: TimeRange;

    constructor(id: string, name: string, includedSensors: string[], label: string, timeRange: TimeRange) {
        this.id = id;
        this.name = name;
        this.includedSensors = includedSensors;
        this.label = label;
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
    dataBySensorType: Record<string, SensorData[]>;

    constructor(id: string, name: string, includedSensors: string[], label: string, timeRange: TimeRange, description: string, dataBySensorType: Record<string, SensorData[]>) {
        super(id, name, includedSensors, label, timeRange);
        this.description = description;
        this.dataBySensorType = dataBySensorType;
    }
}

export function createUpsertReportRequest(
    timeRange: TimeRange,
    includedSensors: string[],
    label: string,
    name: string,
    description: string,
): UpsertReportRequest {
    return new UpsertReportRequest(timeRange, includedSensors, label, name, description);
}

export function createSearchReportsRequest(
    filter: Filter,
    pageSize?: number,
    page?: number,
    sorting: Sorting[] = [],
): SearchReportsRequest {
    return new SearchReportsRequest(filter, pageSize, page, sorting);
}

export function createFilter(
    textQuery: string | undefined,
    keywords: Record<string, string[]>,
    textFields: string[],
    from?: number,
    to?: number,
): Filter {
    return new Filter(textQuery, keywords, textFields, from, to);
}

export function createSorting(
    order: 'asc' | 'desc',
    name: string,
): Sorting[] {
    return [new Sorting(order, name)];
}

export function useReportsApi() {
    const baseURL = 'http://localhost:8080';

    const api = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const nullSafeOnComplete = (result: any, onComplete?: (any) => void) => {
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
        createReport: (data: UpsertReportRequest, onComplete?: (data: UpsertReportResponse) => void) => {
            api.post('/reports', data)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        searchReports: (data: SearchReportsRequest, onComplete?: (data: GetReportListResponse) => void) => {
            api.post('/reports/search', data)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        getReportDetails: (id: string, onComplete?: (data: GetReportDetailsResponse) => void) => {
            api.get(`/reports/${id}`)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        updateReport: (id: string, data: UpsertReportRequest, onComplete?: (data: UpsertReportResponse) => void) => {
            api.patch(`/reports/${id}`, data)
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },

        deleteReport: (id: string, onComplete?: (success: boolean) => void) => {
            api.delete(`/reports/${id}`)
                .then(r => onComplete && onComplete(r.status === 204))
                .catch(handleError);
        },
    };
}