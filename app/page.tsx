'use client';

import CustomInput from '@/components/CustomInput';
import Feedback, {FeedbackProps} from '@/components/Feedback';
import Link from 'next/link';
import React, {useState} from 'react';
import {getDateAsString, transformDataFormat} from "@/utils/DateUtils";
import {formatTime} from "@/utils/TimeUtils";
import {signIn, signOut} from "next-auth/react";

export default function Home() {
    const [feedback, setFeedback] = useState<FeedbackProps>();

    function setError(): void {
        setFeedback({
            state: 'Error',
            message: 'Something went wrong! Try again later.'
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));

        data['Date'] = transformDataFormat(data['Date'] as string);

        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(data => {
                if (data.ok) {
                    setFeedback({
                        state: 'Success',
                        message: 'Time submitted successfully.'
                    });
                    (event.target as HTMLFormElement).reset();
                } else {
                    setError()
                }
            })
            .catch(error => {
                setError()
            });
    }

    function onlyNumbers(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        if (!/^\d+$/.test(value)) {
            event.target.value = value.slice(0, -1);
            return;
        }
    }

    function handleBlur(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        event.target.value = formatTime(value);
    }

    return (
        <div className='flex flex-col items-center h-screen'>
            <div className='w-full sm:w-96 px-6 sm:px-0 pb-6'>
                <div className='flex items-center justify-center text-4xl mt-12 mb-3 w-full'>
                    Time Tracking
                </div>
                <div className='w-full'>
                    <form className='w-full' onSubmit={handleSubmit}>
                        <CustomInput label='Date' placeholder='DD.MM.YYYY' value={getDateAsString()}
                                     type={"date"}></CustomInput>
                        <CustomInput label='Start Time' placeholder='HH:MM' onChange={onlyNumbers}
                                     onBlur={handleBlur} inputMode={"numeric"}></CustomInput>
                        <CustomInput label='End Time' placeholder='HH:MM' onChange={onlyNumbers}
                                     onBlur={handleBlur} inputMode={"numeric"}></CustomInput>
                        <CustomInput label='Pause Duration' placeholder='HH:MM' onChange={onlyNumbers}
                                     onBlur={handleBlur} inputMode={"numeric"}></CustomInput>
                        <button type='submit' className='bg-blue-600 text-white w-full mt-6 py-2 rounded-md'>Submit
                        </button>
                    </form>
                </div>
                {feedback && (
                    <Feedback message={feedback.message} state={feedback.state}></Feedback>
                )}
                <div className='w-full flex flex-col items-center justify-center'>
                    <Link href='/export'
                          className='bg-blue-900 text-white rounded-md w-full mt-5 py-2 flex justify-center'>Go to
                        Exports</Link>
                </div>
                <button className={'bg-red-800 text-white rounded-md w-full mt-5 py-2 flex justify-center'}
                        onClick={() => signIn()}>Sign in
                </button>
                <button className={'bg-gray-800 text-white rounded-md w-full mt-5 py-2 flex justify-center'}
                        onClick={() => signOut({callbackUrl: '/'})}>Sign Out
                </button>
                <div className='w-full flex flex-col items-center justify-center'>
                    <Link href='/register'
                          className='bg-blue-900 text-white rounded-md w-full mt-5 py-2 flex justify-center'>Register</Link>
                </div>
            </div>
        </div>
    )
}
