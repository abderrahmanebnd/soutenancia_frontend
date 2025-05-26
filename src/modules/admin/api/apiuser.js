import { axiosPrivate } from "@/api/axios";

export const userApi = {
  getUsers: async (role, currentPage, limit = 10) => {
    const response = await axiosPrivate.get(
      `/users?page=${currentPage}&limit=${limit}&sort=createdAt&role=${role}`
    );
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axiosPrivate.post("/users", userData); // Fixed: Added "/users"
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

export async function getAllStudents(filterCriteria = "") {
  const response = await axiosPrivate.get(`/students?${filterCriteria}`);
  return response.data;
}
export async function getAllTeachers(filterCriteria = "") {
  const response = await axiosPrivate.get(`/teachers?${filterCriteria}`);
  return response.data;
}

export async function addExcelFileStudent(file) {
  const response = await axiosPrivate.post("/import/students", file, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
export async function addExcelFileTeacher(file) {
  const formData = new FormData();
  formData.append("excelFile", file);
  const response = await axiosPrivate.post("/import/teachers", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
