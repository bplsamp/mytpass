import React, { useEffect } from 'react'
import logo from "../../../assets/images/logo.png";
import EmployeePage from '../../../layouts/EmployeePage';
import Events from './Events';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider';
import VerifyFirst from '../../EmailVerification/VerifyFirst';
import FooterLogged from '../../../footer/FooterLogged';
import QueryApi from '../../../Query/QueryApi';


export default function Home() {
const { data } = QueryApi("announcements", "/api/announcements/get");
const navigate = useNavigate();
const User = useAuth();
const getUser = useAuthUpdate();

const location = useLocation();
const currentPath = location?.pathname;

console.log(data)

  return (
  
    <EmployeePage>
      {data?.length > 0 
      ? (<Events data={data ? data : []} />) 
      : (<></>)}
        <FooterLogged/>
    </EmployeePage>
  )
}
