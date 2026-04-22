import { generateTestScenario } from "../utils/generateTestScenario.js";
import path from "path";

/**
 * Generate Test Scenarios (TS Level) dengan penamaan dari JIRA_LABELS
 * 
 * Test Scenario (TS Level) = Orchestrator yang berisi daftar Test Cases
 * Format sesuai dengan coontohTS.yml
 * 
 * @param {Array} allTests - Array of test cases dari Jira
 * @param {Object} options - Configuration options
 * @param {string} options.label - Label dari .env (JIRA_LABELS) untuk penamaan file
 * @param {string} options.outputDir - Output directory (default: "./yml-ts")
 * @param {string} options.appId - App ID (default: "${APP_ID}")
 * @param {string} options.jsEngine - JS Engine (default: "graaljs")
 * @param {Array} options.tags - Tags array (default: ["regression"])
 * @param {string} options.jiraFolderName - Jira folder name
 * @param {string} options.tcFilePathAndroid - TC file path for Android
 * @param {string} options.tcFilePathIOS - TC file path for iOS
 * @param {Object} options.segment - Segment config
 */
export function generateAllTestScenariosYaml(allTests, options = {}) {
  const {
    label = "outputTestScenario",
    outputDir = "./yml-ts",
    appId = "${APP_ID}",
    jsEngine = "graaljs",
    tags = ["regression"],
    jiraFolderName = "Test Automation",
    tcFilePathAndroid = "../../../components/android/",
    tcFilePathIOS = "../../../components/ios/",
    segment = {
      priority: "PRIORITY",
      mass: "MASS"
    }
  } = options;

  // Buat nama file dari label (e.g., TS_POJK_CASA_02 -> TS_POJK_CASA_02.yml)
  const fileName = `${label}.yml`;
  const outputPath = path.join(outputDir, fileName);

  console.log(`🎯 Generating Test Scenario: ${fileName}`);
  console.log(`   Label: ${label}`);
  console.log(`   Output: ${outputPath}`);

  // Generate Test Scenario
  generateTestScenario(allTests, {
    outputPath,
    appId,
    jsEngine,
    tags,
    jiraFolderName,
    tcFilePathAndroid,
    tcFilePathIOS,
    segment
  });

  console.log(`✅ Test Scenario generated: ${outputPath}`);
}
