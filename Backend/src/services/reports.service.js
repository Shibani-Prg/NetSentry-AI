const pool = require("../db");

async function getSecurityReport({ range = "7d" } = {}) {
  const rangeMap = {
    "24h": "24 hours",
    "7d": "7 days",
    "30d": "30 days",
  };

  const interval = rangeMap[range];

  if (!interval) {
    const error = new Error(
      "Invalid range. Use 24h, 7d, or 30d."
    );
    error.statusCode = 400;
    throw error;
  }

  const summaryQuery = `
    SELECT
      COUNT(*)::int AS total_events,
      COUNT(*) FILTER (
        WHERE UPPER(se.severity) = 'CRITICAL'
      )::int AS critical_events,
      COUNT(*) FILTER (
        WHERE UPPER(se.severity) = 'HIGH'
      )::int AS high_events,
      COUNT(*) FILTER (
        WHERE UPPER(se.event_type) = 'FAILED_LOGIN'
      )::int AS failed_logins
    FROM security_events se
    WHERE se.created_at >= NOW() - $1::interval
  `;

  const severityQuery = `
    SELECT
      UPPER(se.severity) AS severity,
      COUNT(*)::int AS count
    FROM security_events se
    WHERE se.created_at >= NOW() - $1::interval
    GROUP BY UPPER(se.severity)
    ORDER BY severity
  `;

  const eventsQuery = `
    SELECT
      se.id,
      se.source_id,
      es.source_name,
      se.event_type,
      se.severity,
      se.source_ip::text AS source_ip,
      se.details,
      se.created_at
    FROM security_events se
    LEFT JOIN event_sources es ON es.id = se.source_id
    WHERE se.created_at >= NOW() - $1::interval
    ORDER BY se.created_at DESC, se.id DESC
  `;

  const [summaryResult, severityResult, eventsResult] =
    await Promise.all([
      pool.query(summaryQuery, [interval]),
      pool.query(severityQuery, [interval]),
      pool.query(eventsQuery, [interval]),
    ]);

  return {
    range,
    generatedAt: new Date().toISOString(),
    summary: summaryResult.rows[0],
    severityBreakdown: severityResult.rows,
    events: eventsResult.rows,
  };
}

module.exports = { getSecurityReport };