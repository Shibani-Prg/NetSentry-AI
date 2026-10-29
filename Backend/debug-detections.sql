SELECT
    NOW() AS database_time,
    source_ip,
    COUNT(*) AS total_failed_logins,
    COUNT(*) FILTER (
        WHERE created_at >= NOW() - INTERVAL '5 minutes'
    ) AS recent_failed_logins,
    MIN(created_at) AS first_seen,
    MAX(created_at) AS last_seen
FROM security_events
WHERE event_type = 'FAILED_LOGIN'
  AND source_ip IS NOT NULL
GROUP BY source_ip
ORDER BY recent_failed_logins DESC;
