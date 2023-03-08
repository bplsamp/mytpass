import React, { useState, useRef } from "react";
import AdminPage from "../../../layouts/AdminPage";
import { MdDomainDisabled, MdDomain } from "react-icons/md";
import { CgTrash } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import QueryApi from "../../../Query/QueryApi";
import Error from "../../../default/Error/Error";
import Card from "../../../default/Card/Card";
import EmptyState from "../../../default/EmptyState/EmptyState";
import { apost } from "../../../shared/query";
import { DownloadTableExcel } from 'react-export-table-to-excel';

const RenderStatus = ({ status }) => {
    if (status === "Active") {
        return <span className="text-green-600">{status}</span>;
    } else if (status === "Deactivated") {
        return <span className="text-red-600">{status}</span>;
    } else {
        return <span className="">{status}</span>;
    }
};

const RenderButton = ({ 
    status,
    refetch,
    id,
    ownerEmail 
    }) => {
    if (status === "inactive") {
        return (
            <button 
            className="flex flex-row gap-2  text-green-400">
                <MdDomain className="icon" />
                <span
                    onClick={async () => {
                        await apost(
                            "/api/admin/activate",
                            { id: id, ownerEmail: ownerEmail }
                        );
                        refetch();
                    }}
                >
                    Activate
                </span>
            </button>
        );
    } else if (status === "requested deactivation") {
        return (
            <button className="flex flex-row gap-2  text-red-600">
                <MdDomainDisabled className="icon" />
                <span
                    onClick={async () => {
                        await apost(
                            "/api/admin/deactivate",
                            { id: id, ownerEmail: ownerEmail }
                        );
                        refetch();
                    }}
                >
                    Deactivate
                </span>
            </button>
        );
        
    } else if (status === "active") {
        return (
            <button className="flex flex-row gap-2  text-gray-400">
                <MdDomain className="icon" />
                <span>None</span>
            </button>
        );
    } else {
        return (
            <button className="flex flex-row gap-2  text-gray-400">
                <MdDomain className="icon" />
                <span>None</span>
            </button>
        );
    }
};

const optSub = {
    "Default": "Default",
    "Basic": "Basic",
    "Premium": "Premium",
    "Platinum": "Platinum"
}

const optSortBy = {
    "Default": "Default",
    "Alphabetical (A-Z)": "Alphabetical (A-Z)",
    "Alphabetical (Z-A)": "Alphabetical (Z-A)",
}

export default function Companies() {
    const location = useLocation();
    const currentPath = location?.pathname;
    const[ result, setResult ] = useState([]);

    const { isLoading, error, data, isFetching, refetch } = QueryApi(
        `${currentPath.replace("/admin/", "")}`,
        `/api${currentPath}`,
    );
    console.log(data)

    const tableRef = useRef(null);
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

                <div className="flex flex-row items-center gap-4 p-8">
                    <label htmlFor="subscription" className="px-2">{"Subscription"}</label>
                    <select
                        id={"Subscription"}
                        name={"Subscription"}
                        className="border 
                        border-gray-400 outline-0 px-2 py-1"
                        placeholder="Select..."
                    >
                        {Object.keys(optSub).map((opt, idx) => (
                            <option key={idx}>{opt}</option>
                        ))}
                    </select>

                    <label htmlFor="sortby" className="px-2">{"Sort By:"}</label>
                    <select
                        id={"sortby"}
                        name={"sortby"}
                        className="border 
                        border-gray-400 outline-0 px-2 py-1"
                        placeholder="Select..."
                    >
                        {Object.keys(optSortBy).map((opt, idx) => (
                            <option key={idx}>{opt}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-row mb-5">
                    <DownloadTableExcel
                        filename="Companies Table"
                        sheet="Companies Sheet"
                        currentTableRef={tableRef.current}
                    >
                        <button className="button p-2">
                            Export to Excel
                        </button>
                    </DownloadTableExcel>
                </div>

                {/* Show List of Users */}
                {data?.companies?.length > 0 ? (
                    <table 
                    className="w-full"
                    ref={tableRef}>
                        <thead className="bg-torange text-white text-left">
                            <tr>
                                <th>Icon</th>
                                <th>Company Name</th>
                                <th>Owner</th>
                                <th>Company Address</th>
                                <th>Company Email</th>

                                <th>Contact Number</th>
                                <th>Subscription Status</th>
                                <th>Company Status</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.companies?.map((company) => (
                                <tr key={company?.id}>
                                    <td>
                                        <img
                                            src={company?.icon}
                                            className="max-w-[70px] max-h-[70px] object-scale-down"
                                        ></img>
                                    </td>
                                    <td>{company?.companyName}</td>
                                    <td>
                                        {company?.owner?.firstName}{" "}
                                        {company?.owner?.middleInitial}{" "}
                                        {company?.owner?.lastName}{" "}
                                    </td>
                                    <td>{company?.address}</td>
                                    <td>{company?.companyEmail}</td>
                                    <td>{company?.companyContact}</td>
                                    <td>
                                        {company?.subscription?.type
                                            ? company?.subscription?.type
                                            : "Free"}
                                    </td>
                                    <td>
                                        <RenderStatus
                                            status={company?.companyStatus}
                                        />
                                    </td>
                                    <td>
                                        {company?.reason != null
                                            ? company?.reason
                                            : "None"}
                                    </td>
                                    <td>
                                        <RenderButton
                                            status={company?.companyStatus}
                                            id={company?.id}
                                            refetch={refetch}
                                            ownerEmail={company?.owner?.email}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <EmptyState />
                )}

            </div>
        </AdminPage>
    )
}