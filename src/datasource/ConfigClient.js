import axios from 'axios';

export class LabeledValue {
    value: string;
    label: string;

    constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }
}

export class TimeRangeOption extends LabeledValue {
    daysCount: number;

    constructor(value: string, label: string, daysCount: number) {
        super(value, label);
        this.daysCount = daysCount;
    }
}

export class Config {
    availableSensors: LabeledValue[];
    availableLabels: LabeledValue[];
    sortOptions: LabeledValue[];
    timeRangeOptions: TimeRangeOption[];
    unitMapping: Record<string, string>;
    wideSensors: string[];

    constructor(availableSensors: LabeledValue[],
                availableLabels: LabeledValue[],
                sortOptions: LabeledValue[],
                timeRangeOptions: TimeRangeOption[],
                unitMapping: Record<string, string>) {
        this.availableSensors = availableSensors;
        this.availableLabels = availableLabels;
        this.sortOptions = sortOptions;
        this.timeRangeOptions = timeRangeOptions;
        this.unitMapping = unitMapping;
    }
}

export function configApi() {
    const baseURL = 'http://localhost:8080';

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
        getConfiguration: (onComplete?: (data: Config) => void) => {
            api.get('/config')
                .then(r => nullSafeOnComplete(r, onComplete))
                .catch(handleError);
        },
    };
}