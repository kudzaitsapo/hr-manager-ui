import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/Utils";

const LeavesTable = (props) => (
  <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
    <header className="px-5 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800">Employee Leaves</h2>
    </header>
    <div className="p-3">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          {/* Table header */}
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Employee</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Start Date</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">End Date</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Leave Type</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Approval Status</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Date Submitted</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Action</div>
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="text-sm divide-y divide-gray-100">
            {props.leaves.map((leave) => {
              return (
                <tr key={leave.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {leave.employee.firstname}&nbsp;
                        {leave.employee.lastname}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {formatDate(leave.startDate)}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {formatDate(leave.endDate)}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {leave.leaveType}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {leave.approvalStatus}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {formatDate(leave.dateSubmitted)}
                      </div>
                    </div>
                  </td>

                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                      <Link to={`/`}>View</Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
export default LeavesTable;
