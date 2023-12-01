'use client';

import ExportTableSchema from '@/utils/ExportTableSchema';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TimeHoursMinutes } from '@/utils/DateUtils';

const View = () => {
    const [content, setContent] = useState<ExportTableSchema[]>();

    const searchParams = useSearchParams();
    const year = searchParams.get('year') ?? '1970';
    const month = searchParams.get('month') ?? '0';
    const body = JSON.stringify({ year, month, });

    const firstName = 'Johanna';
    const lastName = 'Scherer';

    useEffect(() => {
        const fetchContent = async () => {
            const res = await (await fetch(`/api/export?year=${year}&month=${month}`, { method: 'GET' })).json()
            res.forEach((element: ExportTableSchema) => {
                element.day = new Date(element.day);
                element.endTime = new Date(element.endTime);
                element.pauseDuration = new Date(element.pauseDuration);
                element.startTime = new Date(element.startTime);
            });
            setContent(res);
        };
        fetchContent();
    }, []);

    return (
        <div className='flex items-center justify-center'>
            {content === undefined ? (
                <div>Loading...</div>
            ) : (
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
                            <tr>
                                <th>Date</th>
                                <th>Weekday</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Pause Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map((rowData, index) => {
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
            )}
        </div>
    );
}

export default View;
