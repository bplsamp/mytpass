import React from "react";
import { useLocation } from "react-router-dom";
import GuestNavbar from "../navbar/GuestNavbar";
export default function GuestPage({ children }) {
    const location = useLocation();
    const currentPath = location?.pathname;

    return (
      
        <div
            className="min-h-screen flex flex-col"
        >
            <GuestNavbar />
            {children}
        </div>
       
    );
}
