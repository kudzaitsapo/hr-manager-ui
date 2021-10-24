import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import DepartmentsTable from "../partials/tables/DepartmentsTable";
import { GetDepartments } from "../services/api";

const Departments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [depts, setDepts] = useState([]);

  useEffect(() => {
    async function getDeptsAsync() {
      try {
        const response = await GetDepartments();
        setDepts(response.data.result);
      } catch (error) {
        console.log(error.response);
      }
    }
    getDeptsAsync();
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
            {/* Table */}
            <div className="grid grid-cols-12">
              <DepartmentsTable departments={depts} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Departments;
