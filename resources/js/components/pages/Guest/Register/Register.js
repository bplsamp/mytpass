import React, { useEffect, useState } from 'react'
import axios from 'axios';
import logo from '../../../assets/images/logo.png'

import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { EXPERTISE_OPTIONS } from "../../../shared/constants";

const type = ["Employee", "Human Resource", "Business Owner"];
const type2 = ["Technical Aspect", "Human Aspect", "Commercial Aspect"];

export default function Register() {
  const navigate = useNavigate();

  const [NewUser, setNewUser] = useState({
    email: "",
    password: "",
    role: "Employee",
    expertise: "Technical Aspect",
    firstName: "",
    lastName: "",
    middleInitial: "",
    contact: "",
    specify: "",
    type: "",
    confirmPassword: "",
});

const handleRegister = async (e) => {
  if (NewUser.confirmPassword != NewUser.password) {
    //error
    alert("Password does not match.")
    return
  }

  e.preventDefault();
  console.log(NewUser);
  const res = await axios.post("http://localhost:8000/api/register", NewUser)

  alert(res?.data?.message)
  navigate("/login");

  //navigate("/login");
  console.log(NewUser);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  if (name == "role") {
    if (value == "Human Resource" || value == "Business Owner") {
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
            expertise: value,
            specify: value,
        }));  
        return;
    } else {
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
            expertise: "Technical Aspect",
            specify: "",
        }));
        return;
    }
} else {
    setNewUser((prev) => ({
        ...prev,
        [name]: value,
    }));
    return;
}
};
console.log(NewUser)
 
  return (
    <div className='min-h-screen p-12'>
        <img src={logo}/>
        <form 
        onSubmit={(e) => handleRegister(e)}
        className='flex items-center justify-center'>
          <div className='flex flex-col items-center max-w-[1200px]'>

            <h1 className='text-torange font-bold text-[2rem] py-5'>
              Registration
            </h1>

            <div className='flex flex-row gap-[3rem]'>
              <div className='flex flex-col gap-[1rem]'>
                <div  className="flex flex-col text-[1.5rem] gap-[.5rem]">

                  <label>Role</label>
                  <select 
                  onChange={(e) => handleInputChange(e)}
                  name="role"
                  id="role"
                  className='outline-0 border border-gray-400 rounded-md p-1 px-2'>
                    {type.map((type, idx) =>
                    (<option value={type} key={idx}>
                      {type}
                      </option>)
                    )}
                    
                  </select>

                  <label>Expertise</label>
                  <select 
                  onChange={(e) => handleInputChange(e)}
                  name="expertise"
                  id="expertise"
                  disabled={
                    NewUser?.role == "Human Resource" ||
                    NewUser?.role == "Business Owner"
                  }
                  className={`outline-0 border border-gray-400 rounded-md p-1 px-2 
                  ${NewUser?.role == "Human Resource" ||
                   NewUser?.role == "Business Owner" ? "bg-gray-400 text-gray-400" : ""}`} 
                  >
                    {type2.map((type2, idx) =>
                    (<option value={type2} key={idx}>
                      {type2}
                      </option>)
                    )}
                  </select>

                  <label>First Name</label>
                    <input
                      name="firstName"
                      id="firstName"
                      value={NewUser?.firstName}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                    />

                  <label>M.I.</label>
                    <input
                      name="middleInitial"
                      id="middleInitial"
                      value={NewUser?.middleInitial}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) =>  handleInputChange(e)}
                    />

                  <label>Password</label>
                    <input
                      name="password"
                      id="password"
                      type="password"
                      value={NewUser?.password}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                    />
                    
                </div>
              </div>
              
              <div className="flex flex-col text-[1.5rem] gap-[.5rem]">
                <label>Email Address</label>
                    <input
                      name="email"
                      id="email"
                      value={NewUser?.email}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                    />
                    
                    <label>Specify</label>
                    <input
                      name="specify"
                      id="specify"
                      value={NewUser?.specify}
                      disabled={
                        NewUser?.role == "Human Resource" ||
                        NewUser?.role == "Business Owner"
                      }
                      className={`outline-0 border border-gray-400 rounded-md p-1 px-2
                      ${NewUser?.role == "Human Resource" ||
                      NewUser?.role == "Business Owner" ? "bg-gray-400 text-gray-400" : ""}`}
                      onChange={(e) => handleInputChange(e)}
                    />

                    <label>Last Name</label>
                    <input
                      name="lastName"
                      id="lastName"
                      value={NewUser?.lastName}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                    />

                    <label>Contact No.</label>
                    <input
                      name="contact"
                      id="contact"
                      value={NewUser?.contact}
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) => handleInputChange(e)}
                    />

                    <label>Confirm Password</label>
                    <input
                      name="confirmPassword"
                      id="confirmPassword"
                      type="password"
                      required="required"
                      value={NewUser?.confirmPassword}
                      className='required outline-0 border border-gray-400 rounded-md p-1 px-2'
                      onChange={(e) =>  handleInputChange(e)}
                    />

              </div>
            </div>

              <button type="submit"
               className='mt-[2rem] button rounded-md text-white bg-torange px-8 py-2 text-[1.6rem] stroke-black shadow-lg'>
                Sign Up
               </button>
               <Link to={`/`} className="mt-[1rem] underline hover:opacity-80">
                            Cancel
                </Link>

          </div>
        </form>
    </div>
  )
}
