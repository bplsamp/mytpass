import React from 'react'
import Navbar from '../../../navbar/Navbar'
import Footer from '../../../footer/Footer'
import Search from '../../../shared/Search'
import trainings from "../../Employee/Trainings/dummy.json";
import TrainingsTable from './TrainingsTable';
import { AiFillPrinter } from "react-icons/ai";

export default function Trainings() {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>

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
    </div>
  )
}
