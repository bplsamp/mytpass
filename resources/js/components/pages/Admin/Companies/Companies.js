import React, { useState } from "react";
import AdminPage from "../../../layouts/AdminPage";
import { MdDomainDisabled, MdDomain } from "react-icons/md";
import { CgTrash } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import QueryApi from "../../../Query/QueryApi";
import Error from "../../../default/Error/Error";
import Card from "../../../default/Card/Card";
import EmptyState from "../../../default/EmptyState/EmptyState";

const RenderStatus = ({ status }) => {
    if (status === "Active") {
        return <span className="text-green-600">{status}</span>;
    } else if (status === "Deactivated") {
        return <span className="text-red-600">{status}</span>;
    } else {
        return <span className="">{status}</span>;
    }
};

const RenderButton = ({ status }) => {
    if (status === "Active") {
        return (
            <button className="flex flex-row gap-2  text-red-400">
                <MdDomainDisabled className="icon" />
                <span>Deactivate</span>
            </button>
        );
    } else if (status === "Deactivated") {
        return (
            <button className="flex flex-row gap-2  text-green-600">
                <MdDomain className="icon" />
                <span>Activate</span>
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

const options = {
    me: "ako",
    ako: "me",
}

export default function Companies() {
    const location = useLocation();
    const currentPath = location?.pathname;

    const { isLoading, error, data, isFetching, refetch } = QueryApi(
        `${currentPath.replace("/admin/", "")}`,
        `/api${currentPath}`,
        console.log(data)
    );

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
                    <label htmlFor="expertise" className="px-2">{"Expertise"}</label>
                    <select
                        id={"Expertise"}
                        name={"Expertise"}
                        className="border 
                        border-gray-400 outline-0 px-2 py-1"
                        placeholder="Select..."
                    >
                        {Object.keys(options).map((opt, idx) => (
                            <option key={idx}>{opt}</option>
                        ))}
                    </select>

                    <label htmlFor="subscription" className="px-2">{"Subscription:"}</label>
                    <select
                        id={"subscription"}
                        name={"subscription"}
                        className="border 
                        border-gray-400 outline-0 px-2 py-1"
                        placeholder="Select..."
                    >
                        {Object.keys(options).map((opt, idx) => (
                            <option key={idx}>{opt}</option>
                        ))}
                    </select>
                </div>

                {/* Show List of Users */}
                {data?.companies?.length > 0 ? (
                    <table className="w-full">
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
                                            ? company?.subscripion?.type
                                            : "Free"}
                                    </td>
                                    <td>
                                        <RenderStatus
                                            status={company?.companyStatus}
                                        />
                                    </td>
                                    <td>
                                        <RenderButton
                                            status={company?.companyStatus}
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