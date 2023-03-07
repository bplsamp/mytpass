import React from 'react'
import AdminPage from '../../../layouts/AdminPage'
import QueryApi from '../../../Query/QueryApi'
import moment from 'moment';
import EmptyState from '../../../default/EmptyState/EmptyState';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default function Audits() {

const { data } = QueryApi("audits", "/api/admin/audits");
console.log(data);
  return (
    <AdminPage>
        <div className="p-12 w-full text-gray-600">

        <div className="flex flex-row mb-5">
            <ReactHTMLTableToExcel
                className="button p-2"
                table="table-to-xls"
                filename="Audits Export"
                sheet="Audits Sheet"
                buttonText="Export to Excel"/>
        </div>
        
        <table 
        className="w-full"
        id="table-to-xls">
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
