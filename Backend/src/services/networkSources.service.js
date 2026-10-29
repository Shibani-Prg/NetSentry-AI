
const pool = require("../db");

async function getNetworkSources() {
  const query = `
    SELECT
      es.id,
      es.source_name,
      es.ip_address::text AS ip_address,
      es.created_at,
      COUNT(se.id)::int AS total_events,
      COUNT(se.id) FILTER (
        WHERE UPPER(se.severity) = 'CRITICAL'
      )::int AS critical_events,
      MAX(se.created_at) AS last_event_at
    FROM event_sources es
    LEFT JOIN security_events se
      ON se.source_id = es.id
    GROUP BY
      es.id,
      es.source_name,
      es.ip_address,
      es.created_at
    ORDER BY es.id ASC
  `;

  const result = await pool.query(query);
  return result.rows;
}

module.exports = { getNetworkSources };
