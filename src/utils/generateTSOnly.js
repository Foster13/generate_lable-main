import { getAuthHeader } from "../jira/auth.js";
import { getAll } from "../jira/getAll.js";
import { generateAllTestScenariosYaml } from "../generator/generateAllTestScenariosYaml.js";
import { JIRA_PASSWORD, JIRA_USERNAME, JIRA_LABELS } from "./constans.js";
import fs from "fs";

/**
 * Script untuk generate Test Scenario YAML saja
 * Usage: npm run generate-ts
 */

const USERNAME = JIRA_USERNAME;
const PASSWORD = JIRA_PASSWORD;

const authHeader = getAuthHeader(USERNAME, PASSWORD);

async function runGenerateTS() {
  try {
    console.log(`🔍 Fetching IssueId for All testcase ...`);
    const getAllTS = await getAll(authHeader);
    console.log(`✔ Found ${getAllTS.length} test cases`);

    console.log("⚙️ Generating Test Scenario YAML...");
    
    // Buat folder output jika belum ada
    const tsOutputDir = "./yml-ts";
    if (!fs.existsSync(tsOutputDir)) {
      fs.mkdirSync(tsOutputDir, { recursive: true });
    }
    
    // Generate Test Scenario dengan nama dari JIRA_LABELS
    generateAllTestScenariosYaml(getAllTS, {
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

    console.log(`🎉 DONE! Test Scenario YAML is ready: yml-ts/${JIRA_LABELS || "outputTestScenario"}.yml`);
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  }
}

runGenerateTS();
