import React, { useState, useEffect } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import DeactivatedCompany from "../Company/DeactivatedCompany";
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
    const [SortBy, setSortBy] = useState("Default");
    const [Expertise, setExpertise] = useState("");

    const queryParameters = new URLSearchParams(window.location.search);
    const q = queryParameters.get("q");

    let { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api/employer/search`,
    { page: Page , query: Search}
    );

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (e.target.value == "Default") {
            setExpertise("");
            return;
        }
        setExpertise(value);
    };

    const handleSortBy = (e) => {
        const { name, value } = e.target;

        setSortBy(value);
    };

    return (
        <EmployerPage>
            {user?.company?.companyStatus == "inactive" ? (<DeactivatedCompany/>) 
            : (
            <>
                <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                    <RiUserSearchFill className="text-[1.8rem] text-torange" />
                    Find Employees
                </Card>

                {/* SHOW LIST OF EMPLOYERS HERE */}
                <EmployeeSearch
                handleSearch={handleSearch}
                refetch={refetch}
                Search={Search}
                handleSortBy={handleSortBy}
                handleExpertise={handleInput}
                />
                <UserList data={
                        data?.data &&
                        data?.data?.filter(
                            (emp) =>
                                emp?.expertise
                                    .toLowerCase()
                                    .includes(Expertise.toLowerCase()) &&
                                emp?.lastName
                                    .toLowerCase()
                                    .includes(Search.toLowerCase())
                        )
                    } user={user} type={""}/>
            </>
            )}
        </EmployerPage>
    );
}
