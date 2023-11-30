import Weekday from "./Weekdays";

export default interface ExportTableSchema {
    weekday: Weekday,
    day: Date,
    startTime: Date,
    endTime: Date,
    pauseDuration: Date
}
