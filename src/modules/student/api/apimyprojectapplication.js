import { axiosPrivate } from "@/api/axios";

export const getMyProjectApplications = async () => {
  try {
    const response = await axiosPrivate.get("/my-applications");
    return response.data;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error("You don't have permission to view applications.");
    }
    const errorMessage = error.response?.data?.error || "Failed to fetch applications";
    throw new Error(errorMessage);
  }
};
export const cancelApplication = async (applicationId) => {
    try {
      const response = await axiosPrivate.patch(
        `/applications/${applicationId}/cancel`
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to cancel application";
      throw new Error(errorMessage);
    }
  };
  
  export const joinTeam = async (projectId, teamOfferId, message) => {
    try {
      const response = await axiosPrivate.post(
        `/projects/${projectId}/apply`,
        { teamOfferId, message }
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Failed to join team";
      throw new Error(errorMessage);
    }
  };