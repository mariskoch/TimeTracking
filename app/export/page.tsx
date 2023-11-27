'use client';

import CustomInput from "@/components/CustomInput";
import Link from "next/link";

const Export = () => {
    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));

        fetch('/api/export', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => {

            })
            .catch(err => {

            });
    }

    return (
        <div className='flex flex-col h-screen items-center'>
            <div className='w-full sm:w-96 px-6 sm:px-0'>
                <div className='flex justify-center items-center text-4xl mt-12 mb-3 w-full'>
                    Exports
                </div>
                <form onSubmit={handleFormSubmit}>
                    <CustomInput label="Year and Month" placeholder="Pick a Year" type="month"></CustomInput>
                    <button className="w-full mt-5 py-2 bg-blue-600 text-white rounded-md">Export</button>
                </form>
                <div className='w-full flex flex-col items-center justify-center'>
                    <Link href='/' className='bg-blue-900 text-white rounded-md w-full mt-5 py-2 flex justify-center'>Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Export;
