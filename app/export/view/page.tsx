import ExportTableSchema from '@/utils/ExportTableSchema';
import { useSearchParams } from 'next/navigation';
import { TimeHoursMinutes, areDatesOnSameDay, getFirstDayOfMonth, getMonthName, getNumberOfDaysInMonth, getWeekdayOfDate } from '@/utils/DateUtils';
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

    const monthName = getMonthName(month);

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

        let startTime, endTime, pauseDuration;

        if (workTimeEntries.length > 0 && areDatesOnSameDay(dayDate, workTimeEntries[0].day)) {
            startTime = workTimeEntries[0].start;
            endTime = workTimeEntries[0].end;
            pauseDuration = workTimeEntries[0].pause;
            workTimeEntries.shift();
        } else {
            const date = new Date();
            date.setUTCHours(0);
            date.setUTCMinutes(0);
            startTime = date;
            endTime = date;
            pauseDuration = date;
        }

        tableData.push({
            day: dayDate,
            weekday,
            startTime,
            endTime,
            pauseDuration
        });
    }

    return (
        <div className='flex justify-center my-4'>
            <div className="bg-white w-[794px] h-[1048px] p-0">
                <div className="text-xl mx-10 my-3">
                    {firstName} {lastName}, {monthName} {year}
                </div>
                <div className='mx-4'>
                    <table className='w-full text-left text-sm font-light'>
                        <thead className='border-b font-medium'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>Date</th>
                                <th scope='col' className='px-6 py-3'>Weekday</th>
                                <th scope='col' className='px-6 py-3'>Start Time</th>
                                <th scope='col' className='px-6 py-3'>End Time</th>
                                <th scope='col' className='px-6 py-3'>Pause Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((rowData, index) => {
                                return (
                                    <tr key={index} className='border-b'>
                                        <td className='whitespace-nowrap px-6 py-1'>{rowData.day.getDate()}</td>
                                        <td className='whitespace-nowrap px-6 py-1'>{rowData.weekday}</td>
                                        <td className='whitespace-nowrap px-6 py-1'>{TimeHoursMinutes(rowData.startTime)}</td>
                                        <td className='whitespace-nowrap px-6 py-1'>{TimeHoursMinutes(rowData.endTime)}</td>
                                        <td className='whitespace-nowrap px-6 py-1'>{TimeHoursMinutes(rowData.pauseDuration)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default View;
