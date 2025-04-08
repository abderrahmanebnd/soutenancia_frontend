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
    const response = await axiosPrivate.patch(
      `/teamApplications/${idApplication}`,
      { status }
    );
    return response.data;
  } catch (error) {
    console.error("error while updating team application status :", error);
    throw error;
  }
}
