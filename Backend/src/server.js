const app = require("./app");
const env = require("./config/env");
const { initializeAdmin } = require("./services/adminSetup.service");


async function startServer() {
  try {
    await initializeAdmin();

    app.listen(env.PORT, () => {
      console.log(
        `NetSentry AI backend running on port ${env.PORT}`
      );
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
}

startServer();