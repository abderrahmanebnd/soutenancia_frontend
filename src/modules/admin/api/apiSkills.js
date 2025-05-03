import { axiosPrivate } from "@/api/axios";

export async function getSkills() {
  try {
    const response = await axiosPrivate.get("/skills");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
}

export const createSkill = async (skillData) => {
  try {
    const response = await axiosPrivate.post('/skills', skillData);
    return response.data.data;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
};

export const updateSkill = async (id, skillData) => {
  try {
    const response = await axiosPrivate.patch(`/skills/${id}`, skillData);
    return response.data.data;
  } catch (error) {
    console.error("Error updating skill:", error);
    throw error;
  }
};

export const deleteSkill = async (id) => {
  try {
    await axiosPrivate.delete(`/skills/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting skill:", error);
    throw error;
  }
};