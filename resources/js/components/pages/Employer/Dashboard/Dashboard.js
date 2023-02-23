import React, { useEffect } from 'react'
import SideNav from '../../../default/SideNav/SideNav'
import EmployerPage from '../../../layouts/EmployerPage'
import VerifyFirst from '../../EmailVerification/VerifyFirst';

import { DiGoogleAnalytics } from "react-icons/di";
import Card from "../../../default/Card/Card";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider';

export default function Dashboard() {
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();

    const location = useLocation();
    const currentPath = location?.pathname;

    useEffect (() => {
    localStorage.setItem('pathkey', JSON.stringify(currentPath))
    }, [User])


    const data = {empCount : 1}

  return (
    <>
      <EmployerPage>
      <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                <DiGoogleAnalytics className="text-[1.8rem] text-torange" />
                Analytics
            </Card>

        {/*
            <Card className={`flex flex-col items-center mx-4`}>
                <h1 className="font-medium ">Number of Employees</h1>
                <div className="max-w-[280px] max-h-[300px]">
                    <DoughnutChart
                        empCount={data?.empCount && data?.empCount - 1}
                        max={50}
                    />
                </div>
                <div className="relative bottom-40 font-bold text-[2rem] text-gray-600">
                    {data?.empCount && data?.empCount - 1}
                </div>
            </Card>

            <div
                className={`flex flex-row gap-4 items-center justify-center mt-4`}
            >
                <Card className={``}>
                    <BarChart title={`Scheduled Trainings`} />
                </Card>
                <Card>
                    <BarChart title={`Number of Participants`} />
                </Card>
                <Card>
                    <BarChart title={`Attendance Rate`} />
                </Card>
            </div>
  */}
      </EmployerPage>
    </>
  )
}
