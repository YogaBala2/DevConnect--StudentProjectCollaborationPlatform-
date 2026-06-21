const mongoose = require("mongoose");

const dailyReportSchema =
  new mongoose.Schema(
    {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },

      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      todayWork: {
        type: String,
        required: true,
      },

      tomorrowPlan: {
        type: String,
        required: true,
      },

      hoursWorked: {
        type: Number,
        default: 0,
      },

      blockers: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "DailyReport",
  dailyReportSchema
);