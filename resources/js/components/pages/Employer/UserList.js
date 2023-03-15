import React from "react";
import Card from "../../default/Card/Card";
import employees from "./users.json";
import { FaUser, FaUserPlus, FaPassport, FaCrown } from "react-icons/fa";
import { BsSuitHeartFill } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
import EmptyState from "../../default/EmptyState/EmptyState";
import avatar from "../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { apost } from "../../shared/query"
import { useAuth } from "../../default/Session/SessionProvider";

export default function UserList({ data, type, user, refetch }) {
    const navigate = useNavigate();
    const User = useAuth();

    const handleRemoveUser = async (e, id) => {
        e.preventDefault();

        await apost("/api/employer/removeUser", {
            id: id,
        });
        refetch();
    };

    const handleTransferOwnership = async (e, id) => {
        await apost("/api/employer/transferOwnership", {
            targetId: id
        });
        refetch();
        window.location.reload();
    };

    return (
        <Card className={`mx-4 p-12 flex flex-col gap-7 mt-4`}>
            {data?.length <= 0 ? (
                <EmptyState />
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
                                    {emp?.training_users?.length ? emp?.training_users?.length : 0}
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

                            {User?.company?.companyStatus == "inactive" ? (<></>) : (<button
                                onClick={async () => {
                                    switch (type) {
                                        case "employee":
                                            break;
                                        case "employer":
                                            break;
                                        default:
                                            const res = await apost("/api/employer/inviteUser", {
                                                senderId: user?.id,
                                                userId: emp?.id,
                                                companyId: user?.companyId,
                                            });
                                            alert(res?.data?.status + res?.data?.message)
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
                                                `/employer/myemployeetpass?id=${emp?.id}`
                                            );
                                        }}
                                    >
                                        <FaPassport />
                                        T-Pass
                                    </button>
                                ) : type == "employer" ? (
                                    <button
                                            className="flex items-center gap-2"
                                            onClick={async (e) =>
                                                await handleTransferOwnership(
                                                    e,
                                                    emp?.id
                                                )
                                            }
                                        >
                                            <FaCrown />
                                            Transfer Ownership
                                        </button>
                                ) : (
                                    <>
                                        <FaUserPlus />
                                        Invite
                                    </>
                                )}
                            </button>)}
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
