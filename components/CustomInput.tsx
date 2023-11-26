interface InputFieldProps {
    label: string;
    placeholder: string;
    type?: "text" | "password" | "email" | "number";
}

const CustomInput: React.FC<InputFieldProps> = ({ label, placeholder, type = "text" }) => {
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
                name={label.replace(' ', '_')}
            />
        </div>
    );
}

export default CustomInput;
