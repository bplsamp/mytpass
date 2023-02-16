import React from "react";
import { AiFillWarning } from "react-icons/ai";
export default function Error({ err }) {
    return (
        <div className="min-h-[50vh] flex-col flex items-center justify-center">
            <AiFillWarning className="text-yellow-400 text-[7rem]" />
            <span className="font-bold">ERROR</span>
            <span>{err?.message}</span>
        </div>
    );
}
