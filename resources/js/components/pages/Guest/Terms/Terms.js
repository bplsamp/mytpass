import React from 'react'
import Footer from '../../../footer/Footer'
import GuestPage from '../../../layouts/GuestPage'

export default function About() {
  return (
    <GuestPage>
      <div className="flex flex-row">
          <h1 className="ml-auto mr-auto text-torange font-bold text-[2rem] py-6 justify-center">
              Terms and Conditions
          </h1>
      </div>
        <div className='flex flex-row text-justify justify-center items-center gap-[10rem] py-10'>
          <p className='w-[600px] text-[1.3rem]'>
             <b> 1. Registration</b> - Users below 18 must have a parent or guardian’s permission to use MyTPass.
                Registration in MyTPass is open only for employees who work and want to work in the manufacturing industry. 
                MyTPass may access some user data for user verification.
                The supplied data and information by the user must be true, complete and up-to-date as well. Failure to do so may result in termination of account.
                Each user is only allowed to register one contact number.

            <br></br>
            <br></br>

            <b>2. Data Protection & Non-Disclosure Agreement</b> -  Any Data and information collected by MyTPass that are supplied by the users will remain confidential and will not be disclosed anywhere. By continuing to use this website, it is assumed that the user indicates compliance with the term.
            
            <br></br>
            <br></br>

            <b>3. Termination of Account</b> -  Users must strictly comply and follow the Privacy and Policy of MyTPass. Failure to comply might result in Termination of their accounts.
            Users are required to provide enough and appropriate documents needed by MyTPass to be able to continue using the application. 
          </p>
        </div>
      <Footer/>
    </GuestPage>
  )
}
