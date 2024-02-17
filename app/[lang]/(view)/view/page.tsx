import ExportTableSchema from '@/utils/ExportTableSchema';
import {
    areDatesOnSameDay,
    calculateWorkTime,
    getFirstDayOfMonth,
    getNumberOfDaysInMonth,
    TimeHoursMinutes
} from '@/utils/DateUtils';
import {prisma} from '@/client';
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";
import Weekday from "@/utils/Weekdays";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {locale} from "@/middleware";
import Month from "@/utils/Months";

async function getMonthName(month: number, lang: locale): Promise<string> {
    const dict = await getDictionary(lang);
    switch (month) {
        case 1:
            return dict.view.months.january;
        case 2:
            return dict.view.months.february;
        case 3:
            return dict.view.months.march;
        case 4:
            return dict.view.months.april;
        case 5:
            return dict.view.months.may;
        case 6:
            return dict.view.months.june;
        case 7:
            return dict.view.months.july;
        case 8:
            return dict.view.months.august;
        case 9:
            return dict.view.months.september;
        case 10:
            return dict.view.months.october;
        case 11:
            return dict.view.months.november;
        case 12:
            return dict.view.months.december;
        default:
            return Month.Invalid;
    }
}

async function getWeekdayOfDate(year: number, month: number, day: number, lang: locale): Promise<string> {
    const dict = await getDictionary(lang);
    const date = new Date();
    date.setUTCFullYear(year);
    date.setUTCMonth(month - 1);
    date.setUTCDate(day);
    const dayIndex = date.getDay();
    switch (dayIndex) {
        case 1:
            return dict.view.weekdays.short.monday;
        case 2:
            return dict.view.weekdays.short.tuesday;
        case 3:
            return dict.view.weekdays.short.wednesday;
        case 4:
            return dict.view.weekdays.short.thursday;
        case 5:
            return dict.view.weekdays.short.friday;
        case 6:
            return dict.view.weekdays.short.saturday;
        case 0:
            return dict.view.weekdays.short.sunday;
        default:
            return Weekday.Invalid;
    }
}

const View = async ({searchParams, params: {lang}}: { searchParams: { [_key: string]: string | string[] | undefined }, params: {lang: string} }) => {
    const session = await getServerSession(options);
    const yearParam = searchParams.year;
    const year = Array.isArray(yearParam) ? parseInt(yearParam[0], 10) : parseInt(yearParam || '1970', 10);

    const monthParam = searchParams.month;
    const month = Array.isArray(monthParam) ? parseInt(monthParam[0], 10) : parseInt(monthParam || '1', 10);

    const dict = await getDictionary(lang as locale);

    /**
     * This is an example of how to secure a page for viewing only by users who are authenticated.
     * If the user is not authenticated, redirect to the login page.
     */
    if (!session) {
        redirect(`/login?callbackUrl=%2Fview%3Fyear%3D${year}%26month%3D${month}`);
    }

    const monthName = await getMonthName(month, lang as locale);

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
        const weekday = await getWeekdayOfDate(year, month, day, lang as locale);

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
                            <th scope='col' className='px-6 py-3'>{dict.view.table.date}</th>
                            <th scope='col' className='px-6 py-3'>{dict.view.table.weekday}</th>
                            <th scope='col' className='px-6 py-3'>{dict.view.table.startTime}</th>
                            <th scope='col' className='px-6 py-3'>{dict.view.table.endTime}</th>
                            <th scope='col' className='px-6 py-3'>{dict.view.table.pause}</th>
                            <th scope='col' className='px-6 py-3'>{dict.view.table.workTime}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableData.map((rowData, index) => {
                            return (
                                <tr key={index}
                                    className={`border-b ${rowData.weekday === dict.view.weekdays.short.sunday && TimeHoursMinutes(rowData.startTime) === '00:00' ? 'bg-gray-300' : ''}`}>
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
