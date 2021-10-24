import { BASE_URL } from "./constants";
import axios from "axios";

const instance = axios.create({
  baseURL: BASE_URL,
});

export const Authenticate = async ({ email, password }) => {
  return await instance.post(`/Authentication/Login`, {
    email,
    password,
  });
};
