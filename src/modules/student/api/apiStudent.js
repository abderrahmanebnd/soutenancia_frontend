import { axiosPrivate } from "@/api/axios";

export async function getTeamOffers() {
  try {
    const response = await axiosPrivate.get("/teamsOffers");
    return response.data;
  } catch (error) {
    console.error("error while getting team offers :", error);
    throw error;
  }
}

export async function getTeamOfferById(id) {
  try {
    const response = await axiosPrivate.get(`/teamsOffers/${id}`);
    return response.data;
  } catch (error) {
    console.error("error while getting team offer by id :", error);
    throw error;
  }
}

export async function getCurrentLeaderTeamOffer() {
  try {
    const response = await axiosPrivate.get("/teamsOffers/myTeamOffer");
    return response.data;
  } catch (error) {
    console.error("error while getting current leader team offer :", error);
    throw error;
  }
}

export async function editCurrentLeaderTeamOffer(id, data) {
  try {
    const response = await axiosPrivate.patch(`/teamsOffers/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("error while editing current leader team offer :", error);
    throw error;
  }
}
export async function deleteCurrentLeaderTeamOffer(id) {
  try {
    const response = await axiosPrivate.delete(`/teamsOffers/${id}`);
    return response.data;
  } catch (error) {
    console.error("error while deleting current leader team offer :", error);
    throw error;
  }
}
