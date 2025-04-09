import { axiosPrivate } from "@/api/axios";

export async function applyToTeamOffer(offerIdAndMessage) {
  try {
    const response = await axiosPrivate.post(
      "/teamApplications",
      offerIdAndMessage
    );
    return response.data;
  } catch (error) {
    console.error("error while applying to team offer :", error);
    throw error;
  }
}
export async function getTeamApplications() {
  try {
    const response = await axiosPrivate.get("/teamApplications");
    return response.data.applications;
  } catch (error) {
    console.error("error while fetching team applications :", error);
    throw error;
  }
}

export async function updateTeamApplicationStatus(
  statusApplication,
  idApplication
) {
  try {
    const response = await axiosPrivate.patch(
      `/teamApplications/${idApplication}`,
      statusApplication
    );
    return response.data;
  } catch (error) {
    console.error("error while updating team application status :", error);
    throw error;
  }
}