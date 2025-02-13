import {ClientBase, RequestError} from "./Common";

export class SensorLabel {
    label: string;
    displayName: string;

    constructor(label: string, displayName: string) {
        this.label = label;
        this.displayName = displayName;
    }
}

export class DataSource {
    sensorType: string;
    displayName: string;
    availableLabels: SensorLabel[];

    constructor(sensorType: string, displayName: string, availableLabels: SensorLabel[]) {
        this.sensorType = sensorType;
        this.displayName = displayName;
        this.availableLabels = availableLabels;
    }
}

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
    dataSources: Record<string, DataSource>;
    sortOptions: LabeledValue[];
    timeRangeOptions: TimeRangeOption[];
    unitMapping: Record<string, Record<string, string>>;
    wideSensors: string[];

    constructor(
        dataSources: Record<string, DataSource>,
        sortOptions: LabeledValue[],
        timeRangeOptions: TimeRangeOption[],
        unitMapping: Record<string, Record<string, string>>,
        wideSensors: string[]
    ) {
        this.dataSources = dataSources;
        this.sortOptions = sortOptions;
        this.timeRangeOptions = timeRangeOptions;
        this.unitMapping = unitMapping;
        this.wideSensors = wideSensors;
    }
}

export class ConfigApi extends ClientBase {
    getConfiguration(onComplete?: (data: Config) => void, errorSetter: (RequestError) => void) {
        this.api.get('/config')
            .then(r => this.nullSafeOnComplete(r, onComplete))
            .catch(err => this.handleError(err, errorSetter));
    }
}