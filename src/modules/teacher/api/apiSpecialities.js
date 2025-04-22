import { axiosPrivate } from "@/api/axios";

export const getSpecialities = async () => {
  try {
    const response = await axiosPrivate.get("/specialities");
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("You don't have permission to view specialities. Please login again.");
    }
    const errorMessage = error.response?.data?.error || "Failed to fetch specialities";
    throw new Error(errorMessage);
  }
};