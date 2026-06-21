import axiosInstance from "./axiosInstance";

// Get My Invitations
export const getMyInvitations =
  async () => {
    const response =
      await axiosInstance.get(
        "/invitations/my"
      );

    return response.data;
  };

// Accept Invitation
export const acceptInvitation =
  async (id) => {
    const response =
      await axiosInstance.put(
        `/invitations/accept/${id}`
      );

    return response.data;
  };

// Decline Invitation
export const declineInvitation =
  async (id) => {
    const response =
      await axiosInstance.put(
        `/invitations/decline/${id}`
      );

    return response.data;
  };