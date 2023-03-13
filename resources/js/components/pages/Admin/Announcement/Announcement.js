import React, { useState } from "react";
import AdminPage from "../../../layouts/AdminPage";
import { AiFillEdit } from "react-icons/ai";
import { RiImageEditFill } from "react-icons/ri";
import AddAnnouncementModal from "./AddAnnouncementModal";
import { useLocation } from "react-router-dom";
import EmptyState from "../../../default/EmptyState/EmptyState";
import { CgTrash } from "react-icons/cg";
import { apost } from "../../../shared/query";
import QueryApi from '../../../Query/QueryApi';

export default function Announcement() {
    const [ShowAdd, setShowAdd] = useState(false);
    const location = useLocation();
    const currentPath = location?.pathname;

    const { isLoading, error, data, isFetching, refetch } = QueryApi(
        `announcements`,
        `/api/announcements/get`
    );

    const handleDelete = async (e, id) => {
        e.preventDefault();
        await apost(
            "/api/announcements/delete",
            {
                id: id,
            },
            null
        );
        refetch();
    };

    return (
        <AdminPage>
            <div className="p-12 w-full text-gray-600 flex flex-col items-center">
                <button
                    onClick={() => setShowAdd(true)}
                    className="my-8 border border-torange font-bold text-torange px-4 py-1"
                >
                    Add Announcement +
                </button>

                {data?.length > 0 ? (
                    <table className="w-full">
                        <thead className="bg-torange text-white text-left">
                            <tr>
                                <th>Current Image</th>
                                <th>Current Link</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {data?.map((content) => (
                                <tr key={content?.id}>
                                    <td>
                                        <img
                                            src={content?.imageUrl}
                                            className="max-w-[100px] max-h-[100px]"
                                        />
                                    </td>
                                    <td>{content?.content}</td>
                                    <td>
                                        <div className="flex flex-row gap-4">
                                           {/*  <AiFillEdit className="icon" />
                                            <RiImageEditFill className="icon" /> */}
                                            <CgTrash
                                                onClick={(e) => {
                                                    handleDelete(
                                                        e,
                                                        content?.id
                                                    );
                                                }}
                                                className="icon text-red-400 hover:opacity-50 cursor-pointer"
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="pt-[2rem]">
                        <EmptyState />
                    </div>
                )}
            </div>
            {ShowAdd && (
                <AddAnnouncementModal close={() => setShowAdd(false)} refetch={refetch} />
            )}
        </AdminPage>
    );
}
