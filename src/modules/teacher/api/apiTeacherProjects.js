import { axiosPrivate } from "@/api/axios";

export const getTeacherProjects = async () => {
  const response = await axiosPrivate.get("/projectsOffers/myProjectOffer");
  return response.data;
};

export const deleteTeacherProject = async (id) => {
  const response = await axiosPrivate.delete(`/projectsOffers/${id}`);
  return response.data;
};

export const updateTeacherProject = async (id, data) => {
  const response = await axiosPrivate.patch(`/projectsOffers/${id}`, data);
  return response.data;
};