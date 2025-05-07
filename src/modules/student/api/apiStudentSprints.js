import { axiosPrivate } from "@/api/axios";

export async function getAllSprintsByProject(projectId) {
  try {
    const response = await axiosPrivate.get(`/projects/${projectId}/sprints`);
    return response.data.data.sprints;
  } catch (error) {
    console.error("error while getting all sprints :", error);
    throw error;
  }
}
export async function getSingleSprintByProject(projectId, sprintId) {
  try {
    const response = await axiosPrivate.get(
      `/projects/${projectId}/sprints/${sprintId}`
    );
    return response.data.data.sprint;
  } catch (error) {
    console.error("error while getting a single sprint :", error);
    throw error;
  }
}

export async function editSprintByProject(projectId, sprintId, data) {
  try {
    const response = await axiosPrivate.patch(
      `/projects/${projectId}/sprints/${sprintId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("error while editing a sprint :", error);
    throw error;
  }
}

export async function deleteSprintByProject(projectId, sprintId) {
  try {
    const response = await axiosPrivate.delete(
      `/projects/${projectId}/sprints/${sprintId}`
    );
    return response.data;
  } catch (error) {
    console.error("error while deleting a sprint :", error);
    throw error;
  }
}

export async function createSprintByProject(projectId, data) {
  try {
    const response = await axiosPrivate.post(
      `/projects/${projectId}/sprints`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("error while creating a sprint :", error);
    throw error;
  }
}
