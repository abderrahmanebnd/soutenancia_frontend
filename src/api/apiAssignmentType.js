import { axiosPrivate } from "./axios";

export async function getAssignmentTypes() {
  try {
    const response = await axiosPrivate.get("/settings/assignmentTypes");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching assignment types:", error);
    throw error;
  }
}
export const createAssignmentMode = async (modeData) => {
  const response = await axiosPrivate.post('/settings/assignmentTypes', modeData);
  return response.data.data;
};

export const updateAssignmentMode = async (id, modeData) => {
  const response = await axiosPrivate.patch(`/settings/assignmentTypes/${id}`, modeData);
  return response.data.data;
};

export const deleteAssignmentMode = async (id) => {
  await axiosPrivate.delete(`/settings/assignmentTypes/${id}`);
  return id;
};
