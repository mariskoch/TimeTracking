import ExportTableSchema from '@/utils/ExportTableSchema';
import {
    areDatesOnSameDay,
    calculateWorkTime,
    getFirstDayOfMonth,
    getMonthName,
    getNumberOfDaysInMonth,
    getWeekdayOfDate,
    TimeHoursMinutes
} from '@/utils/DateUtils';
import {prisma} from '@/client';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import Weekday from "@/utils/Weekdays";

const View = async ({searchParams, params: {lang}}: { searchParams: { [key: string]: string | string[] | undefined }, params: {lang: string} }) => {
    const session = await getServerSession(options);
    const yearParam = searchParams.year;
    const year = Array.isArray(yearParam) ? parseInt(yearParam[0], 10) : parseInt(yearParam || '1970', 10);

    const monthParam = searchParams.month;
    const month = Array.isArray(monthParam) ? parseInt(monthParam[0], 10) : parseInt(monthParam || '1', 10);

    /**
     * This is an example of how to secure a page for viewing only by users who are authenticated.
     * If the user is not authenticated, redirect to the login page.
     */
    if (!session) {
        redirect(`/login?callbackUrl=%2Fview%3Fyear%3D${year}%26month%3D${month}`);
    }

    const monthName = getMonthName(month);

    const firstName = session.user.firstName;
    const lastName = session.user.lastName;

    const gte = getFirstDayOfMonth(year, month);
    const lt = getFirstDayOfMonth(year, month + 1);

    const workTimeEntries = await prisma.workTimeEntry.findMany({
        where: {
            day: {
                gte,
                lt,
            },
            userId: session.user.id
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
            <div className="bg-white w-[794px] h-[1048px] p-0 overflow-x-auto mx-3">
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
                            <th scope='col' className='px-6 py-3'>Work Time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((rowData, index) => {
                            return (
                                <tr key={index}
                                    className={`border-b ${rowData.weekday === Weekday.Sunday && TimeHoursMinutes(rowData.startTime) === '00:00' ? 'bg-gray-300' : ''}`}>
                                    <td className='whitespace-nowrap px-6 py-1'>{rowData.day.getDate()}</td>
                                    <td className='whitespace-nowrap px-6 py-1'>{rowData.weekday}</td>
                                    <td className='whitespace-nowrap px-6 py-1'>
                                        {TimeHoursMinutes(rowData.startTime) === '00:00' && TimeHoursMinutes(rowData.endTime) === '00:00' ? '' : TimeHoursMinutes(rowData.startTime)}
                                    </td>
                                    <td className='whitespace-nowrap px-6 py-1'>
                                        {TimeHoursMinutes(rowData.startTime) === '00:00' && TimeHoursMinutes(rowData.endTime) === '00:00' ? '' : TimeHoursMinutes(rowData.endTime)}
                                    </td>
                                    <td className='whitespace-nowrap px-6 py-1'>
                                        {TimeHoursMinutes(rowData.startTime) === '00:00' && TimeHoursMinutes(rowData.endTime) === '00:00' ? '' : TimeHoursMinutes(rowData.pauseDuration)}
                                    </td>
                                    <td className='whitespace-nowrap px-6 py-1'>
                                        {TimeHoursMinutes(rowData.startTime) === '00:00' && TimeHoursMinutes(rowData.endTime) === '00:00' ? '' : calculateWorkTime(rowData.startTime, rowData.endTime, rowData.pauseDuration)}
                                    </td>
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
