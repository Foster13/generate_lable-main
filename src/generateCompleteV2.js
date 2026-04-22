import { getAuthHeader } from "./jira/auth.js";
import { getAll } from "./jira/getAll.js";
import { generateAllTestScenariosYaml } from "./generator/generateAllTestScenariosYaml.js";
import { generateAllTestCasesYaml } from "./generator/generateAllTestCasesYaml.js";
import { JIRA_PASSWORD, JIRA_USERNAME, JIRA_LABELS } from "./utils/constans.js";
import fs from "fs";

/**
 * Complete Generator Pipeline V2 (CORRECT FLOW)
 * Urutan: Test Scenario → Test Cases (dengan Test Steps dari Jira)
 * 
 * 1. Fetch data dari Jira
 * 2. Generate Test Scenario (TS Level) - outputTestScenario.yml
 * 3. Generate Test Cases (TC) dengan Test Steps dari Jira - yml-tc/*.yml
 * 
 * STRUKTUR:
 * - Test Scenario (TS Level) = Orchestrator yang berisi daftar Test Cases
 * - Test Case (TC) = File yang berisi Test Steps dari Jira
 * - Test Steps = Data dari Jira yang ada di dalam TC
 */

const USERNAME = JIRA_USERNAME;
const PASSWORD = JIRA_PASSWORD;

const authHeader = getAuthHeader(USERNAME, PASSWORD);

async function runCompleteGeneration() {
  try {
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║     COMPLETE TEST GENERATION PIPELINE V2                  ║");
    console.log("║     Test Scenario → Test Cases (with Steps from Jira)     ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");

    // ========== STEP 1: Fetch Data dari Jira ==========
    console.log("📋 STEP 1: Fetching data from Jira...");
    console.log("─".repeat(60));
    const getAllTC = await getAll(authHeader);
    console.log(`✅ Found ${getAllTC.length} test cases from Jira\n`);

    // ========== STEP 2: Generate Test Scenario (TS Level) ==========
    console.log("🎯 STEP 2: Generating Test Scenario (TS Level)...");
    console.log("─".repeat(60));
    
    // Buat folder output jika belum ada
    const tsOutputDir = "./yml-ts";
    if (!fs.existsSync(tsOutputDir)) {
      fs.mkdirSync(tsOutputDir, { recursive: true });
    }
    
    // Generate Test Scenario dengan nama dari JIRA_LABELS
    generateAllTestScenariosYaml(getAllTC, {
      label: JIRA_LABELS || "outputTestScenario",
      outputDir: tsOutputDir,
      appId: "${APP_ID}",
      jsEngine: "graaljs",
      tags: ["regression"],
      jiraFolderName: "Test Automation",
      tcFilePathAndroid: "../../../components/android/",
      tcFilePathIOS: "../../../components/ios/",
      segment: {
        priority: "PRIORITY",
        mass: "MASS"
      }
    });
    console.log(`✅ Test Scenario generated: yml-ts/${JIRA_LABELS || "outputTestScenario"}.yml\n`);

    // ========== STEP 3: Generate Test Cases (TC) dengan Steps dari Jira ==========
    console.log("📝 STEP 3: Generating Test Cases (TC) with Steps from Jira...");
    console.log("─".repeat(60));
    
    // Buat folder output jika belum ada
    const outputDir = "./yml-tc";
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    await generateAllTestCasesYaml(getAllTC, authHeader, outputDir);
    console.log("✅ Test Cases generated in yml-tc/ folder\n");

    // ========== SUMMARY ==========
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║                    ✨ GENERATION COMPLETE ✨                ║");
    console.log("╚════════════════════════════════════════════════════════════╝");
    console.log("\n📦 Generated Files:");
    console.log(`   1. yml-ts/${JIRA_LABELS || "outputTestScenario"}.yml    - Test Scenario (TS Level)`);
    console.log("   2. yml-tc/TC_*.yml                  - Test Cases (TC) with Steps");
    console.log("\n📊 Structure:");
    console.log("   Test Scenario (TS Level)");
    console.log("      ↓ berisi kumpulan");
    console.log("   Test Cases (TC)");
    console.log("      ↓ berisi");
    console.log("   Test Steps (dari Jira)");
    console.log("\n🎉 All files are ready for automation!");

  } catch (err) {
    console.error("\n❌ ERROR:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
}

runCompleteGeneration();
