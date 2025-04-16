import { axiosPrivate } from "@/api/axios";
export async function deleteTeamMember(teamOfferId, memberId) {
  try {
    const { data } = await axiosPrivate.delete(
      `/teamsOffers/${teamOfferId}/deleteTeamMember`,
      { 
        data: { memberId }, 
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return data;
  } catch (error) {
    console.error('Delete Team Member Error:', error.response?.data);
    throw error;
  }
}