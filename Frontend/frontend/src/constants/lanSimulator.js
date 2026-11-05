
export const EVENT_TYPES = [
  {
    value: "FAILED_LOGIN",
    label: "Failed Login",
    severity: "HIGH",
    description: "Simulate an unsuccessful login attempt",
  },
  {
    value: "SUCCESSFUL_LOGIN",
    label: "Successful Login",
    severity: "LOW",
    description: "Record a successful demo login",
  },
  {
    value: "SUSPICIOUS_ACCESS",
    label: "Suspicious Access",
    severity: "HIGH",
    description: "Simulate suspicious access activity",
  },
  {
    value: "UNUSUAL_ACTIVITY",
    label: "Unusual Activity",
    severity: "MEDIUM",
    description: "Record unusual application activity",
  },
  {
    value: "MULTIPLE_REQUESTS",
    label: "Multiple Requests",
    severity: "MEDIUM",
    description: "Record a simulated request activity event",
  },
];
