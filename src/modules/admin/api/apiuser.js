import { axiosPrivate } from "@/api/axios";

export const userApi = {
  getUsers: async (role, page = 1, limit = 10) => {
    const response = await axiosPrivate.get(
      `/users?page=${page}&limit=${limit}&sort=-createdAt&role=${role}`
    );
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axiosPrivate.post("/users", userData);  // Fixed: Added "/users"
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axiosPrivate.patch(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axiosPrivate.delete(`/users/${id}`);
    return response.data;
  },
};