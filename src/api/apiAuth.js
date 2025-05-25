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

export async function forgotPassword(email) {
  try {
    const response = await axiosPrivate.post("/auth/forgot-password", email);
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
}

export async function verifyOneTimePassword(credentials) {
  try {
    const response = await axiosPrivate.post("/auth/verify-otp", credentials);
    return response.data;
  } catch (error) {
    console.error("Verify OTP error:", error);
    throw error;
  }
}

export async function resetPassword(passwords) {
  try {
    const response = await axiosPrivate.post("/auth/reset-password", passwords);
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
}

export async function signupUser(data) {
  try {
    const response = await axiosPrivate.post("/users", data);
    return response.data;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}
