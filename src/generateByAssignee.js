import { getAuthHeader } from "./jira/auth.js";
import { getAllByAssigneeWithPagination } from "./jira/getAllByAssignee.js";
import { groupByLabel, getSortedLabels, getGroupStatistics } from "./utils/groupByLabel.js";
import { generateAllTestScenariosYaml } from "./generator/generateAllTestScenariosYaml.js";
import { generateAllTestCasesYaml } from "./generator/generateAllTestCasesYaml.js";
import { JIRA_PASSWORD, JIRA_USERNAME, JIRA_ASSIGNEE, JIRA_EXECUTION_STATUS, OUTPUT_FOLDER_ASSIGNEE } from "./utils/constans.js";
import fs from "fs";

/**
 * Complete Generator Pipeline - Assignee Only Mode
 * Generate Test Scenarios and Test Cases for assignee with execution status
 * NO version, cycle, or folder filter - purely by assignee + status
 * 
 * Flow:
 * 1. Fetch all test cases assigned to user with specific execution status (ALL versions, cycles, folders)
 * 2. Group test cases by label (TS_POJK_CASA_01, TS_POJK_CASA_02, etc)
 * 3. Generate Test Scenario for each label
 * 4. Generate Test Cases for all test cases
 * 
 * Required: JIRA_ASSIGNEE must be set in .env
 * Optional: JIRA_EXECUTION_STATUS (default: UNEXECUTED)
 * Optional: OUTPUT_FOLDER_ASSIGNEE to customize output directory
 * 
 * Example:
 * JIRA_ASSIGNEE=john.doe
 * JIRA_EXECUTION_STATUS=UNEXECUTED
 * OUTPUT_FOLDER_ASSIGNEE=all-my-tests
 * 
 * Note: Version and Cycle are NOT used in this mode
 */

const USERNAME = JIRA_USERNAME;
const PASSWORD = JIRA_PASSWORD;

const authHeader = getAuthHeader(USERNAME, PASSWORD);

async function runAssigneeGeneration() {
  try {
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║     ASSIGNEE-ONLY GENERATION PIPELINE                     ║");
    console.log("║     Generate Test Cases by Assignee + Execution Status    ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");

    // Validate assignee (REQUIRED)
    if (!JIRA_ASSIGNEE) {
      console.error("❌ ERROR: JIRA_ASSIGNEE is not set in .env file");
      console.log("\n💡 JIRA_ASSIGNEE is REQUIRED!");
      console.log("   Please add to .env:");
      console.log("   JIRA_ASSIGNEE=your.username");
      console.log("\n📝 How to find your JIRA username:");
      console.log("   1. Login to JIRA");
      console.log("   2. Click your avatar → Profile");
      console.log("   3. Check username in URL or profile page");
      console.log("   4. Format: firstname.lastname or Firstname.Lastname");
      process.exit(1);
    }

    console.log(`👤 Assignee: ${JIRA_ASSIGNEE}`);
    console.log(`📊 Execution Status: ${JIRA_EXECUTION_STATUS}`);
    console.log(`📁 Scope: ALL (no folder, version, or cycle filter)\n`);

    // ========== STEP 1: Fetch All Test Cases by Assignee ==========
    console.log("📋 STEP 1: Fetching all test cases assigned to you...");
    console.log("─".repeat(60));
    const allTestCases = await getAllByAssigneeWithPagination(authHeader);
    
    if (allTestCases.length === 0) {
      console.error(`❌ No test cases found for assignee: ${JIRA_ASSIGNEE}`);
      console.log("\n💡 Please check:");
      console.log("   1. Assignee username is correct");
      console.log("   2. You have test cases assigned to you");
      console.log("   3. Version and Cycle are correct");
      console.log("   4. Jira credentials are correct");
      process.exit(1);
    }
    
    console.log(`✅ Found ${allTestCases.length} test cases assigned to ${JIRA_ASSIGNEE}\n`);

    // ========== STEP 2: Group Test Cases by Label ==========
    console.log("🔄 STEP 2: Grouping test cases by label...");
    console.log("─".repeat(60));
    const groupedTestCases = groupByLabel(allTestCases);
    const sortedLabels = getSortedLabels(groupedTestCases);
    const stats = getGroupStatistics(groupedTestCases);
    
    console.log(`✅ Found ${stats.totalLabels} unique labels:`);
    sortedLabels.forEach((label, index) => {
      const count = groupedTestCases[label].length;
      console.log(`   ${(index + 1).toString().padStart(2, "0")}. ${label} (${count} test cases)`);
    });
    console.log(`\n📊 Statistics:`);
    console.log(`   Total Labels: ${stats.totalLabels}`);
    console.log(`   Total Test Cases: ${stats.totalTestCases}`);
    console.log(`   Average per Label: ${stats.averagePerLabel}\n`);

    // ========== STEP 3: Generate Test Scenarios for Each Label ==========
    console.log("🎯 STEP 3: Generating Test Scenarios (TS Level)...");
    console.log("─".repeat(60));
    
    // Determine output directories based on OUTPUT_FOLDER_ASSIGNEE env variable
    const baseOutputDir = OUTPUT_FOLDER_ASSIGNEE ? `./${OUTPUT_FOLDER_ASSIGNEE}` : "./assignee-output";
    const tsOutputDir = `${baseOutputDir}/yml-ts`;
    const tcOutputDir = `${baseOutputDir}/yml-tc`;
    
    // Create base output directory
    if (!fs.existsSync(baseOutputDir)) {
      fs.mkdirSync(baseOutputDir, { recursive: true });
      console.log(`📁 Created output directory: ${baseOutputDir}`);
    }
    
    // Create output directory for Test Scenarios
    if (!fs.existsSync(tsOutputDir)) {
      fs.mkdirSync(tsOutputDir, { recursive: true });
    }
    
    let tsGeneratedCount = 0;
    sortedLabels.forEach((label) => {
      const testCases = groupedTestCases[label];
      
      console.log(`\n📝 Generating Test Scenario: ${label}.yml`);
      console.log(`   Test Cases: ${testCases.length}`);
      
      generateAllTestScenariosYaml(testCases, {
        label: label,
        outputDir: tsOutputDir,
        appId: "${APP_ID}",
        jsEngine: "graaljs",
        tags: ["regression"],
        jiraFolderName: "ALL_FOLDERS",
        tcFilePathAndroid: "../../../components/android/",
        tcFilePathIOS: "../../../components/ios/",
        segment: {
          priority: "PRIORITY",
          mass: "MASS"
        }
      });
      
      tsGeneratedCount++;
    });
    
    console.log(`\n✅ Generated ${tsGeneratedCount} Test Scenario files in ${tsOutputDir}/\n`);

    // ========== STEP 4: Generate Test Cases for All Test Cases ==========
    console.log("📝 STEP 4: Generating Test Cases (TC) with Steps from Jira...");
    console.log("─".repeat(60));
    
    // Create output directory for Test Cases
    if (!fs.existsSync(tcOutputDir)) {
      fs.mkdirSync(tcOutputDir, { recursive: true });
    }
    
    // Generate Test Cases untuk semua test cases
    await generateAllTestCasesYaml(allTestCases, authHeader, tcOutputDir);
    console.log(`✅ Test Cases generated in ${tcOutputDir}/ folder\n`);

    // ========== SUMMARY ==========
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║                    ✨ GENERATION COMPLETE ✨                ║");
    console.log("╚════════════════════════════════════════════════════════════╝");
    console.log(`\n📦 Generated Files for assignee: ${JIRA_ASSIGNEE}`);
    console.log(`📁 Output Directory: ${baseOutputDir}/`);
    console.log(`📁 Scope: ALL FOLDERS (no folder filter)`);
    console.log(`\n📁 Test Scenarios (${tsOutputDir}/):`);
    sortedLabels.forEach((label, index) => {
      console.log(`   ${(index + 1).toString().padStart(2, "0")}. ${label}.yml`);
    });
    console.log(`\n📁 Test Cases (${tcOutputDir}/):`);
    console.log(`   Total: ${stats.totalTestCases} TC files`);
    console.log("\n📊 Summary:");
    console.log(`   Assignee: ${JIRA_ASSIGNEE}`);
    console.log(`   Execution Status: ${JIRA_EXECUTION_STATUS}`);
    console.log(`   Scope: ALL (no version/cycle/folder filter)`);
    console.log(`   Output Directory: ${baseOutputDir}/`);
    console.log(`   Test Scenarios: ${stats.totalLabels} files`);
    console.log(`   Test Cases: ${stats.totalTestCases} files`);
    console.log("\n🎉 All files are ready for automation!");

  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

runAssigneeGeneration();
