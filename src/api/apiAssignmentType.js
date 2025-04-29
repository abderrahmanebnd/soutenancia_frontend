import { axiosPrivate } from "./axios";

export async function getAssignmentTypes() {
  try {
    const response = await axiosPrivate.get("/settings/assignmentTypes");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching assignment types:", error);
    throw error;
  }
}
