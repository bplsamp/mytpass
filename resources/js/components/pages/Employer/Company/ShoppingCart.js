import React, {
    useState,
    useContext,
    useEffect,
    useCallback,
    useMemo,
} from "react";

import logo from "../../../assets/images/logo.png";

import { useLocation, useNavigate } from "react-router-dom";
import { subscriptions } from "../../Guest/Subscription/Subscription";
import { SubscriptionCard } from "../../Guest/Subscription/Subscription";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useAuth } from "../../../default/Session/SessionProvider";
import { Pay } from "../../../lib/Paymongo";
import { apost } from "../../../shared/query";

export default function ShoppingCart() {
    const user = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const [linkId, setLinkId] = useState("");
    const [isPaying, setisPaying] = useState(false);
    const [isError, setisError] = useState(false);

    const Submit = async (e) => {
        let id = "";
        e.preventDefault();
        if (!isPaying) {
            let amount = parseInt(`${state?.price}00`);
            const { url, id } = await Pay.createLink(amount, state?.type);
            window.open(
                url,
                "_blank" // <- This is what makes it open in a new window.
            );
            setisPaying(true);
            setLinkId(id);
        } else {
            console.log(linkId);
            const status = await Pay.checkStatus(linkId);
            console.log(status);
            if (status === "paid") {
                navigate("/employer/cart/success", {
                    state: { status: "success" },
                });
                await apost("/api/payment/upgrade", {
                    type: state?.type,
                });
            } else {
                setisError(true);
            }
        }
    };

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
                Shopping Cart
            </h1>

            <div className="flex flex-col text-[1.5rem] gap-12">
                <div className="flex flex-row gap-[5rem]">
                    <div className="flex flex-row items-center justify-center gap-4">
                        <img
                            src={user?.company?.icon}
                            className={`rounded-full max-w-[150px] max-h-[150px] min-h-[150px] min-w-[150px] object-scale-down`}
                        />
                        <div className="flex flex-col">
                            <span className="text-[2rem] ">Company</span>
                            <span className="font-medium text-torange">
                                {user?.company?.companyName}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-center gap-4">
                        <BsFillBagCheckFill className="text-[9rem] text-torange" />
                        <div className="flex flex-col">
                            <span className="text-[2rem] capitalize">
                                {state?.type} <br /> Subscription
                            </span>
                            <span className="font-medium text-torange">
                                {state?.price}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-[2.5rem]">Mode of Payment</span>
                    <div className="flex flex-row gap-2">
                        <input
                            checked={true}
                            type="radio"
                            className="text-[3rem]"
                        />
                        <span className="text-[1.8rem]">GCASH</span>
                    </div>
                </div>

                {isError && (
                    <span className="text-red-400 text-[16px] text-center">
                        Status is still unpaid or our server encountered an
                        error
                    </span>
                )}
                <button type="submit" className="button py-2">
                    {isPaying ? "CHECK STATUS PAYMENT" : "CHECKOUT"}
                </button>
                <button
                    type="button"
                    className="underline"
                    onClick={() => navigate(-1)}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
