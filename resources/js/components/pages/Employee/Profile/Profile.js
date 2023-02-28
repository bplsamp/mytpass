import React, { useEffect } from "react";
import VerifyFirst from "../../EmailVerification/VerifyFirst";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { AiFillPrinter } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import avatar from "../../../assets/images/user.png";
import moment from "moment";
import EmployeePage from "../../../layouts/EmployeePage";
import FooterLogged from "../../../footer/FooterLogged";
import { useAuth, useAuthUpdate } from "../../../default/Session/SessionProvider";
import QueryApi from "../../../Query/QueryApi";
import EmptyState from "../../../default/EmptyState/EmptyState";

const Card = ({ text }) => {
    return (
        <div className="bg-torange w-full text-[2rem] text-center">{text}</div>
    );
};

const HeaderName = ({ name, expertise }) => {
    return (
        <div className="bg-torange w-full font-bold relative right-[12rem] text-white rounded-r-[0.5rem] top-8">
            <div className="pl-[12rem] flex flex-col pr-[12rem]">
                <span className="text-[2rem] capitalize">{name}</span>
                <span className="text-[1rem] capitalize">{expertise}</span>
            </div>
        </div>
    );
};

export const ProfileBox = ({ user, navigate, isPublic, trainings }) => {
    
    return (
        <main className="text-gray-800 shadow-gray-300 shadow bg-white flex flex-row rounded-lg mr-auto ml-auto m-8">
            <div className="flex flex-col bg-[#3A3A3A] max-w-[500px] items-center text-white border-l-8 border-torange">
                <img
                    width="150"
                    className="rounded-full border-4 border-lorange z-10 m-8 bg-white max-w-[150px] min-h-[150px] min-w-[150px] max-h-[150px] object-scale-down"
                    src={user?.avatar ? user?.avatar : avatar}
                />

                <Card text={`Profile`} />

                <p className="p-8 text-justify">
                    {user?.bio ? user?.bio : "Nothing is here..."}
                </p>

                <Card text={`Contact`} />
                <div className="flex flex-col gap-4 m-8 ">
                    <div className="flex flex-row items-center gap-4">
                        <MdEmail className="text-[1.5rem]" />
                        <span>{user?.email ? user?.email : "No email..."}</span>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <MdPhone className="text-[1.5rem]" />
                        <span>+{user?.contact ? user?.contact : "No contact..."}</span>
                    </div>
                        {user?.companyId ? (
                        <div className="flex flex-row items-center gap-4">
                            <FaBuilding className="text-[1.5rem]" />

                            <span>
                                {user?.companyId == null
                                    ? "none"
                                    : user?.company?.companyStatus == "active" || "request deactivation"
                                    ? user?.company?.companyName
                                    : "none"}
                            </span>
                            {user?.company?.icon && (
                                <img
                                    src={user?.company?.icon}
                                    className="max-w-[40] max-h-[40px] min-h-[40px] min-w-[40px] rounded-full object-scale-down border border-blue-400"
                                ></img>
                            )}
                    </div>) : (<></>)}
                </div>
            </div>

            <div className="flex flex-col p-8 gap-8">
                <HeaderName
                    name={
                        user
                            ? `${user?.firstName} ${user?.middleInitial} ${user?.lastName}`
                            : "Loading..."
                    }
                />
                <div className="flex flex-row gap-[10rem] pt-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-[1.4rem]">
                            Expertise
                        </span>
                        <span className="capitalize">{user?.expertise}</span>
                        <span className="font-bold text-[1.4rem]">
                            Specific Expertise
                        </span>
                        <span className="capitalize">{user?.specify}</span>
                    </div>

                    {isPublic ? (
                        <></>
                    ) : (
                        <div className="flex flex-col ml-auto gap-2">
                            <button
                                onClick={() => {
                                    navigate("/editprofile");
                                }}
                                className="flex flex-row items-center justify-center gap-2 text-[0.9rem] bg-lorange text-white rounded-md px-8 py-1 hover:opacity-80"
                            >
                                <AiFillEdit />
                                Edit Profile
                            </button>
                            <button className="flex flex-row items-center justify-center gap-2 text-[0.9rem] bg-lorange text-white rounded-md px-8 py-1 hover:opacity-80">
                                <AiFillPrinter />
                                Print
                            </button>
                        </div>
                    )}
                </div>

                <section className="flex flex-col ">
                    <span className="text-torange text-[1.5rem] font-bold">
                        My Training Passport
                    </span>
                    <table>
                        <thead className="text-left">
                            <tr>
                                <th>Training Title</th>
                                <th>Completion Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-left">
                            {trainings &&
                            trainings?.map((training) => (
                                <tr
                                    key={training?.id}
                                    className="border-b-2 border-gray-200"
                                >
                                    <td className="p-2">{training?.title}</td>
                                    <td className="p-2">
                                        {moment(
                                            new Date(training?.completionDate)
                                        ).format("MM/DD/YYYY")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </main>
    );
};

export default function Profile() {

    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();

    const location = useLocation();
    const currentPath = location?.pathname;

    const { data } = QueryApi(["trainings"], "/api/trainings/get");

    useEffect (() => {
    localStorage.setItem('pathkey', JSON.stringify(currentPath))
    }, [User])

    return (
        <EmployeePage>
            {data && (
                <ProfileBox user={User} navigate={navigate} trainings={data} />
            )}
            <FooterLogged/>
        </EmployeePage>
    );
}
