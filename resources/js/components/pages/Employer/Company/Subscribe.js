import React from "react";

import logo from "../../../assets/images/logo.png";

import { useNavigate } from "react-router-dom";
import { SubscriptionCard } from "../../Guest/Subscription/Subscription";
import { useAuth } from "../../../default/Session/SessionProvider";
import QueryApi from "../../../Query/QueryApi";

export default function Subscribe() {
    const navigate = useNavigate();
    const user = useAuth();
    const { data, isLoading } = QueryApi(
        ["subscriptionContent"],
        "/api/employer/getSubscriptionContent"
    );
    console.log(data);
    return (
        <form
            onSubmit={(e) => Submit(e)}
            className="flex flex-col items-center justify-center gap-12"
        >
            <img
                src={logo}
                className="mr-auto max-w-[120px] max-h-[120px] ml-6"
            ></img>
            <h1 className="text-torange text-[2rem] font-bold">
                Choose a subscription
            </h1>

            <div className="flex flex-row flex-wrap gap-4 items-center mb-8">
                {data && 
                data?.map((sub, idx) => (
                    <SubscriptionCard
                        sub={sub}
                        key={idx}
                        more={true}
                        navigate={() =>
                            navigate("/employer/cart", {
                                state: { type: sub?.type, price: sub?.price },
                            })
                        }
                    />
                ))}
            </div>
            <button
                type="button"
                className="underline hover:opacity-80"
                onClick={() => navigate("/employer/dashboard")}
            >
                Cancel
            </button>
        </form>
    );
}
