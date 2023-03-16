import React, { useState, useEffect, useRef } from 'react'
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
import ReactToPrint from 'react-to-print';

export default function Trainings() {
    const navigate = useNavigate();
    const User = useAuth();
    const getUser = useAuthUpdate();
    const componentRef = useRef(null);

    const location = useLocation();
    const currentPath = location?.pathname;

    const [ShowAdd, setShowAdd] = useState(false);
    const [SearchQuery, setSearchQuery] = useState("");

    const { isLoading, error, data, isFetching, isError, refetch } = QueryApi(
        `trainings`,
        `/api/trainings/get`,
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

  return (
    <EmployeePage>
        <div 
        className="p-12 flex flex-col">
                <div className="text-torange bg-[#3A3A3A] shadow-lg p-6 rounded-tl-md rounded-tr-md flex flex-col gap-4">
                    <div className="flex flex-row">
                        <h1 className="font-bold text-[1.5rem]">
                        My Training Passport
                        </h1>
                        <ReactToPrint
                                bodyClass={`zoomout`}
                                trigger={() => (
                                    <button className="text-[0.9rem] ml-auto bg-torange text-white px-8 py-1 flex flex-row items-center justify-center gap-4 rounded-md hover:opacity-80">
                                        <AiFillPrinter />
                                        Print
                                    </button>
                                )}
                                content={() => componentRef.current}
                            />
                        
                    </div>

                    <div className="flex flex-row">
                        <Search handleSearch={handleSearch} />
                        <button
                            onClick={() => setShowAdd(true)}
                            className="text-[0.9rem] ml-auto bg-torange text-white px-8 py-1 flex flex-row items-center justify-center gap-4 rounded-md hover:opacity-80"
                        >
                            <span>+</span>
                            <span>Add Record</span>
                        </button>
                    </div>
                </div>
                <TrainingsTable trainings={data?.filter(
                            (t) =>
                                t?.title.toLowerCase().includes(SearchQuery) ||
                                t?.speaker
                                    .toLowerCase()
                                    .includes(SearchQuery) ||
                                t?.provider.toLowerCase().includes(SearchQuery)
                        )
                    } 
                    forwardedRef={componentRef} 
                    refetch={refetch} 
                    disableMore={false}/>
            </div>
        <FooterLogged/>
        {ShowAdd && <AddTrainingModal close={() => setShowAdd(false)} refetch={refetch} />}
    </EmployeePage>
  )
}
