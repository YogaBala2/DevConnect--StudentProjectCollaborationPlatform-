const JoinRequest = require("../models/JoinRequest");
const Project = require("../models/Project");
const Notification = require("../models/Notification");
const Invitation = require("../models/Invitation");

// APPLY TO PROJECT
const applyToProject = async (req, res) => {
  try {
    const { projectId, role, coverNote } =
      req.body;

    const project =
      await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const existing =
      await JoinRequest.findOne({
        project: projectId,
        applicant: req.user._id,
      });

    if (existing) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    const request =
      await JoinRequest.create({
        project: projectId,
        applicant: req.user._id,
        role,
        coverNote,
      });

    console.log(
      "Join Request Created"
    );

    const notification =
      await Notification.create({
        recipient: project.owner,
        message: `${req.user.name} applied for ${role}`,
        type: "REQUEST_RECEIVED",
      });

    console.log(
      "Notification Created:",
      notification._id
    );

    res.status(201).json(request);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PROJECT REQUESTS
const getProjectRequests = async (
  req,
  res
) => {
  try {
    const requests =
      await JoinRequest.find({
        project:
          req.params.projectId,
      })
        .populate(
          "applicant",
          "name email skills"
        )
        .populate(
          "project",
          "title"
        );

    res.status(200).json(
      requests
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ACCEPT REQUEST
const acceptRequest = async (
  req,
  res
) => {
  try {
    console.log(
      "Accept Request Called"
    );

    const request =
      await JoinRequest.findById(
        req.params.id
      );

    console.log(
      "Request:",
      request
    );

    if (!request) {
      return res.status(404).json({
        message:
          "Request not found",
      });
    }

    request.status =
      "Accepted";

    await request.save();

    const project =
      await Project.findById(
        request.project
      );

    console.log(
      "Project:",
      project.title
    );

    const invitation =
      await Invitation.create({
        project: project._id,
        user: request.applicant,
        role: request.role,
      });

    console.log(
      "Invitation Created:",
      invitation
    );

    await Notification.create({
      recipient:
        request.applicant,
      message: `You received an invitation for ${project.title}`,
      type:
        "INVITATION_RECEIVED",
    });

    res.status(200).json({
      message:
        "Invitation Sent Successfully",
    });
  } catch (error) {
    console.log(
      "ACCEPT ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};

// REJECT REQUEST
const rejectRequest = async (
  req,
  res
) => {
  try {
    const request =
      await JoinRequest.findById(
        req.params.id
      );

    if (!request) {
      return res.status(404).json({
        message:
          "Request not found",
      });
    }

    request.status =
      "Rejected";

    await request.save();

    await Notification.create({
      recipient:
        request.applicant,
      message:
        "Your request was rejected",
      type:
        "REQUEST_REJECTED",
    });

    res.status(200).json({
      message:
        "Request Rejected",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// MY REQUESTS
const getMyRequests = async (
  req,
  res
) => {
  try {
    const requests =
      await JoinRequest.find({
        applicant:
          req.user._id,
      })
        .populate(
          "project",
          "title category status"
        )
        .sort({
          createdAt: -1,
        });

    res.status(200).json(
      requests
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyToProject,
  getProjectRequests,
  acceptRequest,
  rejectRequest,
  getMyRequests,
};