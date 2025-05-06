// api/apiUsers.ts
import { axiosPrivate } from "./axios";

export const userApi = {
  getCurrentUser: async () => {
    const response = await axiosPrivate.get("/users/me");
    return response.data.data.user; // Adjusted to match your API response structure
  },

  updateCurrentUser: async (payload) => {
    const response = await axiosPrivate.patch("/users/updateMe", payload);
    return response.data.data.user; // Adjusted to match your API response structure
  },
};