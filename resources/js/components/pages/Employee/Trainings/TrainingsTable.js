import React from 'react'
import { CgTrash } from "react-icons/cg";
import { AiFillEye } from "react-icons/ai"

export default function TrainingsTable({trainings}) {
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
                    <th>Inputted By</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {trainings.map((training) => (
                    <tr key={training?.id}>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>{training?.title}</td>
                        <td>
                            <div className="flex flex-row p-2 gap-4">
                                <AiFillEye className="icon text-torange" />
                                <CgTrash className="icon text-red-400" />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
