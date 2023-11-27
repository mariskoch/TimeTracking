import { prisma } from "@/client";
import React from "react";

interface TableProps {
    firstName: string,
    lastName: string,
    year: number,
    month: number,
}

const ExportTable: React.FC<TableProps> = async ({ firstName = "Johanna", lastName = "Scherer", month = 11, year = 2023 }) => {
    function getDaysInMonth(year: number, month: number): number {
        const lastDayOfMonth = new Date(year, month, 0);
        return lastDayOfMonth.getDate();
    }

    function getDayOfWeek(year: number, month: number, day: number): string {
        const date = new Date(year, month - 1, day);
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
        const dayIndex = date.getDay();

        return daysOfWeek[dayIndex];
    }

    const gte = new Date();
    gte.setUTCFullYear(year);
    gte.setUTCMonth(month - 1);
    gte.setUTCDate(1);
    gte.setUTCHours(0);
    gte.setUTCMinutes(0);
    gte.setUTCSeconds(0);
    gte.setUTCMilliseconds(0);

    const lt = new Date();
    lt.setUTCFullYear(year);
    lt.setUTCMonth(month);
    lt.setUTCDate(1);
    lt.setUTCHours(0);
    lt.setUTCMinutes(0);
    lt.setUTCSeconds(0);
    lt.setUTCMilliseconds(0);

    const workTimeEntries = await prisma.workTimeEntry.findMany({
        where: {
            day: {
                gte,
                lt,
            }
        },
        orderBy: {
            day: "asc"
        }
    });

    const daysInMonth = getDaysInMonth(year, month);

    const tableData = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const weekday = getDayOfWeek(year, month, day);
        const startTime = '08:00';
        const endTime = '18:15';
        const pauseDuration = '01:00';

        tableData.push({
            day,
            weekday,
            startTime,
            endTime,
            pauseDuration
        });
    }

    return (
        <div className="bg-white w-[794px] h-[1123px] p-0">
            <div className="grid grid-cols-2">
                <div>
                    First Name:
                </div>
                <div>
                    {firstName}
                </div>
                <div>
                    Last Name:
                </div>
                <div>
                    {lastName}
                </div>
                <div>
                    Year:
                </div>
                <div>
                    {year}
                </div>
                <div>
                    Month:
                </div>
                <div>
                    {month}
                </div>
            </div>
            <table>
                <thead>
                    <th>Date</th>
                    <th>Weekday</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Pause Duration</th>
                </thead>
                <tbody>
                    {tableData.map((rowData, index) => {
                        return (
                            <tr key={index}>
                                <td>{rowData.day}</td>
                                <td>{rowData.weekday}</td>
                                <td>{rowData.startTime}</td>
                                <td>{rowData.endTime}</td>
                                <td>{rowData.pauseDuration}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ExportTable;
