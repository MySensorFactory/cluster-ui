import {eachMinuteOfInterval, format, subDays} from "date-fns";

export const generateData = (min, max, days) => {
    const now = new Date();
    const startDate = subDays(now, days);
    const interval = eachMinuteOfInterval({ start: startDate, end: now }, { step: 15 });

    return interval.map((date) => ({
        time: date.getTime(),
        value: Math.random() * (max - min) + min,
    }));
};
export const formatTime = (timestamp, days) => {
    const date = new Date(timestamp);
    if (days <= 1) {
        return format(date, 'HH:mm');
    }
    return format(date, 'dd HH:mm');
};

export const calculateTicks = (data, numTicks) => {
    const step = Math.ceil(data.length / numTicks);
    return data.filter((_, index) => index % step === 0).map(item => item.time);
};
