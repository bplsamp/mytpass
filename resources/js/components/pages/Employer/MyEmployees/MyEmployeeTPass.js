import React, { useState, useRef } from 'react'
import EmployerPage from "../../../layouts/EmployerPage";
import TrainingsTable from "../../Employee/Trainings/TrainingsTable";
import { AiFillPrinter } from "react-icons/ai";
import QueryApi from '../../../Query/QueryApi';
import { useLocation } from "react-router-dom";
import AddTrainingModal from "../../Employee/Trainings/AddTrainingModal";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function MyEmployeeTPass({}) {
    const navigate = useNavigate();
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const id = urlParams.get("id");
    
    const [ShowAdd, setShowAdd] = useState(false);

    const { data, refetch } = QueryApi("MyEmployeeTPass", "/api/employer/getEmployeeTPass", null, {id: id})

    return (
        <EmployerPage>
            <IoChevronBack
                onClick={() => navigate("/employer/myemployees")}
                className="text-torange text-[3rem] rounded-full border-gray-200 border p-2 hover:opacity-50 cursor-pointer bg-white"
            />
            <div className="p-12 flex flex-col">
                <div className="text-torange bg-[#3A3A3A] shadow-lg p-6 rounded-tl-md rounded-tr-md flex flex-col gap-4">
                    <div className="flex flex-row">
                        <h1 className="font-bold text-[1.5rem]">
                            My Training Passport - 
                            <span className='text-white'>
                                [
                                <span className='capitalize'>
                                    {data?.userName && data?.userName}
                                </span>
                                ]
                            </span>
                        </h1>
                    </div>

                    <div className="flex flex-row">
                        <input
                            onChange={(e) => handleSearch(e)}
                            className="outline-0 border border-gray-400 px-2 py-2 rounded-md text-black w-full max-w-[600px]"
                            placeholder="🔍︎ Search Record..."
                        ></input>
                        <button
                            onClick={() => {
                                
                                setShowAdd(true);
                            }}
                            className="text-[0.9rem] ml-auto bg-torange text-white px-8 py-1 flex flex-row items-center justify-center gap-4 rounded-md hover:opacity-80"
                        >
                            <span>+</span>
                            <span>Add Record</span>
                        </button>
                    </div>
                </div>
                {data && (
                    <TrainingsTable
                        trainings={data?.array_trainings && data?.array_trainings}
                        disableEdit={true}
                        refetch={refetch}
                    />
                )}
            </div>
            {ShowAdd && (
                <AddTrainingModal
                    close={() => setShowAdd(false)}
                    refetch={refetch}
                />
            )}
        </EmployerPage>
    )
}
