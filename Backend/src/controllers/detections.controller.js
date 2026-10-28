
const detectionsService = require("../services/detections.service");

async function getFailedLoginDetections(req, res, next) {
  try {
    const detections = await detectionsService.getFailedLoginDetections();

    res.status(200).json({
      success: true,
      detection_rule: "5 or more failed logins from one IP within 5 minutes",
      count: detections.length,
      detections,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getFailedLoginDetections,
};
