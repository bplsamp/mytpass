import React, { useEffect } from 'react'

import Footer from '../../../footer/Footer'
import GuestPage from '../../../layouts/GuestPage'
import GuestNavbar from '../../../navbar/GuestNavbar'
import GuestIntro from './GuestIntro'
import { useNavigate } from 'react-router-dom'
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider'
import FooterLogged from '../../../footer/FooterLogged'

export default function GuestHome() {
const navigate = useNavigate();
const User = useAuth();
const getUser = useAuthUpdate();

  return (
    <GuestPage>
        <GuestIntro/>
        <Footer/>
    </GuestPage>
  )
}
