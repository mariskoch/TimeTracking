'use client';

import React, {useState} from "react";
import CustomInput from "@/components/CustomInput";
import {signIn} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import Feedback, {FeedbackProps} from "@/components/Feedback";
import Link from "next/link";
import {BarLoader} from "react-spinners";

const loginPage = () => {
    const [feedback, setFeedback] = useState<FeedbackProps>();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setLoading] = useState<boolean>(false);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.refresh();
        setLoading(true);

        const data = Object.fromEntries(new FormData(e.target as HTMLFormElement));

        signIn('credentials', {
            email: data['E-Mail'],
            password: data['Password'],
            redirect: false,
        })
            .then((res) => {
                if (res?.ok) {
                    router.replace(searchParams.get('callbackUrl') || '/');
                } else {
                    setFeedback({
                        state: 'Error',
                        message: 'Invalid credentials.'
                    });
                    setLoading(false);
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
                    <button type='submit' className='bg-blue-600 text-white w-full mt-6 py-2 rounded-md disabled:bg-blue-300' disabled={isLoading!}>
                        {isLoading ? (
                            <BarLoader
                                color="rgba(33, 33, 33, 0.3)"
                                height={5}
                                loading={true}
                                speedMultiplier={2}
                                width={75}
                                className={'mb-[3px]'}
                            />
                        ) : (
                            'Login'
                        )}
                    </button>
                </form>
                {feedback && (
                    <Feedback message={feedback.message} state={feedback.state}></Feedback>
                )}
                <div className={'flex items-center justify-center mt-3 text-gray-500'}>
                    New here?<Link href={'/register'} className={'ml-1 underline'}>Create an Account</Link>
                </div>
            </div>
        </div>
    )
}

export default loginPage;