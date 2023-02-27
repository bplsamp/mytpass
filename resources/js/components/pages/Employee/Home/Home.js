import React, { useEffect } from 'react'
import logo from "../../../assets/images/logo.png";
import EmployeePage from '../../../layouts/EmployeePage';
import Events from './Events';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider';
import VerifyFirst from '../../EmailVerification/VerifyFirst';
import FooterLogged from '../../../footer/FooterLogged';


export default function Home() {

const navigate = useNavigate();
const User = useAuth();
const getUser = useAuthUpdate();

const location = useLocation();
const currentPath = location?.pathname;

  return (
  
    <EmployeePage>
        <Events/>
        <FooterLogged/>
    </EmployeePage>
  )
}
