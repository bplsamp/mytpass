import React, { useState, useEffect } from 'react'
import loginCard from '../../../assets/images/loginCard.webp'
import loginCard2 from '../../../assets/images/loginCard2.webp'
import logo from '../../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider'
import axios from 'axios';
import { toast } from "react-hot-toast";
import { apost } from '../../../shared/query'

export default function Login() {
const navigate = useNavigate();

const User = useAuth();
const getUser = useAuthUpdate();

const [NewUser, setNewUser] = useState({
    email: "",
    password: "",
});

const handleLogin = async (e) => {
    e.preventDefault();
    console.log(NewUser);
    const res = await axios.post("http://localhost:8000/api/login", NewUser) 
 
    if (res?.data?.user?.role == "Employee")
    navigate("/employee")
    else if (res?.data?.user?.role == "Business Owner" || res?.data?.user?.role == "Human Resource")
    navigate("/employer/dashboard")
    else
    navigate("/")
    
    apost("/api/getExpiringTraining");

    console.log(NewUser);
};

useEffect (() => {
    getUser()
    if (User?.role == "Employee")
    navigate("/employee")
    else if (User?.role == "Business Owner" || User?.role == "Human Resource")
    navigate("/employer/dashboard") 
}, [User])

const handleInputChange = (e) => {
    const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
};

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-200'>
        <div className='flex flex-row rounded-lg bg-white max-w-[1000px] shadow-lg'>
            <div className='flex flex-col gap-6 p-8'>
                <a href="/">
                    <img 
                    src={logo} 
                    className='w-[200px]'
                    />
                </a>
                

                <h1 className="text-torange font-bold text-[1.4rem] mr-auto ml-auto">
                        Login into your Account
                </h1>

                <form 
                className="flex flex-col gap-3"
                onSubmit={(e) => handleLogin(e)}
                >
                    <label>Email Address</label>
                    <input type="text" id="email" name="email" label="Email Address"
                    className="outline-0 border-gray-600 border rounded-sm px-4 py-2 focus:ring-2"
                    onChange={(e) => handleInputChange(e)}
                    />

                    <label>Password</label>
                    <input type="password" id="password" name="password" label="Email Address"
                    className="outline-0 border-gray-600 border rounded-sm px-4 py-2 focus:ring-2"
                    onChange={(e) => handleInputChange(e)}
                    />
                    <a
                        href="/forgotpassword"
                        className="max-w-fit hover:underline hover:text-blue-800 hover:opacity-80"
                    >
                        Forgot your password?
                    </a>
                    <button 
                    className='button py-2 text-[1.2rem] hover:opacity-80'
                    type="submit"
                    >
                        Login Now
                    </button>
                </form>

                <span className="mr-auto ml-auto">
                        Don't Have an Account Yet?{" "}
                        <a
                            className="text-blue-800 underline hover:opacity-80"
                            href="/register"
                        >
                            Sign up
                        </a>
                    </span>

                <img 
                src={loginCard2} 
                width="500"
                />
            </div>
            <div>
                <img src={loginCard}/>
            </div>
        </div>
    </div>
  )
}
