import React, { useEffect } from 'react'
import Navbar from '../../../navbar/Navbar'
import Footer from '../../../footer/Footer'
import VerifyFirst from '../../EmailVerification/VerifyFirst'
import Search from '../../../shared/Search'
import trainings from "../../Employee/Trainings/dummy.json";
import TrainingsTable from './TrainingsTable';
import { AiFillPrinter } from "react-icons/ai";
import EmployeePage from '../../../layouts/EmployeePage';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider';

export default function Trainings() {
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();

    const location = useLocation();
    const currentPath = location?.pathname;
    
    useEffect (() => {
    localStorage.setItem('pathkey', JSON.stringify(currentPath))

    getUser()
    console.log(User)
    if (User?.role == "Employee" || 
    User?.role ==  "Business Owner" || 
    User?.role ==  "Human Resource")
      navigate("/trainings")
      else
      navigate("/")
    }, [User])

    //Email verified checker
    if (User && User?.email_verified_at == null) {
        return <VerifyFirst />;
    }

  return (
    <EmployeePage>
        <div className="p-12 flex flex-col">
                <div className="text-torange bg-[#3A3A3A] shadow-lg p-6 rounded-tl-md rounded-tr-md flex flex-col gap-4">
                    <div className="flex flex-row">
                        <h1 className="font-bold text-[1.5rem]">
                        My Training Passport
                        </h1>
                        <button className="text-[0.9rem] ml-auto bg-torange text-white px-8 py-1 flex flex-row items-center justify-center gap-4 rounded-md hover:opacity-80">
                            <AiFillPrinter />
                            Print
                        </button>
                    </div>

                    <div className="flex flex-row">
                        <Search />
                        
                        <button
                            onClick={() => setShowAdd(true)}
                            className="text-[0.9rem] ml-auto bg-torange text-white px-8 py-1 flex flex-row items-center justify-center gap-4 rounded-md hover:opacity-80"
                        >
                            <span>+</span>
                            <span>Add Record</span>
                        </button>
                    </div>
                </div>
                <TrainingsTable trainings={trainings} />
            </div>
        
        <Footer/>
        </EmployeePage>
  )
}
