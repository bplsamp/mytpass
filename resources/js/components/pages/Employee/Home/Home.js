import React from 'react'
import logo from "../../../assets/images/logo.png";
import Footer from "../../../footer/Footer";
import Navbar from '../../../navbar/Navbar';
import Events from './Events';

export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>
        <Events/>
        <Footer/>
    </div>
  )
}
