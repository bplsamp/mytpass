import React from "react";
import { MdHourglassDisabled } from "react-icons/md";
export default function EmptyState() {
    return (
        <div className="min-h-[50vh] flex items-center justify-center flex-row">
            <MdHourglassDisabled className="text-[8rem] text-torange" />
            <span>No Results Found</span>
        </div>
    );
}


export function EmptyState2() { 
    return (
        <div className="min-h-[47vh] flex items-center justify-center flex-row">
            <MdHourglassDisabled className="text-[8rem] text-torange" />
            <span>No Results Found</span>
        </div>
    );
}