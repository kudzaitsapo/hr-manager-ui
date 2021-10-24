import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import EmployeesTable from "../partials/tables/EmployeesTable";
import { GetEmployees } from "../services/api";

const Employees = () => {
  const [employeesData, setEmployeesData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  let history = useHistory();
  useEffect(() => {
    async function getEmployeesData() {
      try {
        const response = await GetEmployees();
        console.log(response.data.result[0]);
        setEmployeesData(response.data.result);
      } catch (error) {
        console.log(error.response);
      }
    }
    getEmployeesData();
  }, []);
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Add view button */}
                <button
                  onClick={() => history.push("/add-employee")}
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                >
                  <svg
                    className="w-4 h-4 fill-current opacity-50 flex-shrink-0"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="hidden xs:block ml-2">Add Employee</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="grid grid-cols-12">
              <EmployeesTable employees={employeesData} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Employees;
