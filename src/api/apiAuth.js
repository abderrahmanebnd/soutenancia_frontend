import { axiosPrivate } from "./axios";

export async function loginUser(credentials) {
  try {
    const response = await axiosPrivate.post("/auth/login", credentials);
    return response.data.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const response = await axiosPrivate.get("/users/me");
    return response.data.data;
  } catch (error) {
    console.error("Auth check error:", error);
    throw error;
  }
}
