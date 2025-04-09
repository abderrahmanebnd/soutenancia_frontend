import { axiosPrivate } from "@/api/axios";

export const getMyApplications = async () => {
  try {
    const response = await axiosPrivate.get("/teamApplications/myApplications");
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("You don't have permission to view applications. Please login again.");
    }
    const errorMessage = error.response?.data?.error || "Failed to fetch applications";
    throw new Error(errorMessage);
  }
};