import React from 'react'
import guesthome from "../../../assets/images/guesthome.png"

export default function GuestIntro() {
  return (
    <div className='flex flex-row bg-white text-black items-center p-14 pt-[7rem] justify-center text-justify gap-[10rem]'>
        <div className='flex flex-col max-w-[600px]'>
            <p className='text-[3.1rem] font-bold'>
                Keep Track of your Training Records and Certifications with
                MyT-Pass
            </p>
            <p className='text-[1.5rem]'>
                MyT-Pass is a Web-Based Training Record and Document
                Management System designed to the Employees, Owners, and the
                Human Resource of the Manufacturing Industry.
            </p>
        </div>

        <div className='flex flex-col'>
            <img src={guesthome} width={550}/>
        </div>
    </div>
  )
}
