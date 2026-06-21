import axiosInstance from "./axiosInstance";

// Get Notifications
export const getNotifications = async () => {
  const response = await axiosInstance.get(
    "/notifications"
  );

  return response.data;
};

// Mark Notification As Read
export const markAsRead = async (
  notificationId
) => {
  const response = await axiosInstance.put(
    `/notifications/${notificationId}/read`
  );

  return response.data;
};