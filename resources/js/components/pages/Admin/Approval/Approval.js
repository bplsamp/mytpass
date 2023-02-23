import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AdminPage from "../../../layouts/AdminPage";
import Card from "../../../default/Card/Card";
import { useQuery } from "@tanstack/react-query";
import QueryApi from "../../../Query/QueryApi";
import { CgTrash } from "react-icons/cg";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import axios from "axios";
import EmptyState from "../../../default/EmptyState/EmptyState";
import avatar from "../../../assets/images/user.png";
import { apost } from "../../../shared/query";
import RejectModal from "./RejectModal"

export default function Approval() {
    const [ShowReject, setShowReject] = useState({ state: false });
    const location = useLocation();
    const currentPath = location?.pathname;
    const { isLoading, error, data, isFetching, refetch } = QueryApi(
        `${currentPath.replace("/admin/", "")}`,
        `/api/admin/approvals`
    );
    console.log(data);

    const handleApproveCompany = (e,  companyId) => {
        e.preventDefault(e);
        apost(
            "/api/admin/approveCompany",
            { companyId: companyId },
        );
        refetch();
     };

    return(
        <AdminPage>
            <div className="p-12 w-full text-gray-600">
                <Card className={`mx-4 p-8 flex flex-col gap-4`}>
                    <div className={`flex flex-row w-full gap-12`}>
                        <input
                            id="search_users"
                            name="search_users"
                            className="outline-0 px-4 py-2 border border-gray-200 w-full rounded-md"
                            placeholder={`Search Companies...`}
                        />
                    </div>
                </Card>

                {data?.length > 0 ? (
                    <table className="w-full">
                        <thead className="bg-torange text-white text-left">
                            <tr>
                                <th>Icon</th>
                                <th>Company Name</th>
                                <th>Owner</th>
                                <th>Company Address</th>
                                <th>DTI Number</th>
                                <th>Company Email</th>
                                <th>Contact Number</th>
                                <th>Documents</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((app) => (
                                <tr key={app?.id}>
                                    <td>
                                        <img
                                            src={app?.icon}
                                            className="max-w-[70px] max-h-[70px] object-scale-down"
                                        ></img>
                                    </td>
                                    <td>{app?.companyName}</td>
                                    <td>
                                        {app?.owner?.firstName}{" "}
                                        {app?.owner?.lastName}
                                    </td>
                                    <td className="max-w-[250px]">
                                        {app?.address}
                                    </td>
                                    <td>{app?.dtiNumber}</td>
                                    <td>{app?.companyEmail}</td>
                                    <td>{app?.companyContact}</td>
                                    <td>
                                        <div className="flex flex-col">
                                            {app?.files?.map((doc, i) => (
                                                <span
                                                    className="text-blue-400 cursor-pointer hover:opacity-80"
                                                    key={doc?.id}
                                                    onClick={() =>
                                                        downloadFile(doc)
                                                    }
                                                >
                                                    {doc?.filename
                                                        ? `${doc?.filename}`
                                                        : "None"}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    <td>
                                        <div className="flex flex-row gap-2 ">
                                            <AiFillCheckCircle
                                                onClick={(e) =>
                                                    handleApproveCompany(
                                                        e,
                                                        app?.id
                                                    )
                                                }
                                                className="icon text-green-500 
                                                cursor-pointer hover:opacity-[50%]"
                                            />
                                            <AiFillCloseCircle
                                                onClick={() =>
                                                    setShowReject({
                                                        state: true,
                                                        id: app?.id,
                                                        companyName:
                                                            app?.companyName,
                                                    })
                                                }
                                                className="icon text-red-400
                                                cursor-pointer hover:opacity-[50%]"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <EmptyState />
                )}
            </div>
            
            {ShowReject.state && (
                <RejectModal
                    close={() => setShowReject(false)}
                    company={ShowReject?.companyName}
                />
            )}

        </AdminPage>
    )
}