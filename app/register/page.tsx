'use client';

import React, {useState} from "react";
import CustomInput from "@/components/CustomInput";
import Feedback, {FeedbackProps} from "@/components/Feedback";
import Link from "next/link";

const exportPage = () => {
    const [feedback, setFeedback] = useState<FeedbackProps>();

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));

        if (Object.values(data).some(value => value === '')) {
            setFeedback({
                state: 'Error',
                message: 'Please fill out all fields.'
            });
            return;
        }
        if (data['Password'] !== data['Repeat_Password']) {
            setFeedback({
                state: 'Error',
                message: 'Passwords do not match.'
            });
            return;
        }

        /**
         * These are the fields that are required by the backend
         */
        const bodyData = {
            email: data['E-Mail'],
            password: data['Password'],
            firstName: data['First_Name'],
            lastName: data['Last_Name']
        }

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
            .then(data => {
                if (data.ok) {
                    setFeedback({
                        state: 'Success',
                        message: 'Account created successfully.'
                    });
                    (e.target as HTMLFormElement).reset();
                } else {
                    if (data.status === 409) {
                        setFeedback({
                            state: 'Error',
                            message: 'An account with this email already exists.'
                        });
                        return;
                    } else if (data.status === 400) {
                        setFeedback({
                            state: 'Error',
                            message: 'Please fill out all fields.'
                        });
                        return;
                    }
                    setFeedback({
                        state: 'Error',
                        message: 'Something went wrong! Try again later.'
                    });
                }
            })
            .catch(error => {
                setFeedback({
                    state: 'Error',
                    message: 'Something went wrong! Try again later.'
                });
            });
    }

    return (
        <div className='flex flex-col items-center h-screen'>
            <div className='w-full sm:w-96 px-6 sm:px-0'>
                <div className='flex items-center justify-center text-4xl mt-12 mb-3 w-full'>
                    Register
                </div>
                <form onSubmit={submitHandler}>
                    <CustomInput label={'E-Mail'} placeholder={'mail@example.com'} type={'email'}></CustomInput>
                    <CustomInput label={'First Name'} placeholder={'John'} type={'text'}></CustomInput>
                    <CustomInput label={'Last Name'} placeholder={'Doe'} type={'text'}></CustomInput>
                    <CustomInput label={'Password'} placeholder={'Your-Strong-Password'}
                                 type={'password'}></CustomInput>
                    <CustomInput label={'Repeat Password'} placeholder={'Your-Strong-Password-Again'}
                                 type={'password'}></CustomInput>
                    <button type='submit' className='bg-blue-600 text-white w-full mt-6 py-2 rounded-md'>Register
                    </button>
                </form>
                {feedback && (
                    <Feedback message={feedback.message} state={feedback.state}></Feedback>
                )}
                <div className={'flex items-center justify-center mt-3 text-gray-500'}>
                    Already have an account?<Link href={'/login'} className={'ml-1 underline'}>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default exportPage;