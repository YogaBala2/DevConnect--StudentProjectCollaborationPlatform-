const User = require("../models/User");
const calculateSkillMatch = require("../utils/skillMatchScore");
const Project = require("../models/Project");

// CREATE PROJECT
const createProject = async (req, res) => {
  try {
   
const {
  title,
  description,
  category,
  requiredSkills,
  teamSize,
  deadline,
  openRoles,
} = req.body;
    const project = await Project.create({
  title,
  description,
  category,
  requiredSkills,
  teamSize,
  deadline,
  openRoles,
  owner: req.user._id,

  members: [req.user._id],
});
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL PROJECTS

const getProjects = async (req, res) => {
  try {
    const {
      search,
      category,
      skill,
      status,
      page = 1,
      limit = 10,
      sort = "newest",
    } = req.query;

    let query = {};

    // Search by title
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter category
    if (category) {
      query.category = category;
    }

    // Filter skill
    if (skill) {
      query.requiredSkills = {
        $in: [skill],
      };
    }

    // Filter status
    if (status) {
      query.status = status;
    }

    let sortOption = {};

    if (sort === "newest") {
      sortOption = {
        createdAt: -1,
      };
    }

    if (sort === "oldest") {
      sortOption = {
        createdAt: 1,
      };
    }

    const projects = await Project.find(query)
      .populate("owner", "name email")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalProjects =
      await Project.countDocuments(query);

    res.status(200).json({
      totalProjects,
      currentPage: Number(page),
      totalPages: Math.ceil(
        totalProjects / limit
      ),
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET SINGLE PROJECT
const getProjectById = async (req, res) => {
  try {
    const project =
  await Project.findById(
    req.params.id
  )
    .populate(
      "owner",
      "name email"
    )
    .populate(
      "members",
      "name email"
    );
    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PROJECT
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (
      project.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    project.title =
      req.body.title ?? project.title;

    project.description =
      req.body.description ??
      project.description;

    project.category =
      req.body.category ??
      project.category;

    project.requiredSkills =
  req.body.requiredSkills ??
  project.requiredSkills;
  
      project.openRoles =
  req.body.openRoles ??
  project.openRoles;
    project.teamSize =
      req.body.teamSize ??
      project.teamSize;

    project.deadline =
      req.body.deadline ??
      project.deadline;

    project.status =
      req.body.status ??
      project.status;

    const updatedProject =
      await project.save();

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PROJECT
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(
      req.params.id
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (
      project.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    await project.deleteOne();

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET MY PROJECTS
const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { owner: req.user._id },
        { members: req.user._id },
      ],
    }).populate("owner", "name email");

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//skill Match
const getSkillMatch = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.projectId
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const user =
      await User.findById(
        req.user._id
      );

    const percentage =
      calculateSkillMatch(
        user.skills,
        project.requiredSkills
      );

    res.json({
      userSkills: user.skills,
      requiredSkills:
        project.requiredSkills,
      matchPercentage:
        percentage,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
//get project members
const getProjectMembers = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      ).populate(
        "members",
        "name email skills"
      );

    if (!project) {
      return res.status(404).json({
        message:
          "Project not found",
      });
    }

    res.status(200).json(
      project.members
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getMyProjects,
  getSkillMatch,
    getProjectMembers,
};