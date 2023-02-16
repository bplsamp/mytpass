import React from "react";
import { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function AlreadyVerifiedEmail() {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 6000);
    }, []);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <img src={logo} />
            <p>Your email has been already verified</p>
            <p>Redirecting you to our main page...</p>
            <Link to={"/"} className="underline">
                <a>Click here to redirect if it doesn{`'`}t redirect you</a>
            </Link>
        </div>
    );
}
