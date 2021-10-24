import React from "react";
import { Link } from "react-router-dom";
import { formatValue } from "../../utils/Utils";

const SalariesTable = (props) => (
  <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
    <header className="px-5 py-4 border-b border-gray-100">
      <h2 className="font-semibold text-gray-800">Salaries</h2>
    </header>
    <div className="p-3">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          {/* Table header */}
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
            <tr>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Pay Grade</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Starting Salary</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Ending Salary</div>
              </th>
              <th className="p-2 whitespace-nowrap">
                <div className="font-semibold text-left">Action</div>
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="text-sm divide-y divide-gray-100">
            {props.salaries.map((salary) => {
              return (
                <tr key={salary.id}>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {salary.payGrade}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {formatValue(salary.startingSalary)}
                      </div>
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="font-medium text-gray-800">
                        {formatValue(salary.endingSalary)}
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
export default SalariesTable;
