import React, { useState, useEffect } from 'react'
import VerifyFirst from '../../EmailVerification/VerifyFirst'
import Search from '../../../shared/Search'
import TrainingsTable from './TrainingsTable';
import { AiFillPrinter } from "react-icons/ai";
import EmployeePage from '../../../layouts/EmployeePage';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth, useAuthUpdate } from '../../../default/Session/SessionProvider';
import QueryApi, { QueryApiPost } from '../../../Query/QueryApi'
import AddTrainingModal from './AddTrainingModal'
import FooterLogged from '../../../footer/FooterLogged';

export default function Trainings() {
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();

    const location = useLocation();
    const currentPath = location?.pathname;

    const [ShowAdd, setShowAdd] = useState(false);

    const { isLoading, error, data, isFetching, isError, refetch } = QueryApi(
        `trainings`,
        `/api/trainings/get`,
    );
    
    useEffect (() => {
    localStorage.setItem('pathkey', JSON.stringify(currentPath))
    }, []);

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
                <TrainingsTable trainings={data} refetch={refetch}/>
            </div>
        <FooterLogged/>
        {ShowAdd && <AddTrainingModal close={() => setShowAdd(false)} refetch={refetch} />}
    </EmployeePage>
  )
}
