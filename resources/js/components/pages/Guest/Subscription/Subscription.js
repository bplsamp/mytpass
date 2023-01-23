import React from 'react'
import GuestNavbar from '../../../navbar/GuestNavbar'
import Footer from '../../../footer/Footer'

export const subscriptions = [
    {
        type: "basic",
        desc: "Up to 30 employees for your company!",
        price: "0",
        style: "bg-[#D9D9D9]",
        button: "FREE",
    },
    {
        type: "premium",
        desc: "Up to 100 employees for your company!",
        price: "2,999/monthly",
        style: "bg-[#BBD6F4]",
        button: "SUBSCRIBE",
    },
    {
        type: "platinum",
        desc: "Unlimited employees for your company!",
        price: "4,999/monthly",
        style: "bg-[#FF8E25]",
        button: "SUBSCRIBE",
    },
];

export const SubscriptionCard = ({ sub }) => {
    return (
    <div className={`${sub.style} flex flex-col p-6  items-center justify-center gap-8 shadow-lg hover:scale-105 cursor-pointer rounded-sm`}>
        <div className='flex flex-row capitalize font-bold text-[1rem]'>
            {sub.type}
        </div>
        <div className='text-[1.5rem] max-w-[150px] text-center'>
            {sub.desc}
        </div>
        <div className='text-[1.5rem] py-10 font-bold'>
            {sub.price}
        </div>
    </div>
    )
}

export default function Subscription() {
  return (
    <div className='min-h-screen flex flex-col'>
        <GuestNavbar/>
            <div className='flex flex-col items-center justify-center'>
                <div className='text-[2.5rem] text-torange font-bold my-12'>
                    List of Subscriptions
                </div>
                <div className='flex flex-wrap gap-10 text-['>
                    {subscriptions.map((type, idx) => 
                    {
                        return <SubscriptionCard sub={type} key={idx}/> 
                    })
                    }
                </div>
            </div>
        <Footer/>
    </div>
  )
}
