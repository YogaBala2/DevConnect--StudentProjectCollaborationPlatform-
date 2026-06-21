const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },
     rolesNeeded: [
  {
    role: {
      type: String,
      required: true,
    },

    openings: {
      type: Number,
      default: 1,
    },

    skills: [String],

    tasks: [String],
  },
],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],
  openRoles: [
  {
    title: String,
    tasks: [String],
  },
],
    requiredSkills: [
      {
        type: String,
      },
    ],

    teamSize: {
      type: Number,
      required: true,
    },

    currentMembers: {
      type: Number,
      default: 1,
    },

    deadline: {
      type: Date,
    },
    

    status: {
      type: String,
      enum: [
        "Planning",
        "In Progress",
        "Completed",
      ],
      default: "Planning",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Project",
  projectSchema
);