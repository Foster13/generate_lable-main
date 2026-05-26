import "dotenv/config";

export const JIRA_USERNAME = process.env.JIRA_USERNAME;
export const JIRA_PASSWORD = process.env.JIRA_PASSWORD;
export const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
export const JIRA_VERSION_NAME = process.env.JIRA_VERSION_NAME;
export const JIRA_CYCLE_NAME = process.env.JIRA_CYCLE_NAME;
export const JIRA_FOLDER_NAME = process.env.JIRA_FOLDER_NAME; // Required for folder-based generation
export const JIRA_ASSIGNEE = process.env.JIRA_ASSIGNEE; // Required for assignee-only generation
export const JIRA_EXECUTION_STATUS = process.env.JIRA_EXECUTION_STATUS || "UNEXECUTED"; // Optional: execution status filter for assignee-only (default: UNEXECUTED)
export const OUTPUT_FOLDER = process.env.OUTPUT_FOLDER || ""; // Optional: custom output folder for folder-based
export const OUTPUT_FOLDER_ASSIGNEE = process.env.OUTPUT_FOLDER_ASSIGNEE || ""; // Optional: custom output folder for assignee-only
