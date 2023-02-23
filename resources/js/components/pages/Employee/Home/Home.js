import React, { useEffect } from 'react'
import logo from "../../../assets/images/logo.png";
import Footer from "../../../footer/Footer";
import EmployeePage from '../../../layouts/EmployeePage';
import Navbar from '../../../navbar/Navbar';
import Events from './Events';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider';
import VerifyFirst from '../../EmailVerification/VerifyFirst';


export default function Home() {

const navigate = useNavigate();
const User = useAuth();
const getUser = useAuthUpdate();

const location = useLocation();
const currentPath = location?.pathname;

  return (
  
    <EmployeePage>
        <Events/>
        <Footer/>
    </EmployeePage>
  )
}
