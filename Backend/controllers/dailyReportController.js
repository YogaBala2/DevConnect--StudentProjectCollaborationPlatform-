const DailyReport =
  require("../models/DailyReport");

// CREATE REPORT
const createReport = async (
  req,
  res
) => {
  try {
    const report =
      await DailyReport.create({
        project:
          req.body.projectId,
        user: req.user._id,
        todayWork:
          req.body.todayWork,
        tomorrowPlan:
          req.body.tomorrowPlan,
        hoursWorked:
          req.body.hoursWorked,
        blockers:
          req.body.blockers,
      });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET PROJECT REPORTS
const getProjectReports =
  async (req, res) => {
    try {
      const reports =
        await DailyReport.find({
          project:
            req.params.projectId,
        })
          .populate(
            "user",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.json(reports);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

module.exports = {
  createReport,
  getProjectReports,
};