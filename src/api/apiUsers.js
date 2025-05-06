// api/apiUsers.ts
import { axiosPrivate } from "./axios";

// api/apiUsers.ts
export const userApi = {
  getCurrentUser: async () => {
    const response = await axiosPrivate.get("/users/me");
    return response.data.data.user;
  },

  updateCurrentUser: async (payload) => {
    const response = await axiosPrivate.patch("/users/updateMe", {
      ...payload,
      // Ensure Student data is properly structured
      Student: {
        specialityId: payload.specialityId,
        year: payload.year,
        customSkills: payload.customSkills
      }
    });
    return response.data.data.user;
  },
};