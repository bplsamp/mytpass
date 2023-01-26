import React from "react";
import { BsBuilding } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export default function NoCompany() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
            <BsBuilding className="text-[15rem] text-torange" />
            <span className="text-medium text-[2rem]">
                You Don’t Have an Exisiting Company Yet.
            </span>

            <button
                onClick={() => navigate("/employer/createcompany")}
                className="button px-6 py-1 text-[2rem]"
            >
                Create
            </button>
        </div>
    );
}
