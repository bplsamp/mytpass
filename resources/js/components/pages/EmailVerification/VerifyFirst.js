import { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function VerifyFirst() {
    const navigate = useNavigate();
    const token = Cookies.get("mytpass_session")

    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <img src={logo} />
            <p>Please verify your email first</p>
            <div
                onClick={async () => {
                    await alert("Email verification resent."),
                    axios.post("http://localhost:8000/api/email/verify/resend",
                    null, {
                        headers: { Authorization: `Bearer ${token}`},
                    })
                }
            }
                className="underline cursor-pointer"
            >
                Click here to resend an email verification
            </div>
        </div>
    );
}
