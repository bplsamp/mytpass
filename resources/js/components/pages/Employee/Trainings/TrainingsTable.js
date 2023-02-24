import React from 'react'
import { CgTrash } from "react-icons/cg";
import { AiFillEye } from "react-icons/ai"
import { apost } from '../../../shared/query';
import EmptyState from '../../../default/EmptyState/EmptyState';

export default function TrainingsTable({trainings, refetch}) {
    const handleDelete = async (e, id) => {
        e.preventDefault();
        await apost(
            "/api/trainings/delete",
            {
                id: id,
            },
        );
    refetch();}

    if (trainings?.length <= 0) {
        return <EmptyState />;
    }

    return (
        <table className="bg-transparent rounded-lg shadow-lg w-full">
            <thead className="bg-[#3A3A3A] text-white text-left rounded-lg">
                <tr>
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
                    <th>Actions</th>
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
                        <td>
                            {training?.expiryDate
                                ? training?.expiryDate
                                : "No Expiration"}
                        </td>
                        <td>{training?.result}</td>
                        <td>{training?.feedback}</td>
                        <td>{training?.inputtedName}</td>
                        <td>
                            <div className="flex flex-row p-2 gap-4">
                                <a
                                    href={training?.certificate}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {" "}
                                    <AiFillEye className="icon text-torange  cursor-pointer hover:opacity-80" />
                                </a>
                                <CgTrash
                                    className="icon text-red-400 cursor-pointer hover:opacity-80"
                                    onClick={(e) => {
                                        handleDelete(e, training?.id);
                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
