import { prisma } from "@/client";
import { getFirstDayOfMonth, getNumberOfDaysInMonth, getWeekdayOfDate } from "@/utils/DateUtils";
import ExportTableBuilder from "@/utils/ExportTableBuilder";
import ExportTableSchema from "@/utils/ExportTableSchema";
import { NextRequest } from "next/server";
import reactElementToJSXString from "react-element-to-jsx-string";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const y = searchParams.get('year');
    const m = searchParams.get('month');
    const year = y ? parseInt(y) : 1970;
    const month = m ? parseInt(m) : 0;

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

    const exportHTMLString = ExportTableBuilder.build('Johanna', 'Scherer', tableData);
    
    return new Response(reactElementToJSXString(exportHTMLString), {
        status: 200
    });
}