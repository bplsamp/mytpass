import React from "react";
import AdminNavbar from "../navbar/AdminNavbar";
import { BiExit } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AdminPage({ children }) {
    const navigate = useNavigate()
    const token = Cookies.get("mytpass_session")
    return (
        <div className="min-h-screen flex flex-col w-full">
            <AdminNavbar />
            {children}
            <button className="flex flex-row items-center justify-center gap-2 mt-auto mb-12"
            onClick={async () => {
                await axios.post("http://localhost:8000/api/logout",
                null, {
                    headers: { Authorization: `Bearer ${token}`},
                })
                navigate("/")
            }}>
                <BiExit className="icon text-torange" />
                <span className="text-[1.2rem]"
                >Logout</span>
            </button>
        </div>
    );
}
