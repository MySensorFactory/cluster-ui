import {format} from "date-fns";
import type {SensorValue} from "../../datasource/HomeClient";

export const formatTime = (timestamp, days) => {
    const date = new Date(timestamp);
    if (days <= 1) {
        return format(date, 'HH:mm');
    }
    return format(date, 'dd HH:mm');
};

export const calculateTicks = (data: SensorValue[], numTicks) => {
    const step = Math.ceil(data.length / numTicks);
    return data.filter((_, index) => index % step === 0).map(item => item.time);
};
