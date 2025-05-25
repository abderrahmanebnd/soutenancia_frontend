import { axiosPrivate } from "./axios";

export const getTeamCompositions = async () => {
  try {
    const response = await axiosPrivate.get("/api/v1/settings/teamComposition");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching team compositions:", error);
    throw error;
  }
};

export const createTeamComposition = async (data) => {
  try {
    const response = await axiosPrivate.post('/api/v1/settings/teamComposition', {
      specialityId: data.specialityId,
      startDate: data.startDate,
      endDate: data.endDate
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating team composition:", error);
    throw error;
  }
};

export const updateTeamComposition = async (id, data) => {
  try {
    const response = await axiosPrivate.patch(`/api/v1/settings/teamComposition/${id}`, {
      specialityId: data.specialityId,
      startDate: data.startDate,
      endDate: data.endDate
    });
    return response.data.data;
  } catch (error) {
    console.error("Error updating team composition:", error);
    throw error;
  }
};

export const deleteTeamComposition = async (id) => {
  try {
    await axiosPrivate.delete(`/api/v1/settings/teamComposition/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting team composition:", error);
    throw error;
  }
};