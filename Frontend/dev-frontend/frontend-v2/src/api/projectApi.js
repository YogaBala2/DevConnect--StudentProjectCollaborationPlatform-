import axiosInstance from "./axiosInstance";

// Get All Projects
export const getProjects = async (
queryParams = {}
) => {
const response = await axiosInstance.get(
"/projects",
{
params: queryParams,
}
);

return response.data;
};

// Get Single Project
export const getProjectById = async (
projectId
) => {
const response = await axiosInstance.get(
`/projects/${projectId}`
);

return response.data;
};

// Create Project
export const createProject = async (
projectData
) => {
const response = await axiosInstance.post(
"/projects",
projectData
);

return response.data;
};

// Update Project
export const updateProject = async (
projectId,
projectData
) => {
const response = await axiosInstance.put(
`/projects/${projectId}`,
projectData
);

return response.data;
};

// Delete Project
export const deleteProject = async (
projectId
) => {
const response = await axiosInstance.delete(
`/projects/${projectId}`
);

return response.data;
};

// Get My Projects
export const getMyProjects = async () => {
const response = await axiosInstance.get(
"/projects/my/projects"
);

return response.data;
};

// Get Skill Match
export const getSkillMatch = async (
projectId
) => {
const response = await axiosInstance.get(
`/projects/match/${projectId}`
);

return response.data;
};

// Get Project Members
export const getProjectMembers = async (
projectId
) => {
const response = await axiosInstance.get(
`/projects/${projectId}/members`
);

return response.data;
};
