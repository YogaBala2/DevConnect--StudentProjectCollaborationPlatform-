const Invitation = require("../models/Invitation");
const Project = require("../models/Project");
const Notification = require("../models/Notification");

const getMyInvitations = async (
  req,
  res
) => {
  try {
    const invitations =
      await Invitation.find({
        user: req.user._id,
      }).populate(
        "project",
        "title description"
      );

    res.json(invitations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const acceptInvitation = async (
  req,
  res
) => {
  try {
    const invitation =
      await Invitation.findById(
        req.params.id
      );

    if (!invitation) {
      return res.status(404).json({
        message:
          "Invitation not found",
      });
    }

    invitation.status =
      "Accepted";

    await invitation.save();

    const project =
      await Project.findById(
        invitation.project
      );

    if (
      !project.members.includes(
        invitation.user
      )
    ) {
      project.members.push(
        invitation.user
      );

      await project.save();
    }

    await Notification.create({
      recipient: project.owner,
      message:
        "Invitation accepted",
    });

    res.json({
      message:
        "Invitation accepted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const declineInvitation = async (
  req,
  res
) => {
  try {
    const invitation =
      await Invitation.findById(
        req.params.id
      );

    invitation.status =
      "Declined";

    await invitation.save();

    res.json({
      message:
        "Invitation declined",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getMyInvitations,
  acceptInvitation,
  declineInvitation,
};