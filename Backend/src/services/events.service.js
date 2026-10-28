
const pool = require("../db");

async function getEvents({
  page = 1,
  limit = 100,
  severity,
  search,
} = {}) {
  const offset = (page - 1) * limit;
  const conditions = [];
  const values = [];

  // Filter by severity
  if (severity) {
    values.push(severity);
    conditions.push(`UPPER(se.severity) = $${values.length}`);
  }

  // Search across IP, event type, and source name
  if (search && search.trim()) {
    values.push(`%${search.trim()}%`);
    const searchParam = `$${values.length}`;

   conditions.push(`(
            CAST(se.source_ip AS TEXT) ILIKE ${searchParam}
            OR CAST(se.event_type AS TEXT) ILIKE ${searchParam}
            OR CAST(es.source_name AS TEXT) ILIKE ${searchParam}
    )`);
  }

  const whereClause = conditions.length
    ? `WHERE ${conditions.join(" AND ")}`
    : "";

  // Count all matching records before pagination
  const countQuery = `
    SELECT COUNT(*)::int AS total
    FROM security_events se
    LEFT JOIN event_sources es ON es.id = se.source_id
    ${whereClause}
  `;

  const countResult = await pool.query(countQuery, values);
  const total = countResult.rows[0].total;

  // Fetch the requested page
  const dataValues = [...values, limit, offset];

  const eventsQuery = `
    SELECT
      se.id,
      se.source_id,
      es.source_name,
      se.event_type,
      se.severity,
      se.source_ip,
      se.details,
      se.created_at
    FROM security_events se
    LEFT JOIN event_sources es ON es.id = se.source_id
    ${whereClause}
    ORDER BY se.created_at DESC, se.id DESC
    LIMIT $${dataValues.length - 1}
    OFFSET $${dataValues.length}
  `;

  const eventsResult = await pool.query(eventsQuery, dataValues);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    events: eventsResult.rows,
  };
}

async function createEvent({
  source_id,
  event_type,
  severity,
  source_ip,
  details,
}) {
  const query = `
    INSERT INTO security_events
      (source_id, event_type, severity, source_ip, details)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING
      id,
      source_id,
      event_type,
      severity,
      source_ip,
      details,
      created_at
  `;

  const values = [
    source_id,
    event_type,
    severity,
    source_ip ?? null,
    details ?? {},
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  getEvents,
  createEvent,
};
