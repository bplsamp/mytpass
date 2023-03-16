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
import AttendanceModal from "./AttendanceModal";
import DeactivatedCompany from "../Company/DeactivatedCompany";
import EditTrainingModal from "./EditTrainingModal";

export default function MyTrainings() {
    const User = useAuth();
    const [ShowSchedule, setShowSchedule] = useState(false);
    const location = useLocation();
    const currentPath = location?.pathname;
    const [showAttendanceModal, setshowAttendanceModal] = useState(false);
    const [ShowEdit, setShowEdit] = useState("");
    const [SelectedTraining, setSelectedTraining] = useState("");

    const [Category, setCategory] = useState("");
    const [SearchText, setSearchText] = useState("");
    const { isLoading, error, data, isFetching, refetch } = QueryApiPost(
        `${currentPath.replace("/employer/", "")}`,
        `/api${currentPath}`,
    );

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        //refetch();
    };

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (e.target.value == "Default") {
            setCategory("");
            return;
        }
        setCategory(value);
    };

    return (
        <EmployerPage>
            {User?.company?.companyStatus == "inactive" ? (<DeactivatedCompany/>) 
            :   (<>
                    <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                        <GiTiedScroll className="text-[1.8rem] text-torange" />
                        My Trainings
                    </Card>

                    <Card className={`mx-4 p-4 flex flex-row gap-14 items-center`}>
                        <Search
                            handleSearch={handleSearch}
                            placeholder={`Search Training`}
                            style={`max-w-[600px]`}
                            disableButton={true}
                        />
                        <div className="flex items-center gap-4">
                            <h1>Category:</h1>
                            <Select
                                value={Category}
                                setValue={handleInput}
                                label={``}
                                options={[
                                    "Default",
                                    "General",
                                    "Human Aspect",
                                    "Technical Aspect",
                                    "Commercial Aspect",
                                ]}
                            />
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
                                trainings={data && data?.filter(
                                    (t) =>
                                        t?.title
                                            .toLowerCase()
                                            .includes(SearchText.toLowerCase()) &&
                                        t?.category
                                            .toLowerCase()
                                            .includes(Category.toLowerCase())
                                )} 
                                setshowAttendanceModal={setshowAttendanceModal} 
                                setSelectedTraining={setSelectedTraining}
                                setShowEdit={setShowEdit}
                                data2={data}
                                refetch={refetch}
                                />
                            }
                    </Card>

                    {ShowSchedule && 
                        <ScheduleTraining close={() => setShowSchedule(false)} refetch={refetch}  />
                    }

                    {showAttendanceModal && 
                        <AttendanceModal 
                            training={SelectedTraining} 
                            close={() => setshowAttendanceModal(false)} 
                            refetch={refetch} 
                        />
                    }
                    
                    {ShowEdit && (
                        <EditTrainingModal
                            training={SelectedTraining}
                            close={() => setShowEdit(false)}
                        />
                    )}
                </>)}
        </EmployerPage>
    );
}
