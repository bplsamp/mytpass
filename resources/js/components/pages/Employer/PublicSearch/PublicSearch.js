import React, { useState, useEffect } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import Card from "../../../default/Card/Card";
import { RiUserSearchFill } from "react-icons/ri";
import employees from "../users.json";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";

import { useLocation } from "react-router-dom";
import EmployeeSearch from "../EmployeeSearch"
import { useAuth } from "../../../default/Session/SessionProvider";
import { QueryApi, QueryApiPost } from "../../../Query/QueryApi"
import UserList from "../UserList";


export default function PublicSearch() {
    const user = useAuth();
    const location = useLocation();
    const currentPath = location?.pathname;

    const [Page, setPage] = useState(0);
    const [Search, setSearch] = useState("");

    const { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api${currentPath}`,
    { page: Page , query: Search}
    );

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    console.log(data)

    return (
        <EmployerPage>
            <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                <RiUserSearchFill className="text-[1.8rem] text-torange" />
                Find Employees
            </Card>

            {/* SHOW LIST OF EMPLOYERS HERE */}
            <EmployeeSearch
            handleSearch={handleSearch}
            refetch={refetch}
            Search={Search}
            />
            <UserList data={data?.data} user={user}/>

        </EmployerPage>
    );
}
