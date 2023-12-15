'use client';

import React, {useState} from "react";
import CustomInput from "@/components/CustomInput";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import Feedback, {FeedbackProps} from "@/components/Feedback";

const loginPage = () => {
    const [feedback, setFeedback] = useState<FeedbackProps>();
    const router = useRouter();

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));

        signIn('credentials', {
            email: data['E-Mail'],
            password: data['Password'],
            redirect: false,
        })
            .then((res) => {
                console.log(res);
                if (res?.ok) {
                    console.log('redirecting')
                    router.push('/');
                } else {
                    setFeedback({
                        state: 'Error',
                        message: 'Invalid credentials.'
                    });
                }
            });
    }

    return (
        <div className='flex flex-col items-center h-screen'>
            <div className='w-full sm:w-96 px-6 sm:px-0'>
                <div className='flex items-center justify-center text-4xl mt-12 mb-3 w-full'>
                    Login
                </div>
                <form onSubmit={submitHandler}>
                    <CustomInput label={'E-Mail'} placeholder={'mail@example.com'} type={'email'}></CustomInput>
                    <CustomInput label={'Password'} placeholder={'********'} type={'password'}></CustomInput>
                    <button type='submit' className='bg-blue-600 text-white w-full mt-6 py-2 rounded-md'>Login
                    </button>
                </form>
                {feedback && (
                    <Feedback message={feedback.message} state={feedback.state}></Feedback>
                )}
            </div>
        </div>
    )
}

export default loginPage;