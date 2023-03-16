import React, { useState, useEffect } from "react";
import EmployerPage from "../../../layouts/EmployerPage";
import { GiTiedScroll } from "react-icons/gi";
import { AiFillEye } from "react-icons/ai"
import Card from "../../../default/Card/Card";
import Select from "../../../default/Inputs/Select";
import QueryApi from "../../../Query/QueryApi";
import TrainingsTable from "../../Employee/Trainings/TrainingsTable";
import trainings from "../../Employee/Trainings/dummy.json";
import { useAuth } from "../../../default/Session/SessionProvider";
import CertificateATR from "../../General/Certification/CertificateATR";
import EmptyState from "../../../default/EmptyState/EmptyState";
import moment from "moment";
import DeactivatedCompany from "../Company/DeactivatedCompany";
import { Search } from "../../Admin/Search";

export default function TrainingRecords() {
    const User = useAuth();
    const [user, setUser] = useState("");
    const [CurrentTraining, setCurrentTraining] = useState("");
    const [Trainings, setTrainings] = useState([]);
    const [SearchText, setSearchText] = useState("");
    const [showCert, setshowCert] = useState(false);   
    const [Category, setCategory] = useState(""); 

    let { data, isLoading } = QueryApi(
        ["alltrainings"],
        "/api/trainings/getAllCompanyTrainings",
        { companyId: User?.companyId }
    );

    useEffect(() => {
        if (data) {
            let array = [];
            data = data?.map((res, index) => {
                let users = res?.map((user) => {
                    if (user?.user?.companyId == User?.companyId) {
                        console.log("res", user);
                        array.push(user);
                        return user;
                    }
                });
            });

            console.log("data", array);
            setTrainings(array);
        }
    }, [data]);

    

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
            : (
            <>
                <Card className="font-medium text-[1.5rem] m-4 p-4 flex gap-2 items-center">
                    <GiTiedScroll className="text-[1.8rem] text-torange" />
                    All Training Records
                </Card>

                <Card className={`mx-4 p-4 flex flex-row gap-14 items-center`}>
                    <Search
                        placeholder={`Search Training`}
                        style={`max-w-[600px]`}
                        disableButton={true}
                        handleSearch={handleSearch}
                    />
                    <div className={`flex items-center gap-4`}>
                    <h1>Category:</h1>
                    <Select
                        label={``}
                        options={[
                            "Default",
                            "General",
                            "Human Aspect",
                            "Technical Aspect",
                            "Commercial Aspect",
                        ]}
                        setValue={handleInput}
                        value={Category}
                    />
                    </div>
                </Card>
                <Card className={`mx-4 p-4 mt-4`}>
                {data?.length > 0 ? (
                        <table className="w-full">
                            <thead className="bg-[#3A3A3A] text-white text-left rounded-lg">
                                <tr>
                                    <th>Taken by</th>
                                    <th>Training Title</th>
                                    <th>Speaker</th>
                                    <th>Provider</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Completion Date</th>
                                    <th>Expiry Date</th>
                                    <th>Result</th>
                                    <th>Feedback</th>
                                    <th>Inputted Name</th>
                                    <th>Date Added</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {Trainings &&
                                Trainings?.filter(
                                    (t) =>
                                        t?.training?.title
                                            .toLowerCase()
                                            .includes(SearchText.toLowerCase()) &&
                                        t?.training?.category
                                            .toLowerCase()
                                            .includes(Category.toLowerCase())
                                ).slice(0).reverse().map((app) => 
                                (
                                    <>
                                        {showCert && (
                                            <CertificateATR
                                                training={CurrentTraining}
                                                user={user}
                                                close={() => setshowCert(false)}
                                            />
                                        )}
                                        <tr key={app?.id}>
                                            <td>{app?.userName}</td>
                                            <td>{app?.training?.title}</td>
                                            <td>{app?.training?.speaker}</td>
                                            <td>{app?.training?.provider}</td>
                                            <td>{app?.training?.category}</td>
                                            <td>{app?.training?.type}</td>
                                            <td>
                                                {moment(app?.training?.completionDate).format("MMM DD, YYYY hh:mm A")}
                                            </td>
                                            <td>
                                                {app?.training?.expiryDate != null ? (moment(app?.training?.expiryDate).format("MMM DD, YYYY hh:mm A")) : "No Expiration"}
                                            </td>
                                            <td>{app?.training?.result}</td>
                                            <td>{app?.training?.feedback}</td>
                                            <td>{app?.training?.inputtedName}</td>
                                            <td>
                                                {moment(app?.training?.created_at).format("MMM DD, YYYY hh:mm A")}
                                            </td>
                                            <td>
                                                <div className="flex flex-row p-2 gap-4">
                                                    {app?.training?.companyId && app?.training?.isScheduled == 1 ? (
                                                        <button
                                                            onClick={() => {
                                                                setCurrentTraining(
                                                                    app?.training
                                                                )
                                                                setUser(app?.userName)
                                                                setshowCert(true)
                                                            }}
                                                        >
                                                            {" "}
                                                            <AiFillEye className="icon text-torange  cursor-pointer hover:opacity-80" />
                                                        </button>
                                                        ) : app?.training?.certificate && app?.training?.isScheduled == 0 ? (
                                                        <a
                                                            href={app?.training?.certificate}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                        >
                                                            {" "}
                                                            <AiFillEye className="icon text-torange  cursor-pointer hover:opacity-80" />
                                                        </a>
                                                        ) : (
                                                            <div><AiFillEye className="icon text-gray-400  cursor-pointer hover:opacity-80" /></div>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <EmptyState />
                    )}
                </Card>
            </>
            )
            }
        </EmployerPage>
    );
}
