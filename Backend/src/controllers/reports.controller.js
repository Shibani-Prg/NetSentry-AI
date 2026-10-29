const { getSecurityReport } = require("../services/reports.service");

async function getReport(req, res, next) {
  try {
    const { range = "7d" } = req.query;

    const report = await getSecurityReport({ range });

    res.status(200).json({
      success: true,
      report,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { getReport };