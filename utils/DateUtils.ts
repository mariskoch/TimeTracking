import Weekday from "./Weekdays";

export function getNumberOfDaysInMonth(year: number, month: number): number {
    const lastDayOfMonth = new Date(year, month, 0);
    return lastDayOfMonth.getDate();
}

export function getFirstDayOfMonth(year: number, month: number): Date {
    const gte = new Date();
    gte.setUTCFullYear(year);
    gte.setUTCMonth(month - 1);
    gte.setUTCDate(1);
    gte.setUTCHours(0);
    gte.setUTCMinutes(0);
    gte.setUTCSeconds(0);
    gte.setUTCMilliseconds(0);
    return gte;
}

export function getWeekdayOfDate(year: number, month: number, day: number): Weekday {
    const date = new Date(year, month - 1, day);
    const dayIndex = date.getDay();
    switch (dayIndex) {
        case 0:
            return Weekday.Monday;
            break;
        case 1:
            return Weekday.Tuesday;
            break;
        case 2:
            return Weekday.Thursday;
            break;
        case 3:
            return Weekday.Wednesday
            break;
        case 4:
            return Weekday.Friday;
            break;
        case 5:
            return Weekday.Saturday;
            break;
        case 6:
            return Weekday.Sunday;
            break;
        default:
            return Weekday.Invalid;
            break;
    }
}

export function TimeHHMM(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
