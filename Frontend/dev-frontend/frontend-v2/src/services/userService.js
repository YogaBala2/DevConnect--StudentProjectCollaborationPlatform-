import {
  getMyProfile,
  updateProfile,
} from "../api/userApi";

const userService = {
  getProfile: async () => {
    try {
      const data = await getMyProfile();
      return data;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const data = await updateProfile(profileData);

      const currentUser = JSON.parse(
        localStorage.getItem("user")
      );

      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          ...data,
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default userService;