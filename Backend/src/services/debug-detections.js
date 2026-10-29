
require("dotenv").config();

const pool = require("../db");

async function debugDetections() {
  try {
    const result = await pool.query(`
      SELECT
        NOW() AS database_time,
        source_ip,
        COUNT(*)::int AS total_failed_logins,
        COUNT(*) FILTER (
          WHERE created_at >= NOW() - INTERVAL '5 minutes'
        )::int AS recent_failed_logins,
        MIN(created_at) AS first_seen,
        MAX(created_at) AS last_seen
      FROM security_events
      WHERE event_type = 'FAILED_LOGIN'
        AND source_ip IS NOT NULL
      GROUP BY source_ip
      ORDER BY recent_failed_logins DESC;
    `);

    console.log(JSON.stringify(result.rows, null, 2));
  } catch (error) {
    console.error("Debug error:", error.message);
  } finally {
    await pool.end();
  }
}

debugDetections();
