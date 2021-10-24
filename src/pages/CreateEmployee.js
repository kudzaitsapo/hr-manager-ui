import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../partials/Header";
import Sidebar from "../partials/Sidebar";
import Flatpickr from "react-flatpickr";
import { CreateEmployeeAsync, GetJobs } from "../services/api";

const CreateEmployee = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  let history = useHistory();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    gender: "male",
    dateOfBirth: "",
    mobileNumber: "",
    jobId: "",
    hireDate: "",
  });
  const [homeAddress, setHomeAddress] = useState({
    houseNumber: "",
    streetName: "",
    suburbTownship: "",
    city: "",
    country: "",
    province: "",
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setFormState((prevState) => {
      return {
        ...prevState,
        [name]: target.value,
      };
    });
  };

  const handleAddressInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    setHomeAddress((prevState) => {
      return {
        ...prevState,
        [name]: target.value,
      };
    });
  };

  const handleDobChange = (date) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        dateOfBirth: new Date(date).toISOString().split("T")[0],
      };
    });
  };

  const handleHireDateChange = (date) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        hireDate: new Date(date).toISOString().split("T")[0],
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const employee = {
        ...formState,
        homeAddress: homeAddress,
      };
      console.log(employee);
      const response = await CreateEmployeeAsync(employee);
      console.log(response);
      if (response.data.statusCode && response.data.statusCode === 201) {
        setFormState({
          firstname: "",
          lastname: "",
          middlename: "",
          email: "",
          gender: "",
          dateOfBirth: "",
          mobileNumber: "",
          jobId: "",
          hireDate: "",
        });
      }
    } catch (error) {
      setError(error.response?.data?.error?.message);
    }
  };

  useEffect(() => {
    async function RetrieveJobs() {
      try {
        const response = await GetJobs();
        setJobs(response?.data?.result);
        setFormState((prevState) => {
          return {
            ...prevState,
            jobId: jobs[0]?.id,
          };
        });
      } catch (error) {
        console.log(error.response);
        setError(error.response?.data?.error?.message);
      }
    }

    if (jobs.length === 0) {
      RetrieveJobs();
    }
  }, [jobs]);

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
            {/* Create Employee Form */}
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Employee Details</p>
                  <p>Please fill all the employee's details.</p>
                  {error && <span className="text-red-500">{error}</span>}
                </div>
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  className="lg:col-span-2"
                >
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-2">
                        <label htmlFor="firstname">First name</label>
                        <input
                          type="text"
                          name="firstname"
                          onChange={handleInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label htmlFor="lastname">Last name</label>
                        <input
                          type="text"
                          name="lastname"
                          onChange={handleInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="middlename">Middle name</label>
                        <input
                          type="text"
                          name="middlename"
                          onChange={handleInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="text"
                          name="email"
                          onChange={handleInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="email@domain.com"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="gender">Gender</label>
                        <select
                          name="gender"
                          onChange={handleInputChange}
                          value={formState.gender}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="dateOfBirth">Date Of Birth</label>
                        <div className="relative">
                          <Flatpickr
                            name="dateOfBirth"
                            onChange={(date) => handleDobChange(date)}
                            className="form-input h-10 mt-1 border bg-gray-50 pl-9 text-gray-500 w-full 
                          hover:text-gray-600
                           font-medium"
                          />
                          <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                            <svg
                              className="w-4 h-4 fill-current text-gray-500 ml-3"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1
                               0 001-1V3a1 1 0 00-1-1zm-1
           12H2V6h12v8z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="mobileNumber">Mobile Number</label>
                        <input
                          type="text"
                          name="mobileNumber"
                          onChange={handleInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="jobId">Job</label>
                        <select
                          name="jobId"
                          value={formState.jobId}
                          onChange={handleInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        >
                          {jobs &&
                            jobs.map((job) => (
                              <option key={job?.id} value={job?.id}>
                                {job?.jobTitle}
                              </option>
                            ))}
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="hireDate">Hire Date</label>
                        <div className="relative">
                          <Flatpickr
                            onChange={(date) => handleHireDateChange(date)}
                            name="hireDate"
                            className="form-input h-10 mt-1 border bg-gray-50 pl-9 text-gray-500 w-full 
                          hover:text-gray-600
                           font-medium"
                          />
                          <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                            <svg
                              className="w-4 h-4 fill-current text-gray-500 ml-3"
                              viewBox="0 0 16 16"
                            >
                              <path
                                d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1
                               0 001-1V3a1 1 0 00-1-1zm-1
           12H2V6h12v8z"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="address">House Number</label>
                        <input
                          type="text"
                          onChange={handleAddressInputChange}
                          name="houseNumber"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          name="city"
                          onChange={handleAddressInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="country">Country</label>
                        <input
                          name="country"
                          type="text"
                          onChange={handleAddressInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="province">Province</label>
                        <input
                          name="province"
                          type="text"
                          onChange={handleAddressInputChange}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="suburbTownship">Suburb</label>
                        <input
                          type="text"
                          onChange={handleAddressInputChange}
                          name="suburbTownship"
                          className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        />
                      </div>

                      <div className="md:col-span-5 text-right">
                        <div className="inline-flex items-end">
                          <button
                            onClick={() => history.goBack()}
                            className="bg-yellow-500 mx-4 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="bg-blue-500 p-3 hover:bg-blue-700 text-white
                           font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreateEmployee;
