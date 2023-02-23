import React from "react";
import Card from "../../default/Card/Card";
import employees from "./users.json";
import { FaUser, FaUserPlus, FaPassport, FaCrown } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import { EmptyState2 } from "../../default/EmptyState/EmptyState";
import avatar from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { apost } from "../../shared/query"

export default function UserList({ data, type, user }) {
    const navigate = useNavigate();

    const handleRemoveUser = async (e, id) => {
        e.preventDefault();

        await apost("/api/employer/removeUser", {
            id: id,
        });
    };
    return (
        <Card className={`mx-4 p-12 flex flex-col gap-7 mt-4`}>
            {data?.length <= 0 ? (
                <EmptyState2 />
            ) : (
                data?.map((emp, i) => (
                    <div
                        key={emp?.id}
                        className="flex flex-row gap-12 border-b-2 border-gray-200 p-2"
                    >
                        <img
                            src={emp?.avatar ? emp?.avatar : avatar}
                            className="max-w-[110px] max-h-[110px] min-h-[110px] min-w-[110px] object-scale-down rounded-full"
                        ></img>
                        <div
                            className="flex flex-col"
                        >
                            <h1 className="font-medium text-[1.5rem] capitalize">
                                {emp?.firstName} {emp?.middleInitial}{". "}
                                {emp?.lastName}
                            </h1>
                            <span className="capitalize">{emp?.expertise}</span>

                            <span className="capitalize">{emp?.specify}</span>
                            <span>
                                <span className="font-medium">
                                    Trainings Taken:{" "}
                                </span>
                                <span className="text-torange font-bold">
                                    {emp?.trainingsTaken}
                                </span>
                            </span>
                        </div>

                        <div
                            className="text-white ml-auto flex items-center gap-4"
                        >
                            <button
                                onClick={() =>
                                    navigate(`/employer/user?id=${emp?.id}`)
                                }
                                className="bg-blue-500 px-4 rounded-md py-1 flex items-center gap-2 hover:opacity-80"
                            >
                                <FaUser />
                                {type == "employee" || type == "employer"
                                    ? "Profile"
                                    : "View"}
                            </button>
                            <button
                                onClick={() => {
                                    switch (type) {
                                        case "employee":
                                            break;
                                        case "employer":
                                            break;
                                        default:
                                            apost("/api/employer/inviteUser", {
                                                senderId: user?.id,
                                                userId: emp?.id,
                                                companyId: user?.companyId,
                                            });
                                            alert("User invited successfully")
                                            break;
                                    }
                                }}
                                className=" bg-torange rounded-md px-4 py-1 flex items-center gap-2 hover:opacity-80"
                            >
                                {type == "employee" ? (
                                    <button
                                        className="flex items-center gap-2"
                                        onClick={() => {
                                            navigate(
                                                `/employer/tpass?id=${emp?.id}`
                                            );
                                        }}
                                    >
                                        <FaPassport />
                                        T-Pass
                                    </button>
                                ) : type == "employer" ? (
                                    <>
                                        <FaCrown />
                                        Transfer Ownership
                                    </>
                                ) : (
                                    <>
                                        <FaUserPlus />
                                        Invite
                                    </>
                                )}
                            </button>
                            <button className="bg-red-600 rounded-md px-4 py-1 flex items-center gap-2 hover:opacity-80">
                                {type == "employee" || type == "employer" ? (
                                    <button
                                    className="flex items-center gap-2"
                                    onClick={(e) => {
                                        handleRemoveUser(e, emp?.id);
                                    }}>
                                        <BiExit />
                                        Remove
                                    </button>
                                ) : (
                                    <>
                                        <BsSuitHeartFill />
                                        Like
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))
            )}
        </Card>
    );
}
