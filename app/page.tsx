'use client';

import CustomInput from '@/components/CustomInput';
import Feedback, { FeedbackProps } from '@/components/Feedback';
import Link from 'next/link';
import { useState } from 'react';

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

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='w-full sm:w-96 px-6 sm:px-0'>
        <div className='flex items-center justify-center text-4xl mb-3 w-full'>
          Time Tracking
        </div>
        <div className='w-full'>
          <form className='w-full' onSubmit={handleSubmit}>
            <CustomInput label='Date' placeholder='DD.MM.YYYY'></CustomInput>
            <CustomInput label='Start Time' placeholder='HH:MM'></CustomInput>
            <CustomInput label='End Time' placeholder='HH:MM'></CustomInput>
            <CustomInput label='Pause Duration' placeholder='HH:MM'></CustomInput>
            <button type='submit' className='bg-blue-600 text-white w-full mt-6 py-2 rounded-md'>Submit</button>
          </form>
        </div>
        {feedback && (
          <Feedback message={feedback.message} state={feedback.state}></Feedback>
        )}
        <div className='w-full flex flex-col items-center justify-center'>
          <Link href='/export' className='bg-blue-900 text-white rounded-md w-full mt-5 py-2 flex justify-center'>Go to Exports</Link>
        </div>
      </div>
    </div>
  )
}
