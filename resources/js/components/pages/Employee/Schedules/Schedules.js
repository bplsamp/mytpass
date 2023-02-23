import React, { useEffect, useState } from 'react'
import Navbar from '../../../navbar/Navbar'
import Footer from '../../../footer/Footer'
import Search from '../../../shared/Search'
import trainings from "../../Employee/Trainings/dummy.json";
import SchedulesTable from './SchedulesTable';
import EmployeePage from '../../../layouts/EmployeePage';
import VerifyFirst from '../../EmailVerification/VerifyFirst';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider';
import QueryApi from '../../../Query/QueryApi';

export default function Schedules() {
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();

    const location = useLocation();
    const currentPath = location?.pathname;

    const { isLoading, error, data, isFetching, isError, refetch } = QueryApi(
        `schedules`,
        `/api/trainings/getSchedule`,
    );

    console.log(data);
    
    useEffect (() => {
    localStorage.setItem('pathkey', JSON.stringify(currentPath))
    }, []);

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
                            My Schedules
                        </h1>
                    </div>

                    <div className="flex flex-row">
                        <Search />
                    </div>
                </div>
                <SchedulesTable trainings={data} refetch={refetch} />
            </div>
        
        <Footer/>
    </EmployeePage>
  )
}
