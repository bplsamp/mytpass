import React, { useEffect } from 'react'
import EmployerPage from '../../../layouts/EmployerPage'
import DeactivatedCompany from '../Company/DeactivatedCompany';

import { DiGoogleAnalytics } from "react-icons/di";
import Card from "../../../default/Card/Card";
import DoughnutChart from "./DoughnutChart";
import BarChart from "./BarChart";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider';
import { QueryApiPost } from '../../../Query/QueryApi';

const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const calculateAttendanceRate = (attended, total) => {
      const rate = (attended / total) * 100;
     return parseInt(rate.toFixed(0));
     }

    const getScheduledTrainings = (data, month) => {
       let filtered = data?.filter(
              (item) => item?.isScheduled == true
          );
          let arr = filtered?.filter((item) => {
              return new Date(item.created_at).getMonth() === mS.indexOf(month); // 1 represents February (0 is January, 1 is February, etc.)
          });
  
       return arr?.length ? arr?.length : 0;
     };

    const getParticipants = (data, month) => {
     let filtered = data?.filter((item) => item?.isScheduled == true);
     let participants = 0;
        let arr = filtered?.filter((item) => {
            return new Date(item.created_at).getMonth() === mS.indexOf(month); // 1 represents February (0 is January, 1 is February, etc.)
        });

        let participantsArray = arr?.map((emp) => {
            return emp?.training_users?.length;
        });

     for (let i = 0; i < participantsArray?.length; i++) {
            participants += participantsArray[i];
     }

     return participants;
    };

    const getAttendanceRate = (data, month) => {
        let filtered = data?.filter((item) => item?.isScheduled == true);
        let attendanceRate = 0;
        let arr = filtered?.filter((item) => {
            return new Date(item.created_at).getMonth() === mS.indexOf(month); // 1 represents February (0 is January, 1 is February, etc.)
        });

     //get all just comleted trainings
        arr = arr?.filter((item) => item?.status == "completed");

     let attendanceRateArray = arr?.map((emp) => {
           let presents = emp?.attendances?.filter((person) => person?.isPresent);
            return calculateAttendanceRate(
               presents?.length,
                emp?.attendances?.length
            );
        });

     //average all em
        for (let i = 0; i < attendanceRateArray?.length; i++) {
            attendanceRate += attendanceRateArray[i];
        }

     let final = (attendanceRate / attendanceRateArray?.length).toFixed(0);

        return parseInt(!isNaN(final) ? final : 0);
    };

export default function Dashboard() {
    const User = useAuth();
    const location = useLocation();
    const currentPath = location?.pathname;

    const { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api${currentPath}`,
        { id: User?.company?.id }
    );

    const scheduled = mS.map((r, i) => {
        return getScheduledTrainings(data?.scheduledTrainings, r);
    });

    const participants = mS.map((r) => {
        return getParticipants(data?.scheduledTrainings, r);
    })

    const attendances = mS.map((r) => {
        return getAttendanceRate(data?.scheduledTrainings, r);
    })

    console.log(User?.company)
    return (
    <>
        <EmployerPage>
            {User?.company?.companyStatus == "inactive" ? (<DeactivatedCompany/>) 
            :   (<>
                    <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                    <DiGoogleAnalytics className="text-[1.8rem] text-torange" />
                        Analytics
                    </Card>

                    <Card className={`flex flex-col items-center mx-4`}>
                        <h1 className="font-medium ">Number of Employees</h1>
                        <div className="max-w-[280px] max-h-[300px]">
                            <DoughnutChart
                                empCount={data?.empCount && data?.empCount}
                                max={data?.maxEmployee}
                            />
                        </div>
                        <div className="relative bottom-40 font-bold text-[2rem] text-gray-600">
                            {data?.empCount && data?.empCount}
                        </div>
                    </Card>

                    <div className={`flex flex-row gap-4 items-center justify-center mt-4`}> 
                        <Card className={``}>
                            <BarChart title={`Scheduled Trainings`} data={scheduled} />
                        </Card>
                        <Card>
                            <BarChart title={`Number of Participants`} data={participants} />
                        </Card>
                        <Card>
                            <BarChart title={`Attendance Rate`} data={attendances} />
                        </Card>
                    </div>
                </>)
            }
        </EmployerPage>
    </>
  )
}
