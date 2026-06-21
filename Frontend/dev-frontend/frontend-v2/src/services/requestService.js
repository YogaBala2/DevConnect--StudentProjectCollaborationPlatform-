import {
  applyToProject,
  getMyRequests,
  getProjectRequests,
  acceptRequest,
  rejectRequest,
} from "../api/requestApi";

const requestService = {
  // Apply To Project
  applyToProject: async (
    projectId,
    coverNote = ""
  ) => {
    try {
      const data = await applyToProject(
        projectId,
        coverNote
      );

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get My Requests
  getMyRequests: async () => {
    try {
      const data = await getMyRequests();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get Requests For Project
  getProjectRequests: async (
    projectId
  ) => {
    try {
      const data = await getProjectRequests(
        projectId
      );

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Accept Request
  acceptRequest: async (
    requestId
  ) => {
    try {
      const data = await acceptRequest(
        requestId
      );

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Reject Request
  rejectRequest: async (
    requestId
  ) => {
    try {
      const data = await rejectRequest(
        requestId
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default requestService;