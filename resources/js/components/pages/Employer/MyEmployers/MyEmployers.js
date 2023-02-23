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

    const { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api${currentPath}`,
        { page: Page }
    );

    console.log(data);

    useEffect (() => {
        localStorage.setItem('pathkey', JSON.stringify(currentPath))
    }, [User])
    
    return (
        <>
            {user?.role != "business owner" ? (
                <NoPermission />
            ) : (
                <EmployerPage>
                    <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                        <FaUserFriends className="text-[1.8rem] text-torange" />
                        Employers
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
                    <div className="flex flex-row justify-around">
                    <div className="flex flex-col">
                        <Select
                            labelStyle={`mr-auto ml-auto`}
                            label={`Expertise`}
                            options={["Test1", "Test2", "Test3"]}
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex flex-col  items-center justify-center">
                            <label>Trainings Taken</label>
                            <div className="flex flex-row min-w-[400px] gap-4 items-center">
                                <span>0</span>

                                <Slider value={[0, 100]} />

                                <span>100</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Select
                            label={`Sort`}
                            labelStyle={`mr-auto ml-auto`}
                            options={["Test1", "Test2", "Test3"]}
                        />
                    </div>
                </div>
                </Card>

                <UserList data={data?.data} user={User} type={`employer`} />

                </EmployerPage>
            )}
        </>
    );
}
