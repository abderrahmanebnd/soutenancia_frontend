import { axiosPrivate } from "@/api/axios";

// Team Composition Endpoints
export const getTeamCompositions = async () => {
  const response = await axiosPrivate.get("/settings/teamComposition");
  return response.data.data;
};

export const createTeamComposition = async (data) => {
  const response = await axiosPrivate.post('/settings/teamComposition', data);
  return response.data.data;
};

export const updateTeamComposition = async (id, data) => {
  const response = await axiosPrivate.patch(`/settings/teamComposition/${id}`, data);
  return response.data.data;
};

export const deleteTeamComposition = async (id) => {
  await axiosPrivate.delete(`/settings/teamComposition/${id}`);
  return id;
};

// Project Selection Endpoints
export const getProjectSelections = async () => {
  const response = await axiosPrivate.get("/settings/projectSelection");
  return response.data.data;
};

export const createProjectSelection = async (data) => {
  const response = await axiosPrivate.post('/settings/projectSelection', data);
  return response.data.data;
};

export const updateProjectSelection = async (id, data) => {
  const response = await axiosPrivate.patch(`/settings/projectSelection/${id}`, data);
  return response.data.data;
};

export const deleteProjectSelection = async (id) => {
  await axiosPrivate.delete(`/settings/projectSelection/${id}`);
  return id;
};