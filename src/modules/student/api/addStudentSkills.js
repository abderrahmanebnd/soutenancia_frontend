import { axiosPrivate } from "@/api/axios";

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
