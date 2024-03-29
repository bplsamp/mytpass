import React from "react";
import { useNavigate } from "react-router-dom";
import { VscError } from "react-icons/vsc";
export default function NotAllowedCompany() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
            <VscError className="text-[15rem] text-torange" />
            <span className="text-medium text-[2rem] text-yellow-500">
                Sorry, You Have No Access To Employer Side.
            </span>
        </div>
    );
}
