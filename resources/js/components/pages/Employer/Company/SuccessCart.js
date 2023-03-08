import React, {
    useState,
    useContext,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
export default function SuccessCart() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    useEffect(() => {
        setTimeout(() => {
            navigate("/employer/dashboard");
        }, 3000);
    }, []);

    if (state.status === "success") {
        return (
            <div className="min-h-screen justify-center items-center flex flex-col text-center text-green-600">
                <img src={logo} />
                Successfully received your payment, <br></br> redirecting you to
                dashboard
            </div>
        );
    } else {
        return (
            <div className="min-h-screen justify-center items-center flex flex-col text-center text-green-600">
                <img src={logo} />
                Invalid status, redirecting you to dashboard
            </div>
        );
    }
}
