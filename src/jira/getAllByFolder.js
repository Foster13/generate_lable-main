import axios from "axios";
import {
  JIRA_BASE_URL,
  JIRA_VERSION_NAME,
  JIRA_CYCLE_NAME,
  JIRA_FOLDER_NAME
} from "../utils/constans.js";

/**
 * Get all test cases from Jira by folder name
 * 
 * @param {string} authHeader - Jira authorization header
 * @returns {Array} - Array of test executions
 */
export async function getAllByFolder(authHeader) {
  const version = encodeURIComponent(JIRA_VERSION_NAME);
  const cycle = encodeURIComponent(JIRA_CYCLE_NAME);
  const folder = encodeURIComponent(JIRA_FOLDER_NAME);

  // Always start from offset 0 (first page)
  const offset = 0;

  // Query dengan folderName instead of labels
  const url = `${JIRA_BASE_URL}/rest/zapi/latest/zql/executeSearch?zqlQuery=fixVersion%20%3D%20"${version}"%20AND%20cycleName%20in%20("${cycle}")%20AND%20folderName%20in%20("${folder}")&view=list&searchType=advance&offset=${offset}&maxRecords=20`;
  
  console.log("🔗 JIRA URL:", url);

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    });

    return res.data.executions || [];
  } catch (error) {
    console.error("❌ Error fetching from Jira:", error.message);
    throw error;
  }
}

/**
 * Get all test cases with pagination support
 * Fetch multiple pages if needed
 * 
 * @param {string} authHeader - Jira authorization header
 * @param {number} maxPages - Maximum pages to fetch (default: 10)
 * @returns {Array} - Array of all test executions
 */
export async function getAllByFolderWithPagination(authHeader, maxPages = 10) {
  const version = encodeURIComponent(JIRA_VERSION_NAME);
  const cycle = encodeURIComponent(JIRA_CYCLE_NAME);
  const folder = encodeURIComponent(JIRA_FOLDER_NAME);

  let allExecutions = [];
  let currentPage = 0;
  let hasMore = true;

  console.log("📥 Fetching test cases with pagination...");

  while (hasMore && currentPage < maxPages) {
    const offset = currentPage * 20;
    const url = `${JIRA_BASE_URL}/rest/zapi/latest/zql/executeSearch?zqlQuery=fixVersion%20%3D%20"${version}"%20AND%20cycleName%20in%20("${cycle}")%20AND%20folderName%20in%20("${folder}")&view=list&searchType=advance&offset=${offset}&maxRecords=20`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: authHeader,
          Accept: "application/json",
        },
      });

      const executions = res.data.executions || [];
      allExecutions = allExecutions.concat(executions);

      console.log(`   Page ${currentPage + 1}: Found ${executions.length} test cases`);

      // Check if there are more pages
      if (executions.length < 20) {
        hasMore = false;
      }

      currentPage++;
    } catch (error) {
      console.error(`❌ Error fetching page ${currentPage + 1}:`, error.message);
      hasMore = false;
    }
  }

  console.log(`✅ Total fetched: ${allExecutions.length} test cases from ${currentPage} page(s)`);

  return allExecutions;
}
