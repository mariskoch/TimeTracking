'use client';

import ExportTableSchema from '@/utils/ExportTableSchema';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const View = () => {
    const [content, setContent] = useState<ExportTableSchema[]>();

    const searchParams = useSearchParams();
    const year = searchParams.get('year') ?? '1970';
    const month = searchParams.get('month') ?? '0';
    const body = JSON.stringify({ year, month, });

    useEffect(() => {
        const fetchContent = async () => {
            setContent(await (await fetch('/api/export', {
                method: 'GET',
                body,
            })).json());
        };
        fetchContent();
    }, []);

    return (
        <>

        </>
    );
}

export default View;
