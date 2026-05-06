import { getAuthHeader } from "./jira/auth.js";
import { getAllByFolderWithPagination } from "./jira/getAllByFolder.js";
import { groupByLabel, getSortedLabels, getGroupStatistics } from "./utils/groupByLabel.js";
import { generateAllTestScenariosYaml } from "./generator/generateAllTestScenariosYaml.js";
import { generateAllTestCasesYaml } from "./generator/generateAllTestCasesYaml.js";
import { JIRA_PASSWORD, JIRA_USERNAME, JIRA_FOLDER_NAME, OUTPUT_FOLDER } from "./utils/constans.js";
import fs from "fs";

/**
 * Complete Generator Pipeline - Folder Based
 * Generate multiple Test Scenarios and Test Cases from a Jira folder
 * 
 * Flow:
 * 1. Fetch all test cases from Jira folder
 * 2. Group test cases by label (TS_POJK_CASA_01, TS_POJK_CASA_02, etc)
 * 3. Generate Test Scenario for each label
 * 4. Generate Test Cases for all test cases
 * 
 * Optional: Set OUTPUT_FOLDER in .env to customize output directory
 * Example: OUTPUT_FOLDER=pojk-home
 */

const USERNAME = JIRA_USERNAME;
const PASSWORD = JIRA_PASSWORD;

const authHeader = getAuthHeader(USERNAME, PASSWORD);

async function runFolderGeneration() {
  try {
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║     FOLDER-BASED GENERATION PIPELINE                      ║");
    console.log("║     Batch Generate from Jira Folder                       ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");

    // Validate folder name
    if (!JIRA_FOLDER_NAME) {
      console.error("❌ ERROR: JIRA_FOLDER_NAME is not set in .env file");
      console.log("\n💡 Please add to .env:");
      console.log("   JIRA_FOLDER_NAME=CASA - Android");
      process.exit(1);
    }

    console.log(`📁 Target Folder: ${JIRA_FOLDER_NAME}\n`);

    // ========== STEP 1: Fetch All Test Cases from Folder ==========
    console.log("📋 STEP 1: Fetching all test cases from Jira folder...");
    console.log("─".repeat(60));
    const allTestCases = await getAllByFolderWithPagination(authHeader);
    
    if (allTestCases.length === 0) {
      console.error(`❌ No test cases found in folder: ${JIRA_FOLDER_NAME}`);
      console.log("\n💡 Please check:");
      console.log("   1. Folder name is correct");
      console.log("   2. Folder has test cases");
      console.log("   3. Jira credentials are correct");
      process.exit(1);
    }
    
    console.log(`✅ Found ${allTestCases.length} test cases from folder\n`);

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
    
    // Determine output directories based on OUTPUT_FOLDER env variable
    const baseOutputDir = OUTPUT_FOLDER ? `./${OUTPUT_FOLDER}` : ".";
    const tsOutputDir = `${baseOutputDir}/yml-ts`;
    const tcOutputDir = `${baseOutputDir}/yml-tc`;
    
    // Create base output directory if custom folder is specified
    if (OUTPUT_FOLDER && !fs.existsSync(baseOutputDir)) {
      fs.mkdirSync(baseOutputDir, { recursive: true });
      console.log(`📁 Created custom output directory: ${baseOutputDir}`);
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
        jiraFolderName: JIRA_FOLDER_NAME,
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
    console.log(`\n📦 Generated Files from folder: ${JIRA_FOLDER_NAME}`);
    if (OUTPUT_FOLDER) {
      console.log(`📁 Custom Output Directory: ${baseOutputDir}/`);
    }
    console.log(`\n📁 Test Scenarios (${tsOutputDir}/):`);
    sortedLabels.forEach((label, index) => {
      console.log(`   ${(index + 1).toString().padStart(2, "0")}. ${label}.yml`);
    });
    console.log(`\n📁 Test Cases (${tcOutputDir}/):`);
    console.log(`   Total: ${stats.totalTestCases} TC files`);
    console.log("\n📊 Summary:");
    console.log(`   Folder: ${JIRA_FOLDER_NAME}`);
    if (OUTPUT_FOLDER) {
      console.log(`   Output Directory: ${baseOutputDir}/`);
    }
    console.log(`   Test Scenarios: ${stats.totalLabels} files`);
    console.log(`   Test Cases: ${stats.totalTestCases} files`);
    console.log("\n🎉 All files are ready for automation!");

  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

runFolderGeneration();
