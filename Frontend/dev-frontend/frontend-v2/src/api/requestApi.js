import axiosInstance from "./axiosInstance";

// Apply To Project
export const applyToProject = async (
  projectId,
  role,
  coverNote = ""
) => {
  const response = await axiosInstance.post(
    "/requests/apply",
    {
      projectId,
      role,
      coverNote,
    }
  );

  return response.data;
};

// Get My Requests
export const getMyRequests = async () => {
  const response = await axiosInstance.get(
    "/requests/my"
  );

  return response.data;
};

// Get Requests For A Project
export const getProjectRequests = async (
  projectId
) => {
  const response = await axiosInstance.get(
    `/requests/project/${projectId}`
  );

  return response.data;
};

// Accept Request
export const acceptRequest = async (
  requestId
) => {
  const response = await axiosInstance.put(
    `/requests/accept/${requestId}`
  );

  return response.data;
};

// Reject Request
export const rejectRequest = async (
  requestId
) => {
  const response = await axiosInstance.put(
    `/requests/reject/${requestId}`
  );

  return response.data;
};

export default {
  applyToProject,
  getMyRequests,
  getProjectRequests,
  acceptRequest,
  rejectRequest,
};