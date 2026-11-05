
const os = require("os");
const eventsService = require("./events.service");

const DEMO_EVENTS = {
  FAILED_LOGIN: {
    severity: "HIGH",
    message: "Simulated failed login attempt",
  },
  SUCCESSFUL_LOGIN: {
    severity: "LOW",
    message: "Simulated successful login",
  },
  SUSPICIOUS_ACCESS: {
    severity: "HIGH",
    message: "Simulated suspicious resource access",
  },
  UNUSUAL_ACTIVITY: {
    severity: "MEDIUM",
    message: "Simulated unusual application activity",
  },
  MULTIPLE_REQUESTS: {
    severity: "MEDIUM",
    message: "Simulated multiple requests",
  },
};

function getClientIP(req) {
  let ip = req.ip || req.socket.remoteAddress || "Unknown";

  if (ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  return ip;
}

function getLocalIPv4() {
  const interfaces = os.networkInterfaces();

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (entry.family === "IPv4" && !entry.internal) {
        return entry.address;
      }
    }
  }

  return null;
}

async function createDemoEvent({ username, eventType, sourceIP, method }) {
  const event = DEMO_EVENTS[eventType];

  if (!event) {
    throw new Error("Unsupported demo event type.");
  }

  return eventsService.createEvent({
    source_id: 1,
    event_type: eventType,
    severity: event.severity,
    source_ip: sourceIP,
    details: {
      username,
      method,
      message: event.message,
    },
  });
}

async function createFailedLogin({ username, sourceIP }) {
  return createDemoEvent({
    username,
    eventType: "FAILED_LOGIN",
    sourceIP,
    method: "LAN_DEMO",
  });
}

async function createSimulatorEvent({ username, eventType, sourceIP }) {
  return createDemoEvent({
    username,
    eventType,
    sourceIP,
    method: "LAN_SIMULATOR",
  });
}

function getDemoConnectionInfo() {
  const os = require("os");

  const interfaces = os.networkInterfaces();
  let ip = "localhost";

  for (const entries of Object.values(interfaces)) {
    for (const entry of entries || []) {
      if (entry.family === "IPv4" && !entry.internal) {
        ip = entry.address;
        break;
      }
    }

    if (ip !== "localhost") break;
  }

  return {
    demoUrl: `http://${ip}:5173/lan-simulator`,
  };
}

module.exports = {
  createFailedLogin,
  createSimulatorEvent,
  getDemoConnectionInfo,
  getClientIP,
};
