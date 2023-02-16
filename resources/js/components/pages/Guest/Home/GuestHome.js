import React, { useEffect } from 'react'

import Footer from '../../../footer/Footer'
import GuestPage from '../../../layouts/GuestPage'
import GuestNavbar from '../../../navbar/GuestNavbar'
import GuestIntro from './GuestIntro'
import { useNavigate } from 'react-router-dom'
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider'

export default function GuestHome() {
const navigate = useNavigate();
const User = useAuth();
const getUser = useAuthUpdate();

const pathkey = JSON.parse(localStorage.getItem('pathkey'));

useEffect (() => {
  getUser()
  console.log(User)
  if (User?.role == "Employee")
    navigate(pathkey)
    else if (User?.role == "Business Owner" || User?.role == "Human Resource")
    navigate(pathkey)
    else
    navigate("/")
}, [User])

  return (
    
    <GuestPage>
        <GuestIntro/>
        <Footer/>
    </GuestPage>
  )
}
