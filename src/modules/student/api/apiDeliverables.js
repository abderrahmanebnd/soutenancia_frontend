import { axiosPrivate } from "@/api/axios";

export async function createDeliverablesPerSprint(sprintId, data) {
  try {
    const response = await axiosPrivate.post(
      `/sprints/${sprintId}/deliverables`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("error while uploading a deliverable :", error);
    throw error;
  }
}
