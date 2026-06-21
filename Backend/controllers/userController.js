const User = require("../models/User");

// GET Profile
const getMyProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE Profile
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.college =
      req.body.college ?? user.college;

    user.branch =
      req.body.branch ?? user.branch;

    user.year =
      req.body.year ?? user.year;

    user.bio =
      req.body.bio ?? user.bio;

    user.skills =
      req.body.skills ?? user.skills;

    user.github =
      req.body.github ?? user.github;

    user.linkedin =
      req.body.linkedin ?? user.linkedin;

    if (
      req.body.isOpenToCollaborate !==
      undefined
    ) {
      user.isOpenToCollaborate =
        req.body.isOpenToCollaborate;
    }

    const updatedUser =
      await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getUserById = async (
  req,
  res
) => {
  try {
    const user = await User.findById(
      req.params.id
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getMyProfile,
  updateProfile,
  getUserById,
};