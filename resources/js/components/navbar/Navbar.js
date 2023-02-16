import React, {useEffect, useState, useRef} from 'react'
import { useLocation } from 'react-router-dom';
import { AiFillBell } from "react-icons/ai"
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import avatar from "../assets/images/user.png"
import { useAuth, useAuthUpdate } from '../default/Session/SessionProvider';
import axios from 'axios';
import Cookies from 'js-cookie';

const routes = {
    "/employee": "Home",
    "/schedules": "My Schedules",
    "/trainings": "My Training Passport",
    "/profile": "Profile",
};

export default function Navbar() {

    const location = useLocation();
    const currentPath = location?.pathname;

    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();
    const token = Cookies.get("mytpass_session");

useEffect (() => {
  getUser()
}, [User])

    return (
        <nav
        style={{ zIndex: 100 }}
        className="bg-white text-black shadow-lg flex text-white sticky top-0 mt-[0.5rem]"

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
                <AiFillBell
                        className={`text-[2rem] hover:opacity-80 cursor-pointer`}
                />
                    <div className="flex flex-row gap-4">
                        
                        {/* NOTIFICATION CODE HERE */}
                           
                        <div className='flex flex-col'>
                            <span className='capitalize text-center'>
                                {User?.firstName + " " + User?.lastName}
                            </span> 
                            {User?.role != "Employee" && (
                                <span>
                                    <Link to={`/employer/dashboard`} className="capitalize cursor-pointer underline text-blue-400 text-[0.6rem] hover:opacity-70">
                                        Switch To Employer Side
                                    </Link>
                                </span>
                            )}
                            <button
                                onClick={async () => {
                                        await axios.post("http://localhost:8000/api/logout",
                                        null, {
                                            headers: { Authorization: `Bearer ${token}`},
                                        })
                                        navigate("/")
                                    }
                                }
                                className="mr-auto ml-auto underline text-blue-400 text-[0.6rem] hover:opacity-70"
                            >
                                Logout
                            </button>
                        </div>

                 </div>
            </div>
        </ul>
    </nav>
    )
}