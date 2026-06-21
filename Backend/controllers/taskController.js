const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE TASK
const createTask = async (req, res) => {
  try {
    const {
      projectId,
      title,
      description,
      assignedTo,
      priority,
      deadline,
    } = req.body;

   const project =
  await Project.findById(projectId);

if (!project) {
  return res.status(404).json({
    message: "Project not found",
  });
}

// ONLY PROJECT OWNER CAN CREATE TASKS
if (
  project.owner.toString() !==
  req.user._id.toString()
) {
  return res.status(403).json({
    message:
      "Only project owner can create tasks",
  });
}

    const task = await Task.create({
      project: projectId,
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
      priority,
      deadline,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PROJECT TASKS
const getProjectTasks = async (
  req,
  res
) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate(
        "assignedTo",
        "name email"
      )
      .populate(
        "createdBy",
        "name"
      )
      .sort({
        createdAt: -1,
      });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE TASK
const updateTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.title =
      req.body.title ?? task.title;

    task.description =
      req.body.description ??
      task.description;

    task.assignedTo =
      req.body.assignedTo ??
      task.assignedTo;

    task.status =
      req.body.status ??
      task.status;

    task.priority =
      req.body.priority ??
      task.priority;

    task.deadline =
      req.body.deadline ??
      task.deadline;

    const updatedTask =
      await task.save();

    res.status(200).json(
      updatedTask
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE TASK
const deleteTask = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const project =
      await Project.findById(
        task.project
      );

    if (
      project.owner.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Only project owner can delete tasks",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message:
        "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
  // UPDATE TASK STATUS
const updateTaskStatus = async (
  req,
  res
) => {
  try {
    const task = await Task.findById(
      req.params.id
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    task.status =
      req.body.status;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getProjectTasks,
  updateTask,
  updateTaskStatus,
  deleteTask,
};