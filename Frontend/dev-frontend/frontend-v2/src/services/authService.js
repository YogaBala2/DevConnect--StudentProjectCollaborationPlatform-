import {
  registerUser,
  loginUser,
} from "../api/authApi";

const authService = {
  // Register User
  register: async (userData) => {
    try {
      const data = await registerUser(userData);

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Login User
  login: async (userData) => {
    try {
      const data = await loginUser(userData);

      if (data.token) {
        localStorage.setItem(
          "token",
          data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Logout User
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get Current User
  getCurrentUser: () => {
    const user = localStorage.getItem("user");

    return user
      ? JSON.parse(user)
      : null;
  },

  // Check Authentication
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;