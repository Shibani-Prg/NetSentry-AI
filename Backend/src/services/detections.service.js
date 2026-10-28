
const pool = require("../db");

async function getFailedLoginDetections() {
  const query = `
    SELECT
      source_ip,
      COUNT(*)::int AS failed_attempts,
      MIN(created_at) AS first_seen,
      MAX(created_at) AS last_seen
    FROM security_events
    WHERE event_type = 'FAILED_LOGIN'
      AND source_ip IS NOT NULL
      AND created_at >= NOW() - INTERVAL '5 minutes'
    GROUP BY source_ip
    HAVING COUNT(*) >= 5
    ORDER BY failed_attempts DESC
  `;

  const result = await pool.query(query);
  return result.rows;
}

module.exports = {
  getFailedLoginDetections,
};
