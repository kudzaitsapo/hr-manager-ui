import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import { GetEmployee } from "../services/api";
import UserAvatar from "../images/user-avatar-32.png";
import {
  capitalizeFirstLetter,
  formatAddress,
  formatDate,
  formatLongLine,
  formatValue,
} from "../utils/Utils";

const ViewEmployee = () => {
  const { id } = useParams();
  let history = useHistory();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    setLoading(true);
    async function getEmployeeInfo(empId) {
      try {
        const response = await GetEmployee(empId);
        setEmployee(response.data.result);
        setLoading(false);
      } catch (error) {
        console.log(error.response);
        setLoading(false);
      }
    }

    getEmployeeInfo(id);
  }, [id]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-2 w-full mx-auto">
            {/* Profile */}
            <div className="container mx-auto p-5">
              <div className="container mx-auto p-5">
                {/* Dashboard actions */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">
                  {/* Right: Actions */}
                  <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Add view button */}
                    <button
                      onClick={() => history.goBack()}
                      className="btn bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      <span className="hidden xs:block ml-2">Return</span>
                    </button>
                  </div>
                </div>
                <div className="md:flex no-wrap md:-mx-2 ">
                  {/* Left Side */}
                  <div className="w-full md:w-3/12 md:mx-2">
                    {/* Profile Card */}
                    <div className="bg-white p-3 border-t-4 border-blue-400">
                      <div className="image overflow-hidden">
                        <img
                          className="h-auto w-full mx-auto"
                          src={UserAvatar}
                          alt=""
                        />
                      </div>
                      <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                        {!loading && employee && employee?.firstname}&nbsp;
                        {!loading && employee && employee?.lastname}
                      </h1>
                      <h3 className="text-gray-600 font-lg text-semibold leading-6">
                        {!loading && employee && employee?.job?.jobTitle}
                      </h3>
                      <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 
                      divide-y rounded shadow-sm"
                      >
                        <li className="flex items-center py-3">
                          <span>Joined</span>
                          <span className="ml-auto">
                            {formatDate(employee?.hireDate)}
                          </span>
                        </li>
                      </ul>
                    </div>
                    {/* End of profile card */}
                    <div className="my-4"></div>
                  </div>
                  {/* Right Side */}
                  <div className="w-full md:w-9/12 mx-2 h-64">
                    {/* Profile tab */}
                    {/* About Section */}
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">About</span>
                      </div>
                      <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              First Name
                            </div>
                            <div className="px-4 py-2">
                              {!loading && employee && employee?.firstname}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Last Name
                            </div>
                            <div className="px-4 py-2">
                              {!loading && employee && employee?.lastname}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Gender
                            </div>
                            <div className="px-4 py-2">
                              {!loading &&
                                employee &&
                                capitalizeFirstLetter(employee?.gender)}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Contact No.
                            </div>
                            <div className="px-4 py-2">
                              {!loading && employee && employee?.mobileNumber}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Home Address
                            </div>
                            <div className="px-4 py-2">
                              {!loading &&
                                employee &&
                                formatAddress(employee?.homeAddress)}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Email.
                            </div>
                            <div className="px-4 py-2">
                              {!loading && employee && employee?.email}
                            </div>
                          </div>
                          <div className="grid grid-cols-2"></div>
                        </div>
                      </div>
                    </div>
                    {/* End of about section */}

                    <div className="my-5"></div>

                    {/* Job Details */}
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                      <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                          <svg
                            className="h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 
                              5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </span>
                        <span className="tracking-wide">Job Details</span>
                      </div>
                      <div className="text-gray-700">
                        <div className="grid md:grid-cols-2 text-sm">
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Job Title
                            </div>
                            <div className="px-4 py-2">
                              {!loading && employee && employee?.job?.jobTitle}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Job Description
                            </div>
                            <div className="px-4 py-2">
                              {!loading &&
                                employee &&
                                formatLongLine(
                                  employee?.job?.jobDescription,
                                  75
                                )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Department
                            </div>
                            <div className="px-4 py-2">
                              {!loading &&
                                employee &&
                                employee?.job?.department?.departmentName}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Organization
                            </div>
                            <div className="px-4 py-2">
                              {!loading &&
                                employee &&
                                employee?.job?.department?.organization?.name}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Salary Range
                            </div>
                            <div className="px-4 py-2">
                              {!loading &&
                                employee &&
                                formatValue(
                                  employee?.job?.salaryRange?.startingSalary
                                ) +
                                  " - " +
                                  formatValue(
                                    employee?.job?.salaryRange?.endingSalary
                                  )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">
                              Pay Grade
                            </div>
                            <div className="px-4 py-2">
                              {!loading &&
                                employee &&
                                employee?.job?.salaryRange?.payGrade}
                            </div>
                          </div>
                          <div className="grid grid-cols-2"></div>
                        </div>
                      </div>
                      {/* End of Job Details */}
                    </div>
                    {/* End of profile tab */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewEmployee;
