import {
  getNotifications,
  markAsRead,
} from "../api/notificationApi";

const notificationService = {
  // Get All Notifications
  getNotifications: async () => {
    try {
      const data =
        await getNotifications();

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Mark Notification As Read
  markAsRead: async (
    notificationId
  ) => {
    try {
      const data = await markAsRead(
        notificationId
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default notificationService;