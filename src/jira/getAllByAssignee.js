import axios from "axios";
import {
  JIRA_BASE_URL,
  JIRA_ASSIGNEE,
  JIRA_EXECUTION_STATUS
} from "../utils/constans.js";

/**
 * Get all test cases from Jira by assignee only (NO folder filter)
 * With execution status filter (default: UNEXECUTED)
 * 
 * @param {string} authHeader - Jira authorization header
 * @returns {Array} - Array of test executions
 */
export async function getAllByAssignee(authHeader) {
  const version = encodeURIComponent(JIRA_VERSION_NAME);
  const cycle = encodeURIComponent(JIRA_CYCLE_NAME);
  const assignee = encodeURIComponent(JIRA_ASSIGNEE);
  const executionStatus = encodeURIComponent(JIRA_EXECUTION_STATUS);

  // Always start from offset 0 (first page)
  const offset = 0;

  // Build query with assignee AND executionStatus filter (no folder filter)
  const zqlQuery = `fixVersion = "${version}" AND cycleName in ("${cycle}") AND assignee = "${assignee}" AND executionStatus = "${executionStatus}"`;

  const url = `${JIRA_BASE_URL}/rest/zapi/latest/zql/executeSearch?zqlQuery=${encodeURIComponent(zqlQuery)}&view=list&searchType=advance&offset=${offset}&maxRecords=20`;
  
  console.log("🔗 JIRA URL:", url);
  console.log(`🔍 Filtering by assignee: ${JIRA_ASSIGNEE}`);
  console.log(`📊 Execution status: ${JIRA_EXECUTION_STATUS}`);
  console.log(`📁 Folder filter: NONE (fetching from ALL folders)`);

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
 * Get all test cases by assignee with pagination support
 * Fetch multiple pages if needed (NO folder, version, or cycle filter)
 * With execution status filter (default: UNEXECUTED)
 * 
 * @param {string} authHeader - Jira authorization header
 * @param {number} maxPages - Maximum pages to fetch (default: 10)
 * @returns {Array} - Array of all test executions
 */
export async function getAllByAssigneeWithPagination(authHeader, maxPages = 10) {
  const assignee = JIRA_ASSIGNEE;
  const executionStatus = JIRA_EXECUTION_STATUS;

  let allExecutions = [];
  let currentPage = 0;
  let hasMore = true;

  console.log("📥 Fetching test cases with pagination...");
  console.log(`🔍 Filtering by assignee: ${JIRA_ASSIGNEE}`);
  console.log(`📊 Execution status: ${JIRA_EXECUTION_STATUS}`);
  console.log(`📁 Folder filter: NONE`);
  console.log(`📦 Version filter: NONE`);
  console.log(`🔄 Cycle filter: NONE`);

  while (hasMore && currentPage < maxPages) {
    const offset = currentPage * 20;
    
    // Build query with assignee AND executionStatus filter ONLY
    // NO version, cycle, or folder filter
    const zqlQuery = `assignee = "${assignee}" AND executionStatus = "${executionStatus}"`;

    const url = `${JIRA_BASE_URL}/rest/zapi/latest/zql/executeSearch?zqlQuery=${encodeURIComponent(zqlQuery)}&view=list&searchType=advance&offset=${offset}&maxRecords=20`;

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
