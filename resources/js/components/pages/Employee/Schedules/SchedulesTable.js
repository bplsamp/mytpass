import React from 'react'
import EmptyState from '../../../default/EmptyState/EmptyState';

export default function SchedulesTable({ trainings, withTool, setSelectedTraining, setshowAttendanceModal }) {

    if (trainings?.length <= 0) {
        return <EmptyState />;
    }

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
                    {withTool && <th></th>}
                </tr>
            </thead>
            <tbody>
                {trainings?.map((training) => (
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
                        {withTool && 
                        <td>
                            <div className="flex flex-row gap-4">
                                <AiFillEye onClick={() => {
                                    console.log("CLICKED");
                                    setshowAttendanceModal(true)
                                    setSelectedTraining(training)
                                }} className="icon" />

                                <AiFillEdit className="icon text-orange-500"/>
                            </div>
                        </td>}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
