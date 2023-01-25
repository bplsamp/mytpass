import React from 'react'

export default function SchedulesTable({ trainings }) {
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
                    <th>Inputted By</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {trainings.map((training) => (
                    <tr key={training?.id}>
                        <td>{training?.title}</td>
                        <td>{training?.speaker}</td>
                        <td>{training?.provider}</td>
                        <td>{training?.category}</td>
                        <td>{training?.type}</td>
                        <td>{training?.completionDate}</td>
                        <td>{training?.expiryDate}</td>
                        <td>{training?.result}</td>
                        <td>{training?.feedback}</td>
                        <td>{training?.inputtedBy}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
