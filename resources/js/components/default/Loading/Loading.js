import React from 'react';
import { Oval } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Oval
                height={50}
                width={50}
                color="#E0701D"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#00000"
                strokeWidth={4}
                strokeWidthSecondary={4}
            />
        </div>
    )
};

