import React, { useState, useEffect  } from 'react'
import EmptyState from '../../../default/EmptyState/EmptyState';
import { AiFillEye } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { CgTrash } from "react-icons/cg";
import { apost } from '../../../shared/query';
import QueryApi from '../../../Query/QueryApi';
import { useAuth } from '../../../default/Session/SessionProvider';
import moment from 'moment';

export default function SchedulesTable({ trainings, setSelectedTraining, setshowAttendanceModal, refetch }) {

    if (trainings?.length <= 0) {
        return <EmptyState />;
    }
    
    const User = useAuth();

    const handleDeleteTraining = (e, trainingId) => {
        e.preventDefault();

        let users;

        apost(
            "/api/trainings/deleteTraining",
            { 
                trainingId: trainingId,
            },
        );
        refetch();
    };

    return (
        
        <table className="bg-transparent rounded-lg shadow-lg">
            <thead className="bg-[#3A3A3A] text-white text-left rounded-lg">
                <tr>
                    <th>Training Title</th>
                    <th>Speaker</th>
                    <th>Provider</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Expiry Date</th>
                    <th>Venue</th>
                    <th>Result</th>
                    <th>Status</th>
                    <th>Feedback</th>
                    <th>Inputted By</th>
                    <th>Date Added</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {trainings?.slice(0).reverse().map((training) => (
                    <tr key={training?.id}>
                        <td>{training?.title}</td>
                        <td>{training?.speaker}</td>
                        <td>{training?.provider}</td>
                        <td>{training?.category}</td>
                        <td>{training?.type}</td>
                        <td>{training?.completionDate}</td>
                        <td>{training?.expiryDate ? training?.expiryDate : "No Expiry"}</td>
                        <td>{training?.venueUrl ? training?.venueUrl : "No Venue"}</td>
                        <td>{training?.result}</td>
                        <td>{training?.status}</td>
                        <td>{training?.feedback}</td>
                        <td>{training?.inputtedName}</td>
                        <td>{moment(training?.created_at).format(
                            "MMM DD, YYYY hh:mm A"
                        )}</td>
                        
                        {training?.status == "pending" && training?.inputtedBy == User?.id ? (<td>
                            <div className="flex flex-row gap-4">
                                <AiFillEye onClick={() => {
                                    console.log("CLICKED");
                                    setshowAttendanceModal(true)
                                    setSelectedTraining(training)
                                }} className="icon cursor-pointer text-yellow-500" />

                                <AiFillEdit className="icon cursor-pointer text-orange-500"/>
                                
                                <CgTrash onClick={(e) => {
                                        console.log("CLICKED DELETE TRAINING");
                                        handleDeleteTraining(e, training?.id);
                                    }} className="icon cursor-pointer text-red-500" />
                            </div>
                        </td>) 
                        : <td>No Actions</td>}
                        
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
