import { axiosPrivate } from "@/api/axios";

export async function getMyProjectDetails() {
  try {
    const response = await axiosPrivate.get("/my-assigned-project");
    return response.data.data.assignedProject;
  } catch (error) {
    console.error("error while fetching project details :", error);
    throw error;
  }
}
