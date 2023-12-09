import React from "react";

interface InputFieldProps {
    label: string;
    placeholder: string;
    type?: "text" | "password" | "email" | "number" | "month" | "time" | "date";
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value?: string;
    inputMode?: "numeric" | "decimal" | "tel" | "search" | "email" | "url" | "text";
}

const CustomInput: React.FC<InputFieldProps> = ({ label, placeholder, type = "text", onChange, onBlur, value, inputMode}) => {
    return (
        <div className='mt-5 w-full flex justify-center flex-col'>
            <label htmlFor={label} className='font-medium mb-1'>
                {label}
            </label>
            <input
                className='bg-gray-50 border border-gray-300 rounded-lg p-2.5 w-full'
                type={type}
                id={label}
                placeholder={placeholder}
                name={label.replaceAll(' ', '_')}
                onChange={onChange}
                onBlur={onBlur}
                defaultValue={value}
                inputMode={inputMode}
            />
        </div>
    );
}

export default CustomInput;
