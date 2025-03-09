import axios from "axios";

const BASE_URL = "https://soutenancia-backend.onrender.com/api/v1";
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});