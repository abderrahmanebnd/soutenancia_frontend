import axios from "axios";

const LOGIN_URL = "/api/login";

export async function loginUser(credentials) {
  try {
    const response = await axios.post(LOGIN_URL, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
