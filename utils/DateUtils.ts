import Month from "./Months";
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
    const date = new Date();
    date.setUTCFullYear(year);
    date.setUTCMonth(month - 1);
    date.setUTCDate(day);
    const dayIndex = date.getDay();
    switch (dayIndex) {
        case 1:
            return Weekday.Monday;
            break;
        case 2:
            return Weekday.Tuesday;
            break;
        case 3:
            return Weekday.Thursday;
            break;
        case 4:
            return Weekday.Wednesday
            break;
        case 5:
            return Weekday.Friday;
            break;
        case 6:
            return Weekday.Saturday;
            break;
        case 0:
            return Weekday.Sunday;
            break;
        default:
            return Weekday.Invalid;
            break;
    }
}

export function TimeHoursMinutes(date: Date): string {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}

export function getMonthName(month: number): Month {
    switch (month) {
        case 1:
            return Month.January;
            break;
        case 2:
            return Month.February;
            break;
        case 3:
            return Month.March
            break;
        case 4:
            return Month.April;
            break;
        case 5:
            return Month.May;
            break;
        case 6:
            return Month.June;
            break;
        case 7:
            return Month.July;
            break;
        case 8:
            return Month.August;
            break;
        case 9:
            return Month.September;
            break;
        case 10:
            return Month.October;
            break;
        case 11:
            return Month.November;
            break;
        case 12:
            return Month.December;
            break;
        default:
            return Month.Invalid;
            break;
    }
}

export function areDatesOnSameDay(datum1: Date, datum2: Date): boolean {
    return (
        datum1.getUTCFullYear() === datum2.getUTCFullYear() &&
        datum1.getUTCMonth() === datum2.getUTCMonth() &&
        datum1.getUTCDate() === datum2.getUTCDate()
    );
}

export function isValidYearMonthFormat(input: string): boolean {
    const regex = /^(\d{4})-(0[1-9]|1[0-2])$/;
    return regex.test(input);
}

export function getDateAsString(): string {
    const date = new Date;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;
}

export function calculateWorkTime(start: Date, end: Date, pause: Date): string {
    const startTimeInMilliseconds = start.getUTCHours() * 3600000 + start.getUTCMinutes() * 60000;
    const endTimeInMilliseconds = end.getUTCHours() * 3600000 + end.getUTCMinutes() * 60000;
    const pauseTimeInMilliseconds = pause.getUTCHours() * 3600000 + pause.getUTCMinutes() * 60000;
    const timeInMilliseconds = endTimeInMilliseconds - startTimeInMilliseconds - pauseTimeInMilliseconds;
    const hours = Math.floor(timeInMilliseconds / 3600000);
    const minutes = Math.floor((timeInMilliseconds - hours * 3600000) / 60000);
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}
