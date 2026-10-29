
const pool = require("../db");
const {
  getDetectionConfig,
} = require("./detectionConfig.service");

async function getFailedLoginDetections() {
  const config = await getDetectionConfig();

  const query = `
    SELECT
      source_ip,
      COUNT(*)::int AS failed_attempts,
      MIN(created_at) AS first_seen,
      MAX(created_at) AS last_seen
    FROM security_events
    WHERE event_type = 'FAILED_LOGIN'
      AND source_ip IS NOT NULL
      AND created_at >= NOW() - ($1 * INTERVAL '1 minute')
    GROUP BY source_ip
    HAVING COUNT(*) >= $2
    ORDER BY failed_attempts DESC
  `;

  const result = await pool.query(query, [
    config.detectionWindow,
    config.failedLoginThreshold,
  ]);

  return result.rows;
}

module.exports = { getFailedLoginDetections };
