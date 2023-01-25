import React from 'react'
import Navbar from '../../../navbar/Navbar'
import Footer from '../../../footer/Footer'
import Search from '../../../shared/Search'
import trainings from "../../Employee/Trainings/dummy.json";
import SchedulesTable from './SchedulesTable';

export default function Schedules() {
  return (
    <div className='min-h-screen flex flex-col'>
        <Navbar/>

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
                <SchedulesTable trainings={trainings} />
            </div>
        
        <Footer/>
    </div>
  )
}
