import { getTestSteps } from "../jira/getStepJira.js";
import { generateTestCaseYAML } from "../utils/generateTestCaseYAML.js";

/**
 * Generate Test Cases (TC) dengan Test Steps dari Jira
 * 
 * Test Case (TC) = File yang berisi Test Steps dari Jira
 * Format sesuai dengan contohTC.yml
 */
export async function generateAllTestCasesYaml(allTests, authHeader, outputDir = "./yml-tc") {
  for (let index = 0; index < allTests.length; index++) {
    const test = allTests[index];
    const issueId = test.issueId;
    const issueKey = test.issueKey;
    const summary = test.issueSummary.replace(/[^\w]/g, "_");
    
    // Convert TS_ to TC_ jika ada
    const tcName = summary.replace(/^TS_/, "TC_");

    console.log(`📥 Fetching Test Steps for IssueID: ${issueId} (${tcName})`);

    // Fetch test steps dari Jira
    const steps = await getTestSteps(issueId, authHeader);

    console.log(`📄 Generating Test Case YAML for ${tcName}`);
    
    // Tentukan posisi untuk balance script
    const isFirst = index === 0;
    const isLast = index === allTests.length - 1;
    
    // Generate Test Case YAML
    generateTestCaseYAML(steps, tcName, issueKey, outputDir, isFirst, isLast);
  }
}
