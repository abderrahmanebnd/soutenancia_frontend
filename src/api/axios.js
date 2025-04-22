import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1"; // Ensure this matches the API's base URL
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
