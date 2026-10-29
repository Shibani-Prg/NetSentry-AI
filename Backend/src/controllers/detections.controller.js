
const detectionsService = require("../services/detections.service");
const {
  getDetectionConfig,
} = require("../services/detectionConfig.service");

async function getFailedLoginDetections(req, res, next) {
  try {
    const [detections, config] = await Promise.all([
      detectionsService.getFailedLoginDetections(),
      getDetectionConfig(),
    ]);

    res.status(200).json({
      success: true,
      detection_rule: `${config.failedLoginThreshold} or more failed logins from one IP within ${config.detectionWindow} minutes`,
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
