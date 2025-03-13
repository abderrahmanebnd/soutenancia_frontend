import { axiosPrivate } from "@/api/axios";

export async function getAvailableSkills() {
  try {
    const response = await axiosPrivate.get("/students/skills");
    return response.data.data;
  } catch (error) {
    console.error("error while getting student skills:", error);
    throw error;
  }
}
