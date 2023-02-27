import React from 'react'
import GuestNavbar from '../../../navbar/GuestNavbar'
import Footer from '../../../footer/Footer'
import contact from '../../../assets/images/contact.png'
import GuestPage from '../../../layouts/GuestPage'
import FooterLogged from '../../../footer/FooterLogged'

export default function Contact() {
  return (
    <GuestPage>
        <div className="flex flex-col">
            <h1 className="ml-auto mr-auto text-torange font-bold text-[2rem] py-6">
                Contact Us
            </h1>
            <div className='flex flex-row items-center justify-center gap-10'>
                <div className='flex flex-col gap-2 rounded-md p-12 w-[600px]'>
                    <label className='text-[1.25rem]'>Email Address</label>
                    <input
                    name="email"
                    id="email"
                    className='outline-0 border-gray-400 border px-4 py-2'
                    />
                    <label className='text-[1.25rem]'>Message</label>
                    <textarea
                        name="message"
                        id="message"
                        rows={10}
                        className="outline-0 border-gray-400 border px-4 py-2 resize-none"
                    />
                    <button className='ml-auto button px-6 py-2 mt-3'>Send</button>
                </div>
                <div className='flex flex-row'>
                    <img src={contact} width={700}/>
                </div>
            </div>
        </div>
        <Footer/>
    </GuestPage>
  )
}
