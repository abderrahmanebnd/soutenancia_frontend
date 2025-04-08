import { axiosPrivate } from "@/api/axios";

export async function applyToTeamOffer(offerId) {
  try {
    const response = await axiosPrivate.post("/teamApplications", offerId);
    return response.data;
  } catch (error) {
    console.error("error while applying to team offer :", error);
    throw error;
  }
}
export async function getTeamApplications() {
  try {
    const response = await axiosPrivate.get("/teamApplications");
    return response.data;
  } catch (error) {
    console.error("error while fetching team applications :", error);
    throw error;
  }
}

export async function updateTeamApplicationStatus(idApplication, status) {
  try {
    const applicationId = String(idApplication).trim();
    
    if (!applicationId) {
      throw new Error("Invalid application ID");
    }

    const response = await axiosPrivate.patch(
      `/teamApplications/${applicationId}`,
      { status }
    );
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
      error.message || 
      "Failed to update application status";
    console.error("Error updating application status:", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getMyApplications() {
  try {
    const response = await axiosPrivate.get("/teamApplications/myApplications");
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Failed to fetch applications";
    throw new Error(errorMessage);
  }
}