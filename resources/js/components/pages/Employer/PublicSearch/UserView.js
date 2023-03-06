import React, { useEffect, useState } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import { FaUserTie } from "react-icons/fa";
import Card from "../../../default/Card/Card";
import QueryApi from "../../../Query/QueryApi";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfileBox } from "../../Employee/Profile/Profile";
import { IoChevronBack } from "react-icons/io5";
import { QueryApiPost } from "../../../Query/QueryApi";
export default function UserView({}) {
    const location = useLocation();
    const currentPath = location?.pathname;
    const navigate = useNavigate();

    const [User, setUser] = useState({});
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("id");
    console.log(id)

    const { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api${currentPath}`,
        { id: id }
    );

    const { data: userTrainings } = QueryApi(
        ["trainings"],
        "/api/trainings/getById",
        null,
        {
            id: id,
        }
    );

    console.log("trainings", userTrainings);

    useEffect(() => {
        if (data?.user) {
            setUser({
                ...data?.user,
                company: data?.company,
            })
        }
    },[data])
    


    console.log(data);
    return (
        <EmployerPage>
            <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                <FaUserTie className="text-[1.8rem] text-torange" />
                Employee Profile
            </Card>
            <Card className={`flex justify-center mx-4`}>
                <IoChevronBack
                    onClick={() => navigate(-1)}
                    className="text-torange text-[3rem] m-2 rounded-full border-gray-200 border p-2 hover:opacity-50 cursor-pointer"
                />
                <ProfileBox user={User} isPublic={true} trainings={userTrainings && userTrainings} />
            </Card>
        </EmployerPage>
    );
}
