import axiosInstance from "./axiosInstance";

// CREATE REPORT
export const createReport = async (
  reportData
) => {
  const response =
    await axiosInstance.post(
      "/reports",
      reportData
    );

  return response.data;
};

// GET PROJECT REPORTS
export const getProjectReports =
  async (projectId) => {
    const response =
      await axiosInstance.get(
        `/reports/project/${projectId}`
      );

    return response.data;
  };