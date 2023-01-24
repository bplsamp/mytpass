import React, {useEffect, useState, useRef} from 'react'
import { useLocation } from 'react-router-dom';
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import avatar from "../assets/images/user.png"
import NotificationMenu from '../pages/Notifications/NotificationMenu';

const routes = {
    "/employee": "Home",
    "/schedules": "My Schedules",
    "/trainings": "My Training Passport",
    "/profile": "Profile",
};

export default function Navbar() {

    const location = useLocation();
    const currentPath = location?.pathname;
    const nav = useRef(null);

    const [ShowNotification, setShowNotification] = useState(false);
    
    const handleOpenNotification = (e, id) => {
        setShowNotification(!ShowNotification);
        if (isRead.length > 0) {
            setNotifs(
                data?.map((x) => {
                    return { ...x, read: true };
                })
            );

            apost("/api/readNotif", {}, null, null, null, true);
        }
    };

    return (
        <nav
        style={{ zIndex: 100 }}
        className={`
            ${
                "bg-white text-black shadow-lg  flex text-white sticky top-0 mt-[0.5rem]"
            }`
        }
        >
        <img src={logo} className="mr-auto ml-8 " width={100} />
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
                <div className="ml-8 mr-8 flex gap-12 items-center">
                    {/*<div className="flex flex-row gap-4">*/}
                        
                        {/* NOTIFICATION CODE HERE */}
                           
                        <button
                            className="mr-auto ml-auto underline text-blue-400 text-[0.6rem]"
                        >
                            Logout
                        </button>

                 {/*</div>*/}
            </div>
        </ul>
    </nav>
    )
}