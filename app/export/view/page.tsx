'use client';

import { useEffect, useState } from 'react';

const View = () => {
    const [html, setHtml] = useState<string>('');

    const body = {
        year: '2023',
        month: '11'
    }

    useEffect(() => {
        const set = async () => {
            setHtml(await (await fetch('/api/export', {
                method: 'POST',
                body: JSON.stringify(body)
            })).text());
        };
        set();
    }, []);

    return (
        <>
            {html && (
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            )}
        </>
    );
}

export default View;
