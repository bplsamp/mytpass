import React, { useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useAuthUpdate } from "../default/Session/SessionProvider";

export default function EmployeePage({ children }) {
    const location = useLocation();
    const currentPath = location?.pathname;
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();

useEffect (() => {
  getUser()
}, [User])

    
        return (
            <div
                className="min-h-screen flex flex-col"
            >
                <Navbar />
                {children}
            </div>
        );
    
}
