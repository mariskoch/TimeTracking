'use client';

import CustomInput from "@/components/CustomInput";
import { isValidYearMonthFormat } from "@/utils/DateUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Export = () => {
    const router = useRouter();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target as HTMLFormElement));
        const yearAndMonth = (data.Year_and_Month as string).split("-");
        const year = yearAndMonth[0];
        const month = yearAndMonth[1];
        router.push(`/export/view?year=${year}&month=${month}`);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = event.target.value;
        if (isValidYearMonthFormat(value)) {
            setIsSubmitDisabled(false);
        }
    }

    return (
        <div className='flex flex-col h-screen items-center'>
            <div className='w-full sm:w-96 px-6 sm:px-0'>
                <div className='flex justify-center items-center text-4xl mt-12 mb-3 w-full'>
                    Exports
                </div>
                <form onSubmit={handleFormSubmit}>
                    <CustomInput label="Year and Month" placeholder="Pick a Year" type="month" onChange={handleInputChange}></CustomInput>
                    <button className="w-full mt-5 py-2 bg-blue-600 disabled:bg-gray-400 text-white rounded-md" disabled={isSubmitDisabled}>Export</button>
                </form>
                <div className='w-full flex flex-col items-center justify-center'>
                    <Link href='/' className='bg-blue-900 text-white rounded-md w-full mt-5 py-2 flex justify-center'>Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Export;
