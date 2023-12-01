interface InputFieldProps {
    label: string;
    placeholder: string;
    type?: "text" | "password" | "email" | "number" | "month" | "time";
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const CustomInput: React.FC<InputFieldProps> = ({ label, placeholder, type = "text", onChange = () => {} }) => {
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
            />
        </div>
    );
}

export default CustomInput;
