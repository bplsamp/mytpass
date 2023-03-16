import React, {
    useState,
    useContext,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import GuestPage from "../../../layouts/GuestPage";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Input from "../../../default/Inputs/Input";
import { apost } from "../../../shared/query";
import axios from "axios";

export default function ResetPass() {
    const location = useLocation();
    const currentPath = location?.pathname;
    const navigate = useNavigate();

    const [NewPassword, setNewPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setisLoading] = useState(false);
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    useEffect(() => {
        if (String(token)?.length > 0) {
        } else {
            alert("Invalid token");
            navigate("/");
        }
    }, [token]);

    const handleSubmit = async (e, token) => {
        e.preventDefault();

        console.log(token);
        const bytes = CryptoJS.AES.decrypt(decodeURIComponent(token), "12345");

        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

        console.log(decryptedText);
        if (ConfirmPassword === NewPassword) {
            setisLoading(true);
            let res = await axios.post("/api/resetPassword", {
                token: decryptedText,
                email: decryptedText,
                newPassword: NewPassword,
            });

            setisLoading(false);
            alert(res?.data?.message);
            navigate("/login");
        } else {
            alert("Passswords doesn't match");
        }
    };

    const setNewPass = (e) => {
        setNewPassword(e.target.value);
    };
    const setConfirmPass = (e) => {
        setConfirmPassword(e.target.value);
    };
    return (
        <GuestPage>
            <div className="flex min-h-[90vh] w-full">
                <form
                    onSubmit={(e) => handleSubmit(e, token)}
                    className="w-full flex flex-col justify-center items-center"
                >
                    <h1>Reset Password</h1>
                    <Input
                        label={`New Password`}
                        type={`password`}
                        setValue={setNewPass}
                        value={NewPassword}
                    />
                    <Input
                        label={`Confirm Password`}
                        type={`password`}
                        setValue={setConfirmPass}
                        value={ConfirmPassword}
                    />
                    <button
                        type="submit"
                        className="my-2 px-4 py-1"

                    >
                        Reset
                    </button>
                </form>
            </div>
        </GuestPage>
    );
}
