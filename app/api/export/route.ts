import { prisma } from "@/client";

export async function POST(request: Request) {
    const data = (await request.json()).Year_and_Month;
    const [year, month] = data.split('-');

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

    return new Response(null, {
        status: 200
    });
}
