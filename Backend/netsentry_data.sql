--
-- PostgreSQL database dump
--

\restrict yjCbnVFGU7MD3U6gK6EPurqItugzroy0z7TAclxGWh7DtRPrIMQaxzfsBdSKoGe

-- Dumped from database version 17.11
-- Dumped by pg_dump version 17.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: detection_config; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.detection_config (id, failed_login_threshold, detection_window_minutes, updated_at) FROM stdin;
1	4	5	2026-11-04 10:48:53.926646+05:30
\.


--
-- Data for Name: event_sources; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.event_sources (id, source_name, ip_address, created_at) FROM stdin;
1	NetSentry-Test-Sensor	192.168.1.10	2026-10-26 19:01:52.416317+05:30
\.


--
-- Data for Name: security_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.security_events (id, source_id, event_type, severity, source_ip, details, created_at) FROM stdin;
1	1	FAILED_LOGIN	HIGH	192.168.1.25	{"username": "test_user", "failed_attempts": 5}	2026-10-27 08:09:08.016666+05:30
2	1	FAILED_LOGIN	HIGH	192.168.1.25	{"attempt": 1, "username": "test_user"}	2026-10-27 08:16:10.139143+05:30
3	1	FAILED_LOGIN	HIGH	192.168.1.25	{"attempt": 2, "username": "test_user"}	2026-10-27 08:16:10.139143+05:30
4	1	FAILED_LOGIN	HIGH	192.168.1.25	{"attempt": 3, "username": "test_user"}	2026-10-27 08:16:10.139143+05:30
5	1	FAILED_LOGIN	HIGH	192.168.1.25	{"attempt": 4, "username": "test_user"}	2026-10-27 08:16:10.139143+05:30
6	1	FAILED_LOGIN	HIGH	192.168.1.25	{"attempt": 5, "username": "test_user"}	2026-10-27 08:16:10.139143+05:30
7	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "NetSentry AI detection test"}	2026-10-27 18:29:39.375036+05:30
8	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "NetSentry AI detection test"}	2026-10-27 18:30:04.574485+05:30
9	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "NetSentry AI detection test"}	2026-10-27 18:30:05.583851+05:30
10	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "NetSentry AI detection test"}	2026-10-27 18:30:06.597075+05:30
11	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "NetSentry AI detection test"}	2026-10-27 18:30:07.60778+05:30
12	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "reason": "Repeated failed login test"}	2026-10-27 18:58:35.399207+05:30
13	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "reason": "Repeated failed login test"}	2026-10-27 18:59:14.29742+05:30
14	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "reason": "Repeated failed login test"}	2026-10-27 19:01:32.792781+05:30
15	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "reason": "Repeated failed login test"}	2026-10-27 19:01:32.792781+05:30
16	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "reason": "Repeated failed login test"}	2026-10-27 19:01:32.792781+05:30
17	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "reason": "Repeated failed login test"}	2026-10-27 19:01:32.792781+05:30
18	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "reason": "Repeated failed login test"}	2026-10-27 19:01:32.792781+05:30
19	1	FAILED_LOGIN	HIGH	192.168.1.99	{}	2026-10-29 09:56:10.132941+05:30
20	1	FAILED_LOGIN	HIGH	192.168.1.99	{}	2026-10-29 09:56:10.170446+05:30
21	1	FAILED_LOGIN	HIGH	192.168.1.99	{}	2026-10-29 09:56:10.172862+05:30
22	1	FAILED_LOGIN	HIGH	192.168.1.99	{}	2026-10-29 09:56:10.174983+05:30
23	1	FAILED_LOGIN	HIGH	192.168.1.99	{}	2026-10-29 09:56:10.176919+05:30
24	1	MALWARE_DETECTED	CRITICAL	10.0.0.21	{"test": true, "message": "Sample malware detection"}	2026-10-29 10:16:35.757002+05:30
25	1	PRIVILEGE_ESCALATION	CRITICAL	10.0.0.22	{"test": true, "message": "Sample privilege escalation"}	2026-10-29 10:16:35.772431+05:30
26	1	SUSPICIOUS_TRAFFIC	MEDIUM	10.0.0.31	{"test": true, "message": "Sample suspicious traffic"}	2026-10-29 10:16:35.779761+05:30
27	1	PORT_SCAN	MEDIUM	10.0.0.32	{"test": true, "message": "Sample port scan"}	2026-10-29 10:16:35.786918+05:30
28	1	UNUSUAL_ACCESS	MEDIUM	10.0.0.33	{"test": true, "message": "Sample unusual access"}	2026-10-29 10:16:35.794482+05:30
29	1	POLICY_VIOLATION	MEDIUM	10.0.0.34	{"test": true, "message": "Sample policy violation"}	2026-10-29 10:16:35.801452+05:30
30	1	NORMAL_LOGIN	LOW	10.0.0.41	{"test": true, "message": "Sample low-risk login"}	2026-10-29 10:16:35.807749+05:30
31	1	DNS_QUERY	LOW	10.0.0.42	{"test": true, "message": "Sample DNS query"}	2026-10-29 10:16:35.851914+05:30
32	1	ROUTINE_ACTIVITY	LOW	10.0.0.43	{"test": true, "message": "Sample routine activity"}	2026-10-29 10:16:35.858169+05:30
33	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "message": "Synthetic failed-login detection test"}	2026-10-29 10:20:44.583244+05:30
34	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "message": "Synthetic failed-login detection test"}	2026-10-29 10:20:44.942649+05:30
35	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "message": "Synthetic failed-login detection test"}	2026-10-29 10:20:45.30143+05:30
36	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "message": "Synthetic failed-login detection test"}	2026-10-29 10:20:45.63173+05:30
37	1	FAILED_LOGIN	HIGH	192.168.1.99	{"test": true, "message": "Synthetic failed-login detection test"}	2026-10-29 10:20:45.95922+05:30
38	1	FAILED_LOGIN	HIGH	10.10.10.50	{"test": true, "message": "Detection threshold test"}	2026-10-29 10:25:20.039185+05:30
39	1	FAILED_LOGIN	HIGH	10.10.10.50	{"test": true, "message": "Detection threshold test"}	2026-10-29 10:25:20.073556+05:30
40	1	FAILED_LOGIN	HIGH	10.10.10.50	{"test": true, "message": "Detection threshold test"}	2026-10-29 10:25:20.077683+05:30
41	1	FAILED_LOGIN	HIGH	10.10.10.50	{"test": true, "message": "Detection threshold test"}	2026-10-29 10:25:20.082359+05:30
42	1	FAILED_LOGIN	HIGH	10.20.30.40	{}	2026-10-29 19:42:33.261158+05:30
43	1	FAILED_LOGIN	HIGH	10.20.30.40	{}	2026-10-29 19:42:33.266802+05:30
44	1	FAILED_LOGIN	HIGH	10.20.30.40	{}	2026-10-29 19:42:33.268787+05:30
45	1	FAILED_LOGIN	HIGH	10.20.30.40	{}	2026-10-29 19:42:33.270486+05:30
46	1	FAILED_LOGIN	HIGH	10.20.30.40	{}	2026-10-29 19:42:33.271854+05:30
47	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "Simulated failed login attempt"}	2026-11-04 10:42:52.057088+05:30
48	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "Simulated failed login attempt"}	2026-11-04 10:42:54.132522+05:30
49	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "Simulated failed login attempt"}	2026-11-04 10:42:56.183696+05:30
50	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "Simulated failed login attempt"}	2026-11-04 10:42:58.204568+05:30
51	1	FAILED_LOGIN	HIGH	192.168.1.99	{"message": "Simulated failed login attempt"}	2026-11-04 10:43:00.219656+05:30
52	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "test_user"}	2026-11-04 16:09:53.5371+05:30
53	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "tes"}	2026-11-04 16:10:00.984978+05:30
54	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "test_user"}	2026-11-04 16:10:09.092074+05:30
55	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "test_user"}	2026-11-04 16:10:15.696927+05:30
56	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "test_user"}	2026-11-04 16:10:20.706554+05:30
57	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "test_user"}	2026-11-04 16:10:25.625965+05:30
58	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "test_user"}	2026-11-04 16:10:30.804407+05:30
59	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "test_user"}	2026-11-04 16:10:35.431002+05:30
60	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "test_user"}	2026-11-04 16:10:40.567957+05:30
61	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "rohit"}	2026-11-04 16:26:48.525737+05:30
62	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "rohit"}	2026-11-04 16:26:52.828108+05:30
63	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "rohit"}	2026-11-04 16:26:56.958932+05:30
64	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "rohit"}	2026-11-04 16:27:00.581201+05:30
65	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "rohit"}	2026-11-04 16:27:05.285905+05:30
66	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "rohit"}	2026-11-04 16:27:09.213513+05:30
67	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_DEMO", "message": "Simulated failed login attempt", "username": "rohit"}	2026-11-04 16:27:13.596399+05:30
68	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_SIMULATOR", "message": "Simulated failed login attempt", "username": "Rohit"}	2026-11-05 17:02:19.587406+05:30
69	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_SIMULATOR", "message": "Simulated failed login attempt", "username": "Rohit"}	2026-11-05 17:02:30.687948+05:30
70	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_SIMULATOR", "message": "Simulated failed login attempt", "username": "Rohit"}	2026-11-05 17:02:35.685494+05:30
71	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_SIMULATOR", "message": "Simulated failed login attempt", "username": "Rohit"}	2026-11-05 17:02:40.268325+05:30
72	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_SIMULATOR", "message": "Simulated failed login attempt", "username": "Rohit"}	2026-11-05 17:02:52.713574+05:30
73	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_SIMULATOR", "message": "Simulated failed login attempt", "username": "Rohit"}	2026-11-05 17:02:57.403154+05:30
74	1	FAILED_LOGIN	HIGH	::1	{"method": "LAN_SIMULATOR", "message": "Simulated failed login attempt", "username": "Rohit"}	2026-11-05 23:08:55.683664+05:30
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, password_hash, role, is_active, created_at, updated_at) FROM stdin;
7	Rohit	rohit@netsentry.local	$2b$12$UZXxjmb2VO0aqf.J859vpO6uXeyPfygViQfgP/dtsEuh2Awgfmcwm	super_admin	t	2026-11-05 17:05:18.118602+05:30	2026-11-05 17:06:28.29824+05:30
3	Shibaniprg	shibaniprg@netsentry.local	$2b$12$P/kQ1IgdDC4z6P9.j7pzHOYnzMGM2A8KYTSKg2w9LQo84neWzIyEC	super_admin	t	2026-11-04 09:23:52.814463+05:30	2026-11-06 09:36:40.3812+05:30
\.


--
-- Name: event_sources_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.event_sources_id_seq', 1, true);


--
-- Name: security_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.security_events_id_seq', 74, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- PostgreSQL database dump complete
--

\unrestrict yjCbnVFGU7MD3U6gK6EPurqItugzroy0z7TAclxGWh7DtRPrIMQaxzfsBdSKoGe

