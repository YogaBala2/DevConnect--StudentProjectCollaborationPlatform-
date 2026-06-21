import axiosInstance from "./axiosInstance";

// Get Logged In User Profile
export const getMyProfile = async () => {
const response = await axiosInstance.get(
"/users/me"
);

return response.data;
};

// Update Profile
export const updateProfile = async (
profileData
) => {
const response = await axiosInstance.put(
"/users/me",
profileData
);

return response.data;
};

export const getUserById = async (
  userId
) => {
  const response =
    await axiosInstance.get(
      `/users/${userId}`
    );

  return response.data;
};
