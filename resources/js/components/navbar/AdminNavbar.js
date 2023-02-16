import React, { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
const routes = {
    "/admin/users": "List Of Users",
    "/admin/companies": "Companies",
    "/admin/approvals": "Approval List",
    "/admin/announcements": "Announcement",
    "/admin/audit": "Audit",
};
export default function AdminNavbar() {
    const location = useLocation();

    const currentPath = location?.pathname;

    return (
        <nav
            style={{ zIndex: 99999 }}
            className={`bg-white text-black flex sticky top-0 `}
        >
            <img src={logo} className="mr-auto ml-8" width={100} />
            <ul className="ml-auto flex flex-row items-center justify-center uppercase">
                {Object.keys(routes).map((route, idx) => (
                    <li key={idx} className="flex">
                        {currentPath == route ? (
                            <Link
                                to={route}
                                className="w-auto p-4 border-torange border-b-2 hover:border-torange"
                            >
                                {routes[route]}
                            </Link>
                        ) : (
                            <Link
                                to={route}
                                className="w-auto p-4 border-transparent border-b-2 hover:border-torange"
                            >
                                {routes[route]}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
