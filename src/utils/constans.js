import "dotenv/config";

// export const ISSUE_KEY = process.argv[2];

export const JIRA_USERNAME = process.env.JIRA_USERNAME;
export const JIRA_PASSWORD = process.env.JIRA_PASSWORD;
export const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
export const JIRA_VERSION_NAME = process.env.JIRA_VERSION_NAME;
export const JIRA_CYCLE_NAME = process.env.JIRA_CYCLE_NAME;
export const FILE_LOCATION = process.env.FILE_LOCATION;
export const JIRA_LABELS = process.env.JIRA_LABELS;
export const JIRA_FOLDER_NAME = process.env.JIRA_FOLDER_NAME;
export const OUTPUT_FOLDER = process.env.OUTPUT_FOLDER || ""; // Optional: custom output folder
