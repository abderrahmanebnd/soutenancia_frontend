import { axiosPrivate } from "@/api/axios";

export async function getTeacherApplicationsById(projectOfferId) {
  try {
    const response = await axiosPrivate.get(
      `/projects/${projectOfferId}/applications`
    );
    return response.data.data;
  } catch (error) {
    console.error("error while getting project applications by id :", error);
    throw error;
  }
}

export async function acceptProjectApplication(applicationId) {
  try {
    const response = await axiosPrivate.post(
      `/applications/${applicationId}/accept`
    );
    return response.data;
  } catch (error) {
    console.error("error while accepting project application :", error);
    throw error;
  }
}

export async function rejectProjectApplication(applicationId) {
  try {
    const response = await axiosPrivate.post(
      `/applications/${applicationId}/reject`
    );
    return response.data;
  } catch (error) {
    console.error("error while rejecting project application :", error);
    throw error;
  }
}
