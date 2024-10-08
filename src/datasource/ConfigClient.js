import {ClientBase, RequestError} from "./Common";


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
    unitMapping: Record<string, Record<string, string>>;
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

export class ConfigApi extends ClientBase{
    getConfiguration(onComplete?: (data: Config) => void, errorSetter: (RequestError) => void) {
        this.api.get('/config')
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch(err => this.handleError(err, errorSetter));
    }
}