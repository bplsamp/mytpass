import React from 'react'
import forgot from "../../../assets/images/forgot.png"; 

export default function ForgotPassword() {
  return (
      <div className='flex flex-col items-center text-justify gap-8 pt-[5rem]'>
        <img
        src={forgot}/>
        <h1 className='text-torange font-bold text-[2rem]'>
          Reset Your Password
        </h1>
        <div className='max-w-[440px] text-center'>
          Fear not. We'll help you to reset your password.
          Enter the email address associated with your account.
        </div>
        <form className="flex flex-col gap-4 w-[500px]">
          <input
              className="outline-0 border rounded-md border-gray-400 px-4 py-2"
              placeholder="Enter Email Address"
          ></input>
          <button className="button px-4 py-2 mr-auto ml-auto">
              Send Email Verification
          </button>
      </form>
      </div>
  )
}
