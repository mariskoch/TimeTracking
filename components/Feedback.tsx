import React from "react";

export interface FeedbackProps {
    state: "Success" | "Error",
    message: string
}

const Feedback: React.FC<FeedbackProps> = ({ message, state }) => {
    return (
        <div className={`mt-5 ${state === 'Success' ? 'bg-green-400' : 'bg-red-400'} w-full rounded-md font-medium flex justify-center`}>
            <div className="m-2">
                {message}
            </div>
        </div>
    );
}

export default Feedback;
