import React, { useRef } from 'react'
import AdminPage from '../../../layouts/AdminPage'
import QueryApi from '../../../Query/QueryApi'
import moment from 'moment';
import EmptyState from '../../../default/EmptyState/EmptyState';
import { DownloadTableExcel } from 'react-export-table-to-excel';

export default function Audits() {

const { data } = QueryApi("audits", "/api/admin/audits");
console.log(data);
const tableRef = useRef(null);
  return (
    <AdminPage>
        <div className="p-12 w-full text-gray-600">

        <div className="flex flex-row mb-5">
            <DownloadTableExcel
                filename="Audits Table"
                sheet="Audits Sheet"
                currentTableRef={tableRef.current}
            >
                <button className="button p-2">
                    Export to Excel
                </button>
            </DownloadTableExcel>
        </div>
        
        <table 
        className="w-full"
        ref={tableRef}>
            <thead className="bg-torange text-white text-left">
                <tr>
                    <th>User ID</th>
                    <th>By</th>
                    <th>Operation</th>
                    <th>Target Model</th>
                    <th>Description</th>

                    <th>Created At</th>
                </tr>
            </thead>
            {data?.length > 0 ? (
            <tbody>
                {data && 
                data?.map((audit) => (
                    <tr key={audit?.id}>
                        <td>{audit?.id}</td>
                        <td>{audit?.by}</td>
                        <td className="uppercase">{audit?.operation}</td>
                        <td className="uppercase">{audit?.targetModel}</td>
                        <td>{audit?.description}</td>
                        <td>
                            {moment(audit?.created_at).format(
                                "MMM DD, YYYY hh:mm:ss a"
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>) : (<EmptyState/>) }
        </table>
        </div>
    </AdminPage>
  )
}
