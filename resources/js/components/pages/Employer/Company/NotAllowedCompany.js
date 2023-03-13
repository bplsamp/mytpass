import React from "react";
import { BsBuilding } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { VscPreview } from "react-icons/vsc";
export default function NotAllowedCompany() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
            <VscPreview className="text-[15rem] text-torange" />
            <span className="text-medium text-[2rem] text-yellow-500">
                No access to employer side.
            </span>
        </div>
    );
}
