
const pool = require("../db");

async function getDetectionConfig() {
  const result = await pool.query(`
    SELECT
      failed_login_threshold AS "failedLoginThreshold",
      detection_window_minutes AS "detectionWindow",
      updated_at AS "updatedAt"
    FROM detection_config
    WHERE id = 1
  `);

  if (result.rows.length === 0) {
    throw new Error("Detection configuration not found");
  }

  return result.rows[0];
}

async function updateDetectionConfig({
  failedLoginThreshold,
  detectionWindow,
}) {
  const threshold = Number(failedLoginThreshold);
  const windowMinutes = Number(detectionWindow);

  if (
    !Number.isInteger(threshold) ||
    threshold < 3 ||
    threshold > 20
  ) {
    const error = new Error("Threshold must be between 3 and 20");
    error.status = 400;
    throw error;
  }

  if (
    !Number.isInteger(windowMinutes) ||
    windowMinutes < 1 ||
    windowMinutes > 30
  ) {
    const error = new Error("Detection window must be between 1 and 30 minutes");
    error.status = 400;
    throw error;
  }

  const result = await pool.query(
    `UPDATE detection_config
     SET failed_login_threshold = $1,
         detection_window_minutes = $2,
         updated_at = NOW()
     WHERE id = 1
     RETURNING
       failed_login_threshold AS "failedLoginThreshold",
       detection_window_minutes AS "detectionWindow",
       updated_at AS "updatedAt"`,
    [threshold, windowMinutes]
  );

  if (result.rows.length === 0) {
    throw new Error("Detection configuration not found; run the SQL setup first");
  }

  return result.rows[0];
}

module.exports = {
  getDetectionConfig,
  updateDetectionConfig,
};
