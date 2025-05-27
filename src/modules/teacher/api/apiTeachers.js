import { axiosPrivate } from "@/api/axios";

export const getTeachers = async () => {
  try {
    const response = await axiosPrivate.get("/teachers");
    return response.data.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error(
        "You don't have permission to view teachers. Please login again."
      );
    }
    const errorMessage =
      error.response?.data?.error || "Failed to fetch teachers";
    throw new Error(errorMessage);
  }
};
