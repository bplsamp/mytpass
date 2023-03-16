import React, { useState, useEffect, useRef } from "react";
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
import { Search } from "../AdminDefault/Search";
import { AdminSelect } from "../AdminDefault/AdminSelect";

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

export default function Companies() {
    const location = useLocation();
    const currentPath = location?.pathname;
    
    const [SearchText, setSearchText] = useState("");
    const [SortBy, setSortBy] = useState("Alphabetical (A-Z)");
    const [Type, setType] = useState("");

    let { isLoading, error, data, isFetching, refetch } = QueryApi(
        `${currentPath.replace("/admin/", "")}`,
        `/api${currentPath}`,
    );

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (e.target.value == "Default") {
            setType("");
            return;
        }
        setType(value);
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
                data = data?.companies?.sort((a, b) =>
                    b?.companyName.localeCompare(a?.companyName)
                );
            } else {
                data = data?.companies?.sort((a, b) =>
                    a?.companyName.localeCompare(b?.companyName)
                );
            }
        }
    }, [SortBy, data]);

    const tableRef = useRef(null);
    return(
        <AdminPage>
            <div className="p-12 w-full text-gray-600">
                <Card className={`mx-4 p-8 flex flex-col gap-4`}>
                <Search
                    value={SearchText}
                    handleSearch={handleSearch}
                    placeholder="🔍︎ Search Company..."
                />
                </Card>

                <div className="flex flex-row items-center gap-4 p-8">
                    <AdminSelect
                        label={`Subscription`}
                        value={Type}
                        setValue={handleInput}
                        options={["Default", "Basic", "Premium", "Platinum"]}
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
                            {data?.companies?.filter(
                                    (company) =>
                                        company?.subscription?.type
                                            .toLowerCase()
                                            .includes(
                                                Type.toLowerCase()
                                            ) &&
                                        company?.companyName
                                            .toLowerCase()
                                            .includes(SearchText.toLowerCase())
                                )
                                ?.map((company) => (
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