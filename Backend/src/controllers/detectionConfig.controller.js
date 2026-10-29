
const {
  getDetectionConfig,
  updateDetectionConfig,
} = require("../services/detectionConfig.service");

async function getConfig(req, res, next) {
  try {
    const config = await getDetectionConfig();

    res.json({
      success: true,
      config,
    });
  } catch (error) {
    next(error);
  }
}

async function updateConfig(req, res, next) {
  try {
    const config = await updateDetectionConfig(req.body);

    res.json({
      success: true,
      message: "Detection configuration updated",
      config,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getConfig,
  updateConfig,
};
