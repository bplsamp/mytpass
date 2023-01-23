import React from 'react'

import Footer from '../../../footer/Footer'
import GuestNavbar from '../../../navbar/GuestNavbar'
import Welcome from '../../General/Welcome'
import GuestIntro from './GuestIntro'

export default function GuestHome() {
  return (
    <div className='min-h-screen flex flex-col'>
        <GuestNavbar/>
        <GuestIntro/>
        <Footer/>
    </div>
  )
}
