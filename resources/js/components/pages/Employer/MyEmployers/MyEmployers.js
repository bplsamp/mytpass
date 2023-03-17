import React, { useState, useEffect } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import Card from "../../../default/Card/Card";
import { FaUserFriends } from "react-icons/fa";
import { Search } from "../../Admin/Search";
import NoPermission from "./NoPermission";
import Select from "../../../default/Inputs/Select"
import Slider from "@mui/material/Slider";
import UserList from "../UserList";
import QueryApi, { QueryApiPost } from "../../../Query/QueryApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../default/Session/SessionProvider";

const user = {
    role: "business owner",
}

export default function MyEmployers () {

    const navigate = useNavigate();
    const User = useAuth();
    const location = useLocation();
    const currentPath = location?.pathname;

    const [Page, setPage] = useState(0);
    const [SearchText, setSearchText] = useState("");

    const { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api${currentPath}`,
        { page: Page }
    );

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        //refetch();
    };
    
    return (
        <>
            {User?.company?.ownerId != User?.id ? (
                <NoPermission />
            ) : (
                <EmployerPage>
                    <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                        <FaUserFriends className="text-[1.8rem] text-torange" />
                        Employers
                    </Card>
                    <Card className={`mx-4 p-8 flex flex-col gap-4`}>
                        <Search
                            handleSearch={handleSearch}
                            placeholder={`Search Employer...`}
                        />
                    </Card>

                <UserList 
                data={data && data?.filter(
                    (emp) =>
                        emp?.firstName
                            .toLowerCase()
                            .includes(SearchText.toLowerCase()) ||
                        emp?.lastName
                            .toLowerCase()
                            .includes(SearchText.toLowerCase())
                )} 
                user={User} type={`employer`}  refetch={refetch} />

                </EmployerPage>
            )}
        </>
    );
}
