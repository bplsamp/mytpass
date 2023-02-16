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

useEffect (() => {
localStorage.setItem('pathkey', JSON.stringify(currentPath))
console.log(currentPath)
getUser()
console.log(User)

if (User?.role == "Employee" || 
User?.role ==  "Business Owner" || 
User?.role ==  "Human Resource")
  navigate("/employee")
  else
  navigate("/")
}, [User])

//Email verified checker
if (User && User?.email_verified_at == null) {
  return <VerifyFirst />;
}

  return (
  
    <EmployeePage>
        <Events/>
        <Footer/>
    </EmployeePage>
  )
}
