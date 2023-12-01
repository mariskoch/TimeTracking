import ExportTableSchema from '@/utils/ExportTableSchema';
import { useSearchParams } from 'next/navigation';
import { TimeHoursMinutes, getFirstDayOfMonth, getNumberOfDaysInMonth, getWeekdayOfDate } from '@/utils/DateUtils';
import { prisma } from '@/client';

const View = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const yearParam = searchParams.year;
    const year = Array.isArray(yearParam) ? parseInt(yearParam[0], 10) : parseInt(yearParam || '1970', 10);

    const monthParam = searchParams.month;
    const month = Array.isArray(monthParam) ? parseInt(monthParam[0], 10) : parseInt(monthParam || '1', 10);

    const firstName = 'Johanna';
    const lastName = 'Scherer';

    const gte = getFirstDayOfMonth(year, month);
    const lt = getFirstDayOfMonth(year, month + 1);

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

    const daysInMonth = getNumberOfDaysInMonth(year, month);
    const tableData: ExportTableSchema[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDate = new Date();
        dayDate.setUTCFullYear(year);
        dayDate.setUTCMonth(month - 1);
        dayDate.setUTCDate(day);
        const weekday = getWeekdayOfDate(year, month, day);
        const startTime = new Date(2023, 11, day, 8, 0);
        const endTime = new Date(2023, 11, day, 18, 15);
        const pauseDuration = new Date(2023, 11, day, 0, 30);
        tableData.push({
            day: dayDate,
            weekday,
            startTime,
            endTime,
            pauseDuration
        });
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="bg-white w-[794px] h-[1048px] p-0">
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
                        <tr>
                            <th>Date</th>
                            <th>Weekday</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Pause Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((rowData, index) => {
                            return (
                                <tr key={index}>
                                    <td>{rowData.day.getDate()}</td>
                                    <td>{rowData.weekday}</td>
                                    <td>{TimeHoursMinutes(rowData.startTime)}</td>
                                    <td>{TimeHoursMinutes(rowData.endTime)}</td>
                                    <td>{TimeHoursMinutes(rowData.pauseDuration)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default View;
