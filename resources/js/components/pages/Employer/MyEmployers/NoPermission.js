import React from "react";
import { GiLaserWarning } from "react-icons/gi";
import EmployerPage from "../../../layouts/EmployerPage";

export default function NoPermission() {
    return (
        <EmployerPage>
            <div className="flex flex-col items-center justify-center min-h-[80vh]">
                <GiLaserWarning className="text-[15rem] text-torange" />
                <span className="text-medium text-[2rem]">
                    You Don't Have Access in This Page.
                </span>
            </div>
        </EmployerPage>
    );
}
