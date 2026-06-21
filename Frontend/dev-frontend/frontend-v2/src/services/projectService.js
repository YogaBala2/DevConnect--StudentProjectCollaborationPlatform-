import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getMyProjects,
  getSkillMatch,
  getProjectMembers,
} from "../api/projectApi";

const projectService = {
  // Get All Projects
  getProjects: async (queryParams = {}) => {
    try {
      const data = await getProjects(queryParams);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get Single Project
  getProjectById: async (projectId) => {
    try {
      const data = await getProjectById(projectId);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Create Project
  createProject: async (projectData) => {
    try {
      const data = await createProject(projectData);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update Project
  updateProject: async (
    projectId,
    projectData
  ) => {
    try {
      const data = await updateProject(
        projectId,
        projectData
      );

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Delete Project
  deleteProject: async (projectId) => {
    try {
      const data = await deleteProject(projectId);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get My Projects
  getMyProjects: async () => {
    try {
      const data = await getMyProjects();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get Skill Match
  getSkillMatch: async (projectId) => {
    try {
      const data = await getSkillMatch(projectId);
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get Project Members
  getProjectMembers: async (
    projectId
  ) => {
    try {
      const data = await getProjectMembers(
        projectId
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default projectService;