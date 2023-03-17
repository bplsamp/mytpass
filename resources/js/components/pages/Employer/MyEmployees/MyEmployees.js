import React, { useState, useEffect } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import Card from "../../../default/Card/Card";
import { FaUserFriends } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, useAuthUpdate } from "../../../default/Session/SessionProvider";
import EmployeeSearch from "../EmployeeSearch";
import Input from "../../../default/Inputs/Input"
import Select from "../../../default/Inputs/Select"
import Slider from "@mui/material/Slider";
import UserList from "../UserList";
import QueryApi, { QueryApiPost } from "../../../Query/QueryApi";

export default function MyEmployees () {
    const navigate = useNavigate();
    const User = useAuth();

    const location = useLocation();
    const currentPath = location?.pathname;

    const [Page, setPage] = useState(0);
    const [Search, setSearch] = useState("");
    const [SortBy, setSortBy] = useState("Default");
    const [Expertise, setExpertise] = useState("");

    let { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api${currentPath}`,
        { page: Page }
    );

    const handleSearch = (e) => {
        setSearch(e.target.value);
        //refetch();
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

    useEffect(() => {
        if (data) {
            if (SortBy == "Highest Trainings Taken") {
                data = data?.sort(
                    (a, b) =>
                        a?.training_users?.length - b?.training_users?.length
                );
                console.log(data);
            } else if (SortBy == "Lowest Trainings Taken") {
                data = data?.sort(
                    (a, b) =>
                        b?.training_users?.length - a?.training_users?.length
                );
                console.log(data);
            } else {
                data = data?.sort((a, b) =>
                    b?.lastName.localeCompare(a?.firstName)
                );
            }
        }
    }, [SortBy, data]);
    console.log(Expertise);

    return (
    <EmployerPage>
        <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
            <FaUserFriends className="text-[1.8rem] text-torange" />
            Employees
        </Card>

        <EmployeeSearch
                handleSearch={handleSearch}
                handleSortBy={handleSortBy}
                handleExpertise={handleInput}
            />
        
        <UserList data={
            data &&
            data?.filter(
                (emp) =>
                    emp?.expertise
                        .toLowerCase()
                        .includes(Expertise.toLowerCase()) &&
                    emp?.lastName
                        .toLowerCase()
                        .includes(Search.toLowerCase())
            )
        }
            user={User}
            type={`employee`}
            refetch={refetch}
        />
    </EmployerPage>
);
}
