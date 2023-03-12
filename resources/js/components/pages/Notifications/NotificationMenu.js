import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { CardShadow } from "../../default/Card/Card";
import Card from "../../default/Card/Card";
import avatar from "../../assets/images/user.png";
import { apost } from "../../shared/query";
import { toast, Toaster} from "react-hot-toast";
import { IoMdClose } from "react-icons/io";

const NotificationCard = ({ notif, refetch, getUser }) => {
    let split = notif?.content.split("has invited you to their company");
    let [sender, company] = split;
    let content = "has invited you to their company";

const handleAcceptCompany = async (e, notifId) => {
    e.preventDefault();
    const res = await apost(
        "/api/acceptCompany",
        { id: notifId },
        refetch
    );

    //if(res?.data?.status == "failed") alert("User already in a company.");
    console.log(1111111, res?.data);
    alert(res?.data?.status + ": " + res?.data?.message)

    setTimeout(() => {
        getUser();
    }, 1000)
};

const handleRejectCompany = (e, notifId) => {
    e.preventDefault();
    apost(
        "/api/rejectCompany",
        { id: notifId },
        refetch
    );
};

const trashNotif = (e, notifId) => {
    e.preventDefault();
    apost(
        "/api/trashNotif",
        { id: notifId },
        refetch
    );
    console.log(notifId)
};

    return (
        <div className="flex flex-col border-b border-gray-200 pl-4 pr-4 py-2">
            <div className="flex flex-row gap-6">
                <img
                    src={notif?.from?.avatar ? notif?.from?.avatar : avatar}
                    className="rounded-full max-w-[59px] max-h-[59px]"
                />
                <span className="max-w-[300px]">
                    <span className="font-bold">
                        {notif?.from?.firstName} {notif?.from?.lastName}
                    </span>{" "}
                    <span>
                        {notif?.content}
                    </span>
                </span>
                <button
                    onClick={(e) => trashNotif(e, notif?.id)}
                >
                    <IoMdClose
                        className="ml-auto hover:text-red-700 cursor-pointer text-[1.5rem]"
                    />
                </button>
                
            </div>
            {notif?.trainingId == null ? (
                <div className="flex flex-row ml-auto gap-4">
                    <button
                        onClick={(e) => handleAcceptCompany(e, notif?.id)}
                        type={`button`}
                        className={`button py-2 text-[1.2rem] hover:opacity-80 flex flex-row items-center justify-center gap-4 
                        !bg-green-500 !shadow-none px-4 py-1 text-white rounded-md hover:opacity-80 !text-[0.8rem]`}
                    >
                        Accept
                    </button>
                    <button 
                    onClick={(e) => handleRejectCompany(e, notif?.id)}
                    type={`button`}
                    className="bg-red-500 px-4 py-1 text-white rounded-md hover:opacity-80 !text-[0.8rem]">
                        Decline
                    </button>
                </div>) : (<></>)
            }
        </div>
    );
};

export default function NotificationMenu({ notifications, refetch, getUser }) {
    return (
        <CardShadow
            className={`absolute top-14 right-[8rem] text-gray-600 py-4 px-2 gap-2 flex flex-col shadow-lg`}
        >
            <h1 className="text-[1.5rem] font-medium">Notifications</h1>
            <div className="flex flex-col flex-wrap">
                {notifications?.length > 0 ? (
                    notifications?.slice(0).reverse().map((notif) => (
                        <NotificationCard
                            notif={notif}
                            refetch={refetch}
                            getUser={getUser}
                        />
                    ))
                ) : (
                    <Card
                        className={`flex flex-col border-b border-gray-200 px-14 py-2`}
                    >
                        No notifications found
                    </Card>
                )}
            </div>
        </CardShadow>
    );
}
