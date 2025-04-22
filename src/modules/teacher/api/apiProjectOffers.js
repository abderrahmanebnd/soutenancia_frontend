import { axiosPrivate } from "@/api/axios";

export async function getProjectOffers() {
  try {
    const response = await axiosPrivate.get("/projectsOffers");
    return response.data.data;
  } catch (error) {
    console.error("error while getting project offers :", error);
    throw error;
  }
}
