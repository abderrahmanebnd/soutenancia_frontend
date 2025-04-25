import { axiosPrivate } from "@/api/axios";

export const deleteTeacherProject = async (id) => {
  const response = await axiosPrivate.delete(`/projectsOffers/${id}`);
  return response.data;
};

export const updateTeacherProject = async (id, data) => {
  const response = await axiosPrivate.patch(`/projectsOffers/${id}`, data);
  return response.data;
};

export async function getProjectCompositionCountdown() {
  try {
    const response = await axiosPrivate.get("/settings/projectSelection");
    return response.data.data;
  } catch (error) {
    console.error("error while getting project composition countdown:", error);
    throw error;
  }
}
