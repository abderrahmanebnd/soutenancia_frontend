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

export async function addStudentSkills(skillsWithStudentId) {
  try {
    const response = await axiosPrivate.post(
      "/students/add-skills",
      skillsWithStudentId
    );
    return response.data.data;
  } catch (error) {
    console.error("error while adding student skills:", error);
    throw error;
  }
}
