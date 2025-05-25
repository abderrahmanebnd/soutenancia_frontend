import { axiosPrivate } from "@/api/axios";

export async function createNotesPerSprint(sprintId, data) {
  try {
    const response = await axiosPrivate.post(
      `/sprints/${sprintId}/notes`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("error while uploading a note :", error);
    throw error;
  }
}
export async function getAllNotesBySprint(sprintId) {
  try {
    const response = await axiosPrivate.get(`/sprints/${sprintId}/notes`);
    return response.data.data.notes;
  } catch (error) {
    console.error("Error while fetching notes:", error);
    throw error;
  }
}
export async function deleteNoteById(sprintId, noteId) {
  try {
    const response = await axiosPrivate.delete(
      `/sprints/${sprintId}/notes/${noteId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error while deleting note:", error);
    throw error;
  }
}
