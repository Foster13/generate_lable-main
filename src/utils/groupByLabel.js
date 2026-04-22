/**
 * Group test cases by their labels
 * 
 * @param {Array} testCases - Array of test cases from Jira
 * @returns {Object} - Grouped test cases by label
 * 
 * Example:
 * Input: [
 *   { issueSummary: "TS_POJK_CASA_01_001", labels: ["TS_POJK_CASA_01"] },
 *   { issueSummary: "TS_POJK_CASA_01_002", labels: ["TS_POJK_CASA_01"] },
 *   { issueSummary: "TS_POJK_CASA_02_001", labels: ["TS_POJK_CASA_02"] }
 * ]
 * 
 * Output: {
 *   "TS_POJK_CASA_01": [
 *     { issueSummary: "TS_POJK_CASA_01_001", ... },
 *     { issueSummary: "TS_POJK_CASA_01_002", ... }
 *   ],
 *   "TS_POJK_CASA_02": [
 *     { issueSummary: "TS_POJK_CASA_02_001", ... }
 *   ]
 * }
 */
export function groupByLabel(testCases) {
  const grouped = {};
  
  testCases.forEach(testCase => {
    // Extract label dari issueSummary (e.g., TS_POJK_CASA_01_001 -> TS_POJK_CASA_01)
    const summary = testCase.issueSummary || "";
    
    // Pattern: TS_XXX_YYY_ZZZ_NNN -> TS_XXX_YYY_ZZZ
    // Ambil semua kecuali 3 digit terakhir
    const parts = summary.split("_");
    
    // Jika format: TS_POJK_CASA_01_001 -> ambil TS_POJK_CASA_01
    // Jika format: TS_LOGIN_01_001 -> ambil TS_LOGIN_01
    let label = "";
    
    if (parts.length >= 2) {
      // Ambil semua parts kecuali yang terakhir (yang biasanya 001, 002, dst)
      const lastPart = parts[parts.length - 1];
      
      // Check apakah last part adalah number (001, 002, dst)
      if (/^\d+$/.test(lastPart)) {
        // Ambil semua kecuali last part
        label = parts.slice(0, -1).join("_");
      } else {
        // Jika bukan number, pakai semua
        label = summary;
      }
    } else {
      label = summary;
    }
    
    // Initialize array jika belum ada
    if (!grouped[label]) {
      grouped[label] = [];
    }
    
    // Add test case ke group
    grouped[label].push(testCase);
  });
  
  return grouped;
}

/**
 * Get sorted label names from grouped test cases
 * 
 * @param {Object} groupedTestCases - Grouped test cases
 * @returns {Array} - Sorted array of label names
 */
export function getSortedLabels(groupedTestCases) {
  return Object.keys(groupedTestCases).sort();
}

/**
 * Get statistics from grouped test cases
 * 
 * @param {Object} groupedTestCases - Grouped test cases
 * @returns {Object} - Statistics
 */
export function getGroupStatistics(groupedTestCases) {
  const labels = Object.keys(groupedTestCases);
  const totalLabels = labels.length;
  let totalTestCases = 0;
  
  labels.forEach(label => {
    totalTestCases += groupedTestCases[label].length;
  });
  
  return {
    totalLabels,
    totalTestCases,
    averagePerLabel: Math.round(totalTestCases / totalLabels)
  };
}
