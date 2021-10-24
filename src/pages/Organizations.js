import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import OrganizationsTable from "../partials/tables/OrganizationsTable";
import { GetOrganizations } from "../services/api";

const Organizations = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orgs, setOrgs] = useState([]);

  useEffect(() => {
    async function retrieveOrgs() {
      try {
        const response = await GetOrganizations();
        setOrgs(response.data.result);
      } catch (error) {
        console.log(error.response);
      }
    }

    retrieveOrgs();
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
              <OrganizationsTable organizations={orgs} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Organizations;
