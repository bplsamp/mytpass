import React from 'react'
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useLocation } from 'react-router-dom';

const routes = {
    "/": "Home",
    "/subscription": "Subscription",
    "/contact": "Contact Us",
    "/about": "About Us",
};

export default function GuestNavbar() {

    const location = useLocation();
    const currentPath = location?.pathname;

  return (
    <nav
        style={{ zIndex: 100 }}
        className={`
            ${
                "bg-white text-black shadow-lg flex text-white sticky top-0 p-2"
            }`
    }
    >
        <img src={logo}
            className="mr-auto ml-8 w-[110px] relative top-1"
        />
        <ul className="ml-auto flex flex-row items-center justify-center uppercase">
    {Object.keys(routes).map((route, idx) => (
        <li key={idx} className="flex">
            <Link
                to={route}
                className={`
                    ${
                        currentPath == route ? "border-torange" : "border-transparent"
                    }
                    w-auto p-4 border-b-2 hover:border-torange
                    }
                `}
            >
                {routes[route]}
            </Link>
        </li>
    ))}   
            <li><Link
                to={{ pathname: "/login", replace: true }}
                className="button px-4 py-1 mr-4 ml-2"
                >
                Sign In
                </Link>
            </li>
        </ul>
    </nav>
  )
}
