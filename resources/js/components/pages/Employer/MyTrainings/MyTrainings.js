import React, { useState } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import { GiTiedScroll } from "react-icons/gi";
import Card from "../../../default/Card/Card";
import { Search } from "../../Admin/Search";
import { useAuth } from "../../../default/Session/SessionProvider";
import ScheduleTraining from "./ScheduleTraining";
import { useLocation } from "react-router-dom";
import { QueryApiPost } from "../../../Query/QueryApi";
import SchedulesTable from "../../Employee/Schedules/SchedulesTable";
import Select from "../../../default/Inputs/Select";
import EmptyState from "../../../default/EmptyState/EmptyState";

export default function MyTrainings() {
    const [ShowSchedule, setShowSchedule] = useState(false);
    const location = useLocation();
    const currentPath = location?.pathname;
    const [showAttendanceModal, setshowAttendanceModal] = useState(false);
    const [SelectedTraining, setSelectedTraining] = useState("");

    const { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api${currentPath}`,
    );

    return (
        <EmployerPage>
            <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                <GiTiedScroll className="text-[1.8rem] text-torange" />
                My Trainings
            </Card>

            <Card className={`mx-4 p-4 flex flex-row gap-14 items-center`}>
                <Search
                    placeholder={`Search Training`}
                    style={`max-w-[600px]`}
                    disableButton={true}
                />
                <div className="flex items-center gap-4">
                    <h1>Sort By:</h1>
                    <Select label={``} options={["Test1", "Test2", "Test3"]} />
                </div>

                <button
                    onClick={() => setShowSchedule(true)}
                    className="button px-4 py-1 ml-auto"
                >
                    Schedule Training
                </button>
            </Card>

            <Card className={`mx-4 p-4 mt-4`}>
                {data && 
                    <SchedulesTable 
                        trainings={data} 
                        withTool={true} 
                        setshowAttendanceModal={setshowAttendanceModal} 
                        setSelectedTraining={setSelectedTraining}
                        data2={data}
                        refetch={refetch}
                        isAuthor={true}
                        />
                    }
            </Card>

            {ShowSchedule && 
                <ScheduleTraining close={() => setShowSchedule(false)} refetch={refetch}  />
            }

        </EmployerPage>
    );
}
