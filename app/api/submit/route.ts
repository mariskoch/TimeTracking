import { prisma } from "@/client";
import {getServerSession} from "next-auth";
import {options} from "@/app/api/auth/[...nextauth]/options";

export async function POST(request: Request) {
    const session = await getServerSession(options);
    if (!session) {
        return new Response(null, {
            status: 401,
        });
    }

    const body = await request.json();
    const date = createDateFromString(body.Date);
    const startTime = createDateFromTimeString(body.Start_Time);
    const endTime = createDateFromTimeString(body.End_Time);
    const pauseDuration = createDateFromTimeString(body.Pause_Duration);

    const workTimeEntry = await prisma.workTimeEntry.upsert({
        where: {
            day_userId: {
                day: date,
                userId: session.user.id,
            }
        },
        create: {
            userId: session.user.id,
            day: date,
            start: startTime,
            end: endTime,
            pause: pauseDuration,
        },
        update: {
            start: startTime,
            end: endTime,
            pause: pauseDuration,
        }
    });

    console.log(workTimeEntry);

    return new Response(null, {
        status: workTimeEntry ? 200 : 500,
    });
}

function createDateFromString(dateString: string): Date {
    const dateParts = dateString.split('.');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);

    const date = new Date();
    date.setUTCFullYear(year);
    date.setUTCMonth(month);
    date.setUTCDate(day);

    return date;
}

function createDateFromTimeString(timeString: string): Date {
    const [hoursStr, minutesStr] = timeString.split(':');

    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const currentDate = new Date();
    currentDate.setUTCHours(hours);
    currentDate.setUTCMinutes(minutes);
    currentDate.setUTCSeconds(0);
    currentDate.setUTCMilliseconds(0);

    return currentDate;
}
