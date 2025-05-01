import { axiosPrivate } from "@/api/axios";

export const getMyProjectApplications = async () => {
  try {
    const response = await axiosPrivate.get("/my-applications");
    return response.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to fetch applications"
    );
  }
};

export const cancelApplication = async (applicationId, teamOfferId) => {
  try {
    const response = await axiosPrivate.patch(
      `/applications/${applicationId}/cancel`,
      { teamOfferId }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to cancel application"
    );
  }
};

export const applyToProject = async (projectOfferId, teamOfferId, message) => {
  if (!projectOfferId || !teamOfferId) {
    throw new Error("projectOfferId and teamOfferId are required.");
  }

  try {
    const response = await axiosPrivate.post(
      `/projects/${projectOfferId}/apply`,
      { teamOfferId, message }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to apply to project"
    );
  }
};
