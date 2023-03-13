import React from 'react'
import GuestNavbar from '../../../navbar/GuestNavbar'
import Footer from '../../../footer/Footer'
import GuestPage from '../../../layouts/GuestPage';
import QueryApi from '../../../Query/QueryApi';

export const subscriptions = [
    {
        type: "basic",
        desc: "Up to 30 employees for your company!",
        price: "0",
        style: "bg-[#D9D9D9]",
        button: "FREE",
    },
    {
        type: "premium",
        desc: "Up to 100 employees for your company!",
        price: "2,999/30 days",
        style: "bg-[#BBD6F4]",
        button: "SUBSCRIBE",
    },
    {
        type: "platinum",
        desc: "Up to 1000 employees for your company!",
        price: "4,999/30 days",
        style: "bg-[#FF8E25]",
        button: "SUBSCRIBE",
    },
];

export const SubscriptionCard = ({ sub, more, navigate, user }) => {
    const subscriptionType = user?.company?.subscription?.type;

    return (
        <div
            className={`flex flex-col ${sub?.style} 
            ${sub?.type == subscriptionType || 
                (subscriptionType == null && sub?.type == "basic" && "opacity-60")
            } 
            p-6 items-center justify-center gap-12 shadow-lg hover:scale-105 cursor-pointer rounded-sm`}
        >
            <h1 className="capitalize font-bold">{sub?.type}</h1>
            <div className="text-[1.5rem] max-w-[150px] text-center">
                {sub?.desc}
            </div>
            <span className="py-8">
                {sub?.price == 0 
                ? (<b className="text-[1.5rem] ">FREE</b>) 
                : <b className="text-[1.5rem] ">₱ {sub?.price}/ 30 days</b>}
            </span>
            {more && (
                <button
                    type="button"
                    onClick={() => {
                        if (sub?.type == "basic") {
                            return;
                        }
                        navigate();
                    }}
                    className="button px-6 py-4 relative text-[1.8rem] top-[4rem]"
                >
                    {sub?.button}
                </button>
            )}
        </div>
    );
};

export default function Subscription() {
    const { data } = QueryApi(
        ["subscriptionContent"],
        "/api/employer/getSubscriptionContent"
    );
    return (
        <GuestPage>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-torange text-[2rem] font-bold my-8">
                    List of Subscriptions
                </h1>
                <div className="flex flex-row flex-wrap gap-4 items-center mb-8">
                    {data &&
                        data?.map((sub, idx) => (
                            <SubscriptionCard sub={sub} key={idx} />
                        ))}
                </div>
            </div>
            <Footer />
        </GuestPage>
    );
}
