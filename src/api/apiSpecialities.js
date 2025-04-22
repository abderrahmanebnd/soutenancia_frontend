import { axiosPrivate } from "./axios";

export async function getSpecialities() {
  try {
    const response = await axiosPrivate.get("/specialities");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching specialities:", error);
    throw error;
  }
}
