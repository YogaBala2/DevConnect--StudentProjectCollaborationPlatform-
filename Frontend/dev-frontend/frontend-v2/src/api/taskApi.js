import axiosInstance from "./axiosInstance";

// CREATE TASK
export const createTask = async (
  taskData
) => {
  const response =
    await axiosInstance.post(
      "/tasks",
      taskData
    );

  return response.data;
};

// GET PROJECT TASKS
export const getProjectTasks =
  async (projectId) => {
    const response =
      await axiosInstance.get(
        `/tasks/project/${projectId}`
      );

    return response.data;
  };

// UPDATE TASK
export const updateTask = async (
  taskId,
  taskData
) => {
  const response =
    await axiosInstance.put(
      `/tasks/${taskId}`,
      taskData
    );

  return response.data;
};
// UPDATE TASK STATUS
export const updateTaskStatus =
  async (taskId, status) => {
    const response =
      await axiosInstance.put(
        `/tasks/status/${taskId}`,
        { status }
      );

    return response.data;
  };
// DELETE TASK
export const deleteTask = async (
  taskId
) => {
  const response =
    await axiosInstance.delete(
      `/tasks/${taskId}`
    );

  return response.data;
};