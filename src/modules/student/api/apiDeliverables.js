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

export async function getAllDeliverablesBySprint(sprintId) {
  try {
    const response = await axiosPrivate.get(
      `/sprints/${sprintId}/deliverables`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error while fetching deliverables:", error);
    throw error;
  }
}

export async function deleteDeliverableById(sprintId, deliverableId) {
  try {
    const response = await axiosPrivate.delete(
      `/sprints/${sprintId}/deliverables/${deliverableId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while deleting deliverable:", error);
    throw error;
  }
}
