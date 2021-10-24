import axios from "axios";
import { BASE_URL } from "./constants";

const token = localStorage.getItem("token");

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Employees
export const GetEmployees = async (page = 1) => {
  return await instance.get(`/Employees?page=${page}`);
};

export const GetEmployee = async (employeeId) => {
  return await instance.get(`/Employees/${employeeId}`);
};

export const CreateEmployeeAsync = async (employeeData) => {
  return await instance.post(`/Employees`, employeeData);
};

// Jobs
export const GetJobs = async () => {
  return await instance.get(`/Jobs`);
};

// Departments
export const GetDepartments = async () => {
  return await instance.get("/Departments");
};

// Salaries
export const GetSalaries = async () => {
  return await instance.get("/Salaries");
};

// Organizations
export const GetOrganizations = async () => {
  return await instance.get("/Organizations");
};

// Employee Leaves
export const GetEmployeeLeaves = async () => {
  return await instance.get("/EmployeeLeaves");
};
