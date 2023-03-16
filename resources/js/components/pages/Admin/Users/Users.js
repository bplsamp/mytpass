import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import AdminPage from "../../../layouts/AdminPage";
import Card from "../../../default/Card/Card";
import { useQuery } from "@tanstack/react-query";
import QueryApi from "../../../Query/QueryApi";
import { CgTrash } from "react-icons/cg";
import Cookies from "js-cookie";
import axios from "axios";
import EmptyState from "../../../default/EmptyState/EmptyState";
import avatar from "../../../assets/images/user.png";
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function Users() {
    const location = useLocation();
    const currentPath = location?.pathname;
    const[ result, setResult] = useState([]);

    const optExpertise = {
        "Default": "Default",
        "Commercial Aspect": "Commercial Aspect",
        "Human Aspect": "Human Aspect",
        "Technical Aspect": "Technical Aspect",
        "Business Owner": "Business Owner",
        "Human Resource": "Human Resource",
    }

    const optSortBy = {
        "Default": "Default",
        "Alphabetical (A-Z)": "Alphabetical (A-Z)",
        "Alphabetical (Z-A)": "Alphabetical (Z-A)",
    }

    const { isLoading, error, data, isFetching, isError } = QueryApi(
        `${currentPath.replace("/admin/", "")}`,
        `/api${currentPath}`,
        console.log(data)
    );

    const handleDelete = (e, id) => {
        e.preventDefault();


    }

    console.log("ERROR", String(error));

    console.log("user", data);
    
    const tableRef = useRef(null);
    return (
        <AdminPage>
            <div className="p-12 w-full text-gray-600">
                <Card className={`mx-4 p-8 flex flex-col gap-4`}>
                    <div className={`flex flex-row w-full gap-12`}>
                        <input
                            id="search_users"
                            name="search_users"
                            className="outline-0 px-4 py-2 border border-gray-200 w-full rounded-md"
                            placeholder={`Search Users...`}
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
                        {Object.keys(optExpertise).map((opt, idx) => (
                            <option key={idx}>{opt}</option>
                        ))}
                    </select>

                    <label htmlFor="expertise" className="px-2">{"Sort by:"}</label>
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
                        filename="Users Table"
                        sheet="Users Sheet"
                        currentTableRef={tableRef.current}
                    >
                        <button className="button p-2">
                            Export to Excel
                        </button>
                    </DownloadTableExcel>
                </div>

                {/* Show List of Users */}
                    {data?.users?.length > 0 ? (
                    <table 
                    className="w-full"
                    ref={tableRef}>
                        <thead className="bg-torange text-white text-left">
                            <tr>
                                <th></th>
                                <th>Role</th>
                                <th>Expertise</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Company</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data?.users?.map((user, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <img
                                                src={
                                                    user?.avatar
                                                        ? user?.avatar
                                                        : avatar
                                                }
                                                className="max-w-[50px] max-h-[50px]"
                                            ></img>
                                        </td>
                                        <td className="capitalize">
                                            {user?.role}
                                        </td>
                                        <td className="capitalize">
                                            {user?.expertise}
                                        </td>
                                        <td>{user?.firstName}</td>
                                        <td>{user?.lastName}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            {user?.companyId
                                                ? user?.company?.companyName
                                                : "None"}
                                        </td>
                                        <td>
                                            <CgTrash 
                                                className="icon text-red-400" 
                                                onClick={(e) => {
                                                    handleDelete(e, user?.id);
                                                }}
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