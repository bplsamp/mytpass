import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { IoHome } from "react-icons/io5";
import { RxMagnifyingGlass } from "react-icons/rx";
import { FaUserFriends, FaNewspaper, FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/user.png";
import {GiUpgrade}  from "react-icons/gi"
import { useAuth, useAuthUpdate } from "../Session/SessionProvider";
import axios from "axios";
import Cookies from "js-cookie";

const routes = {
    "/employer/myemployees": "My Employees",
    "/employer/myemployers": "My Employers",
    "/employer/trainings": "My Trainings",
    "/employer/trainingrecords": "All Training Records",
};

const row_gap = "gap-4";
const logos = [
    <FaUserFriends />,
    <FaUserFriends />,
    <FaNewspaper />,
    <FaFolderOpen />,
];

export default function SideNav({ withCompany, isActiveCompany }) {

    const location = useLocation();
    const currentPath = location?.pathname;
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();
    const token = Cookies.get("mytpass_session");

    useEffect(() => {
        getUser();
    }, [])


    return (
        <nav className="flex flex-col border-r-2 border-gray-200 p-8 text-gray-600 min-h-screen min-w-[270px] bg-white">
            <div className={`max-w-[120px] max-h-[55px] ml-auto mr-auto`}>
                <img src={logo} className="max-w-[120px] object-cover" />
            </div>
            {withCompany && isActiveCompany ? (
                <>
                    <div className="min-h-[1px] bg-gray-400 w-full"></div>

                    <div className="flex flex-col py-2 gap-2">
                        <Link
                            to={`/employer/dashboard`}
                            className={`flex items-center  ${row_gap} hover:text-torange ${
                                currentPath == "/employer/dashboard"
                                    ? "text-torange font-bold"
                                    : ""
                            }`}
                        >
                            <IoHome /> <span>Home</span>
                        </Link>
                        <Link
                            to={`/employer/search`}
                            className={`flex items-center  ${row_gap} hover:text-torange ${
                                currentPath == "/employer/search"
                                    ? "text-torange font-bold"
                                    : ""
                            }`}
                        >
                            <RxMagnifyingGlass /> <span>Public Search</span>
                        </Link>
                        <Link
                            to={`/employer/upgrade`}
                            className={`flex items-center  ${row_gap} hover:text-torange ${
                                currentPath == "/employer/upgrade"
                                    ? "text-torange font-bold"
                                    : ""
                            }`}
                        >
                            <GiUpgrade /> <span>Upgrade</span>
                        </Link>
                    </div>

                    <span className="font-medium text-[0.8rem]">
                        EMPLOYEES MANAGEMENT
                    </span>
                    <div className="min-h-[1px] bg-gray-400 w-full"></div>
                    <div className="flex flex-col py-4 gap-2">
                        {Object.keys(routes)?.map((route, i) => (
                            <Link
                                key={i}
                                to={route}
                                className={`flex flex-row items-center hover:text-torange ${row_gap} ${
                                    currentPath == route
                                        ? "text-torange font-bold"
                                        : ""
                                }`}
                            >
                                {logos[i]} {routes[route]}
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <></>
            )}

            <footer className="flex flex-row mt-auto gap-2 sticky bottom-6">
                <img
                    
                    className="max-w-[32px] max-h-[32px] object-scale-down"
                    style={{ borderRadius: "50%" }}
                ></img>

                {/*<RxAvatar className="text-[2rem]" />*/}

                <div className="flex flex-col text-[0.7rem]">
                    <span className="text-[0.9rem] text-center capitalize">
                        {User?.firstName + " " + User?.lastName}
                    </span>
                    <Link to={`/employee`} className="underline text-blue-600">
                        Switch To Employee Side
                    </Link>
                    <button 
                    className="underline text-blue-600"
                    onClick={async () => {
                        await axios.post("http://localhost:8000/api/logout",
                        null, {
                            headers: { Authorization: `Bearer ${token}`},
                        })
                        navigate("/")
                    }
                }
                    >
                        Logout
                    </button>
                </div>
            </footer>
        </nav>
    );
}
