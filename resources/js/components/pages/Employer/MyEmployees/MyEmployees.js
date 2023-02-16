import React, { useState, useEffect } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import Card from "../../../default/Card/Card";
import { FaUserFriends } from "react-icons/fa";

export default function MyEmployees () {

    return (
    <EmployerPage>
        <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
            <FaUserFriends className="text-[1.8rem] text-torange" />
            Employees
        </Card>

        <Card className={`mx-4 p-8 flex flex-col gap-4`}>
            <div className={`flex flex-row w-full gap-12`}>
                <input
                    id="search_users"
                    name="search_users"
                    className="outline-0 px-4 py-2 border border-gray-200 w-full rounded-md"
                    placeholder={`Search Employer...`}
                />
            </div>
        </Card>
    </EmployerPage>
);
}
