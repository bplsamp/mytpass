import React, { useState, useEffect } from 'react'
import { CgTrash } from "react-icons/cg";
import { AiFillEye, AiFillEdit } from "react-icons/ai"
import { apost } from '../../../shared/query';
import EmptyState from '../../../default/EmptyState/EmptyState';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import Certificate from '../../General/Certification/Certificate';
import { useAuth } from '../../../default/Session/SessionProvider';

export default function TrainingsTable({trainings, forwardedRef, refetch, disableMore, disableEdit, userName}) {
    const [showCert, setshowCert] = useState(false);
    const [CurrentTraining, setCurrentTraining] = useState("");
    const [user,  setUser] = useState(userName);
    const User = useAuth();

    console.log("USER"+user);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        await apost(
            "/api/trainings/delete",
            {
                id: id,
            },
        );
        refetch();
    }

    if (trainings?.length <= 0) {
        return <EmptyState />;
    }

    return (
        <table 
        ref={forwardedRef ? forwardedRef : null}
        className="bg-transparent rounded-lg shadow-lg w-full">
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
                    <th>Date Added</th>
                    {disableMore
                        ? (<></>) 
                        : (<th>Actions</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {trainings?.slice(0).reverse().map((training) => (
                    <>
                        {showCert && (
                                <Certificate
                                    training={CurrentTraining}
                                    user={user}
                                    close={() => setshowCert(false)}
                                />
                        )}
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
                            <td>{moment(training?.created_at).format(
                                "MMM DD, YYYY hh:mm A"
                            )}</td>
                            {disableMore 
                            ? (<></>) 
                            : (<td>
                                <div className="flex flex-row p-2 gap-4">
                                    {training?.companyId && training?.isScheduled == 1 ? (
                                        <button
                                            onClick={() => {
                                                setUser(userName)
                                                setCurrentTraining(training)
                                                setshowCert(true)
                                            }}
                                        >
                                            {" "}
                                            <AiFillEye className="icon text-torange  cursor-pointer hover:opacity-80" />
                                        </button>
                                        ) : training?.certificate && training?.isScheduled == 0 ? (
                                        <a
                                            href={training?.certificate}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {" "}
                                            <AiFillEye className="icon text-torange  cursor-pointer hover:opacity-80" />
                                        </a>
                                        ) : (
                                                <div><AiFillEye className="icon text-gray-400  cursor-pointer hover:opacity-80" /></div>
                                        )
                                    }
                                    {disableEdit ? (<></>) 
                                        : (
                                            <>
                                                    <CgTrash
                                                        className="icon text-red-400 cursor-pointer hover:opacity-80"
                                                        onClick={(e) => {
                                                        handleDelete(e, training?.id);
                                                        }}
                                                    />
                                            </>
                                        )
                                    }
                                </div>
                            </td>)
                            }
                        </tr>
                    </>
                ))}
            </tbody>
        </table>
    );
}
