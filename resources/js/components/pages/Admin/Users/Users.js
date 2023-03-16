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
import { apost } from "../../../shared/query";
import { Search } from "../AdminDefault/Search";
import { AdminSelect } from "../AdminDefault/AdminSelect";

export default function Users() {
    const location = useLocation();
    const currentPath = location?.pathname;
    
    const [SearchText, setSearchText] = useState("");
    const [SortBy, setSortBy] = useState("Alphabetical (A-Z)");
    const [Expertise, setExpertise] = useState("");

    let { isLoading, error, data, isFetching, isError } = QueryApi(
        `${currentPath.replace("/admin/", "")}`,
        `/api${currentPath}`,
        console.log(data)
    );

    const handleDelete = async (e, id) => {
        e.preventDefault();

        const res = await apost("/api/admin/deleteUser", {id})
        alert(res?.data?.message)
    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (e.target.value == "Default") {
            setExpertise("");
            return;
        }
        setExpertise(value);
    };

    const handleSort = (e) => {
        const { name, value } = e.target;

        setSortBy(value);
    };
    const handleSearch = (e) => {
        setSearchText(e.target.value);
        //refetch();
    };

    useEffect(() => {
        if (data) {
            if (SortBy == "Alphabetical (A-Z)") {
                data = data?.users?.sort((a, b) =>
                    b?.lastName.localeCompare(a?.lastName)
                );
                console.log("called1");
            } else {
                data = data?.users?.sort((a, b) =>
                    a?.lastName.localeCompare(b?.lastName)
                );
                console.log("called2");
            }
        }
    }, [SortBy, data]);
    
    const tableRef = useRef(null);
    return (
        <AdminPage>
            <div className="p-12 w-full text-gray-600">
                <Card className={`mx-4 p-8 flex flex-col gap-4`}>
                    <Search
                        value={SearchText}
                        handleSearch={handleSearch}
                        placeholder="🔍︎ Search Users..."
                    />
                </Card>

                <div className="flex flex-row items-center gap-4 p-8">
                    <AdminSelect
                        label={`Expertise`}
                        value={Expertise}
                        setValue={handleInput}
                        options={[
                            "Default",
                            "Commercial Aspect",
                            "Human Aspect",
                            "Technical Aspect",
                            "Human Resource",
                            "Business Owner",
                        ]}
                    />
                    <AdminSelect
                        label={`Sort By:`}
                        value={SortBy}
                        setValue={handleSort}
                        options={["Alphabetical (A-Z)", "Alphabetical (Z-A)"]}
                    />
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
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Email Address</th>
                                <th>Company</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                               data?.users
                               ?.filter(
                                   (user) =>
                                       user?.expertise
                                           ?.toLowerCase()
                                           .includes(
                                               Expertise.toLowerCase()
                                           ) &&
                                       user?.firstName
                                           .toLowerCase()
                                           .includes(
                                               SearchText.toLowerCase()
                                           )
                               )
                               ?.map((user, idx) => (
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
                                        <td>{user?.lastName}</td>
                                        <td>{user?.firstName}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                            {user?.companyId
                                                ? user?.company?.companyName
                                                : "None"}
                                        </td>
                                        <td>
                                            <CgTrash 
                                                className="icon text-red-400 hover:opacity-80 cursor-pointer" 
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