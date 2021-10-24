import React from "react";
import { Link } from "react-router-dom";
import {
  capitalizeFirstLetter,
  formatAddress,
  formatDate,
} from "../../utils/Utils";

const EmployeesTable = (props) => (
  <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
    <header className="px-5 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800">Employees</h2>
    </header>
    <div className="p-3">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          {/* Table header */}
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Name</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Email</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Mobile Number</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Gender</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Hire Date</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Job</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Home Address</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Action</div>
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="text-sm divide-y divide-gray-100">
            {props.employees.map((employee) => {
              return (
                <tr key={employee.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {employee.firstname}&nbsp;{employee.lastname}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{employee.email}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{employee.mobileNumber}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      {capitalizeFirstLetter(employee.gender)}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                      {formatDate(employee.hireDate)}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">{employee.job.jobTitle}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                      {formatAddress(employee.homeAddress)}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left">
                      <Link to={`/employees/${employee.id}`}>View</Link>
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
export default EmployeesTable;
