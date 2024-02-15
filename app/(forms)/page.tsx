'use client';

import CustomInput from '@/components/CustomInput';
import Feedback, {FeedbackProps} from '@/components/Feedback';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {getDateAsString, transformDataFormat} from "@/utils/DateUtils";
import {formatTime} from "@/utils/TimeUtils";
import {useSession} from "next-auth/react";
import {BarLoader} from "react-spinners";

export default function Home() {
    const [feedback, setFeedback] = useState<FeedbackProps>();
    const [isSubmitLoading, setSubmitLoading] = useState<boolean>(false);
    const [isExportLoading, setExportLoading] = useState<boolean>(false);
    const session = useSession();

    useEffect(() => {
        setSubmitLoading(false);
        setExportLoading(false);
    }, [])

    function setError(): void {
        setFeedback({
            state: 'Error',
            message: 'Something went wrong! Try again later.'
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitLoading(true);
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));

        const chosenDate = data['Date'];

        data['Date'] = transformDataFormat(data['Date'] as string);

        fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok) {
                    setFeedback({
                        state: 'Success',
                        message: 'Time submitted successfully.'
                    });
                    (event.target as HTMLFormElement).reset();

                    // moving the day forward by one
                    const date = new Date(chosenDate as string);
                    date.setDate(date.getDate() + 1);

                    // if the day is a sunday, move it to monday
                    if (date.getDay() === 0) {
                        date.setDate(date.getDate() + 1);
                    }

                    // set the date input
                    (document.getElementById('Date') as HTMLInputElement).value = getDateAsString(date);
                    setSubmitLoading(false);
                } else {
                    setError()
                    setSubmitLoading(false);
                }
            })
            .catch(error => {
                setError()
                setSubmitLoading(false);
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
                        <button type='submit'
                                className={`bg-blue-600 text-white w-full mt-6 py-2 rounded-md disabled:bg-gray-500`}
                                disabled={session.status !== 'authenticated' || isSubmitLoading}>
                            {isSubmitLoading ? (
                                <BarLoader
                                    color="rgba(200, 200, 200, 0.3)"
                                    height={5}
                                    loading={true}
                                    speedMultiplier={2}
                                    width={75}
                                    className={'mb-[3px]'}
                                />
                            ) : (
                                session.status === 'authenticated' ? 'Submit' : 'Login to track you time'
                            )}
                        </button>
                    </form>
                </div>
                {feedback && (
                    <Feedback message={feedback.message} state={feedback.state}></Feedback>
                )}
                {session.status === 'authenticated' && (
                    <div className='w-full flex flex-col items-center justify-center'>
                        <Link href='/export' onClick={() => {
                            setExportLoading(true);
                        }}
                              className='bg-blue-900 text-white rounded-md w-full mt-5 py-2 flex justify-center h-[40px] disabled:bg-gray-500'>
                            {isExportLoading ? (
                                <BarLoader
                                    color="rgba(200, 200, 200, 0.3)"
                                    height={5}
                                    loading={true}
                                    speedMultiplier={2}
                                    width={75}
                                    className={'mt-[10px]'}
                                />
                            ) : (
                                'Go to Exports'
                            )}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
