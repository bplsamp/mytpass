import React from 'react'
import GuestNavbar from '../../../navbar/GuestNavbar'
import Footer from '../../../footer/Footer'
import about from '../../../assets/images/about.png'
import GuestPage from '../../../layouts/GuestPage'

export default function About() {
  return (
    <GuestPage>
      <div className="flex flex-row">
          <h1 className="ml-auto mr-auto text-torange font-bold text-[2rem] py-6 justify-center">
              About Us
          </h1>
      </div>
        <div className='flex flex-row text-justify justify-center items-center gap-[10rem] py-12'>
          <img src={about}/>
          <p className='w-[600px] text-[1.7rem]'>
              MyT-Pass provides training record and certification
              management for Employees and Employers (For Human
              Resource and Owner) of the Manufacturing Industry. It
              helps to have an organized management of the Training
              Records of every Employees which can be used for future
              use.
          </p>
        </div>
      <Footer/>
    </GuestPage>
  )
}
