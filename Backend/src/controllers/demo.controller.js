
const demoService = require("../services/demo.service");

const getDemoLoginPage = (req, res) => {
  return res.status(200).json({
    success: true,
    message: "NetSentry AI Demo API is running.",
  });
};

async function recordDemoLogin(req, res, next) {
  try {
    const username = String(req.body?.username || "").trim();

    if (!username || username.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Invalid demo username.",
      });
    }

    await demoService.createFailedLogin({
      username,
      sourceIP: demoService.getClientIP(req),
    });

    return res.status(201).json({
      success: true,
      message: "Failed login event recorded successfully!",
    });
  } catch (error) {
    next(error);
  }
}

async function generateDemoEvent(req, res, next) {
  try {
    const username = String(req.body?.username || "").trim();
    const eventType = String(req.body?.event_type || "").trim();

    if (!username || username.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid demo username.",
      });
    }

    const recordedEvent = await demoService.createSimulatorEvent({
      username,
      eventType,
      sourceIP: demoService.getClientIP(req),
    });

    return res.status(201).json({
      success: true,
      message: `${eventType} event recorded successfully!`,
      event: recordedEvent,
    });
  } catch (error) {
    if (error.message === "Unsupported demo event type.") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    next(error);
  }
}

function getDemoInfo(req, res, next) {
  try {
    const port = Number(process.env.PORT) || 5000;

    return res.json(
      demoService.getDemoConnectionInfo(port)
    );
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getDemoLoginPage,
  recordDemoLogin,
  generateDemoEvent,
  getDemoInfo,
};
