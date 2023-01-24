import React from 'react'
import logo from '../../../assets/images/logo.png'

import { Link } from 'react-router-dom';
const type = ["Employee", "Human Resource", "Business Owner"];
const type2 = ["Technical Aspect", "Human Aspect", "Commercial Aspect"];

export default function Register() {
  return (
    <div className='min-h-screen p-12'>
        <img src={logo}/>
        <form className='flex items-center justify-center'>
          <div className='flex flex-col items-center max-w-[1200px]'>

            <h1 className='text-torange font-bold text-[2rem] py-8'>
              Registration
            </h1>

            <div className='flex flex-row gap-[3rem]'>
              <div className='flex flex-col gap-[1rem]'>
                <div  className="flex flex-col text-[1.5rem] gap-[.5rem]">

                  <label>What are you?</label>
                  <select className='outline-0 border border-gray-400 rounded-md p-1 px-2'>
                    {type.map((type, idx) =>
                    (<option>
                      {type}
                      </option>)
                    )}
                  </select>

                  <label>Expertise</label>
                  <select className='outline-0 border border-gray-400 rounded-md p-1 px-2'>
                    {type2.map((type2, idx) =>
                    (<option>
                      {type2}
                      </option>)
                    )}
                  </select>

                  <label>Last Name</label>
                    <input
                      name="lastName"
                      id="lastName"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                    />
                  <label>Contact No.</label>
                    <input
                      name="contact"
                      id="contact"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                    />
                    
                </div>
              </div>
              <div className="flex flex-col text-[1.5rem] gap-[.5rem]">
                <label>Email Address</label>
                    <input
                      name="email"
                      id="email"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                    />
                    
                    <label>Specify</label>
                    <input
                      name="specify"
                      id="specify"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                    />

                    <label>First Name</label>
                    <input
                      name="firstName"
                      id="firstName"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                    />

                    <label>Password</label>
                    <input
                      name="password"
                      id="password"
                      type="password"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                    />
              </div>
              <div className="flex flex-col text-[1.5rem] gap-[.5rem]">
                <label className='opacity-0'>blank</label>
                    <input
                      className='outline-0 border border-white rounded-md p-1 px-2'
                    />
                    
                    <label className='opacity-0'>blank</label>
                    <input
                      className='outline-0 border border-white rounded-md p-1 px-2'
                    />

                <label>M.I.</label>
                    <input
                      name="middleInitial"
                      id="middleInitial"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                    />

                <label>Confirm Password</label>
                    <input
                      name="confirmPassword"
                      id="confirmPassword"
                      type="password"
                      className='outline-0 border border-gray-400 rounded-md p-1 px-2'
                    />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 ml-auto pt-[1rem]">
              <button type="submit"
               className='button rounded-md text-white bg-torange px-8 py-2 text-[1.6rem] stroke-black shadow-lg'>
                Sign Up
               </button>
               <Link to={`/`} className="underline hover:opacity-80">
                            Cancel
                </Link>
            </div>
          </div>
        </form>
    </div>
  )
}
