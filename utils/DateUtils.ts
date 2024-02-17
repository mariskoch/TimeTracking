import Month from "./Months";
import Weekday from "./Weekdays";
import {locale} from "@/middleware";
import {getDictionary} from "@/app/[lang]/dictionaries";

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

export function TimeHoursMinutes(date: Date): string {
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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

export function getDateAsString(input?: Date): string {
    const date = input || new Date();
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    // return date in format yyyy-mm-dd
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
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

export function getYearMonth(): string {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    return `${year}-${month < 10 ? '0' + month : month}`;
}

export function transformDataFormat(data: string): string {
    const year = data.slice(0, 4);
    const month = data.slice(5, 7);
    const day = data.slice(8, 10);
    return `${day}.${month}.${year}`;
}
