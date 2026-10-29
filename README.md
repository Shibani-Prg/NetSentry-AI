# 🛡️ NetSentry AI

**A Security Event Monitoring and Threat Detection Dashboard**

NetSentry AI is a cybersecurity monitoring dashboard designed to collect, analyze, and visualize security events. It provides centralized event monitoring, severity-based analytics, and rule-based detection of suspicious login activity through a modern Security Operations Center (SOC)-style interface.

> **Project status:** Under active development  
> **Project type:** MCA Final-Year Project

## ✨ Features

- **Security Overview Dashboard** — Monitor event activity and security metrics.
- **Event Monitoring** — Retrieve and display security events from PostgreSQL.
- **Severity Analytics** — Visualize event severity using interactive charts.
- **Failed-Login Detection** — Identify source IP addresses associated with repeated failed login attempts.
- **Event Search** — Search events by IP address, event type, and source name.
- **Severity Filtering** — Filter security events by severity.
- **Pagination** — Navigate through event records efficiently.
- **Detection Management** — View failed-login detections and their associated activity.
- **REST API Backend** — Separate frontend and backend architecture.
- **Automatic Data Refresh** — Periodically fetch updated dashboard data.

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, Tailwind CSS v4 |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | Node.js, Express |
| Database | PostgreSQL, `pg` |
| Validation | Zod |
| Security Middleware | Helmet, CORS |

## 🏗️ Architecture

```text
React + Vite Frontend
        |
        | HTTP / REST API (Axios)
        v
Node.js + Express Backend
        |
        +--> Routes and Controllers
        |
        +--> Services and Validation
        |
        v
    PostgreSQL
        |
        v
Security Event Data
        |
        v
Rule-Based Failed-Login Detection
        |
        v
Dashboard and Detection Views
```

## 🔍 Detection Logic

The current failed-login detection rule:

1. Select events with the event type `FAILED_LOGIN`.
2. Exclude events without a source IP address.
3. Consider events from the previous five minutes.
4. Group events by source IP address.
5. Trigger a detection when an IP address has at least five failed-login events in that window.

This is a rule-based detection mechanism. It identifies suspicious activity patterns but does not, by itself, prove that an attack has occurred.

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/events?page=1&limit=100` | Retrieve paginated security events |
| POST | `/api/events` | Submit a security event |
| GET | `/api/detections/failed-logins` | Retrieve failed-login detections |

The events endpoint also supports searching and filtering through query parameters implemented in the backend.

## ⚙️ Local Setup

### Prerequisites

- Node.js and npm
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Shibani-Prg/NetSentry-AI.git
cd NetSentry-AI
```

### 2. Configure the backend

Navigate to the backend directory:

```bash
cd Backend
npm install
```

Create a local `.env` file using the configuration expected by `Backend/src/config/env.js`.

Configure the required PostgreSQL connection values and port locally. Create the database and required tables using the project's existing database schema.

Start the backend using the script defined in `Backend/package.json`, for example:

```bash
npm run dev
```

The backend is configured to run on port `5000` in the current local setup.

### 3. Configure the frontend

Open a second terminal from the repository root:

```bash
cd Frontend/frontend
npm install
```

Create a local `.env` file