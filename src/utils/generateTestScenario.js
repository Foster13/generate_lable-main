import fs from "fs";
import path from "path";

/**
 * Generate Test Scenario YAML file (TS level)
 * Format seperti coontohTS.yml dengan header, onFlowStart/End, dan runFlow untuk Android & iOS
 */
export function generateTestScenario(items, options = {}) {
  const {
    outputPath = "yml-ts/outputTestScenario.yml",
    appId = "${APP_ID}",
    jsEngine = "graaljs",
    tags = ["regression"],
    jiraFolderName = "",
    tcFilePathAndroid = "../../../components/",
    tcFilePathIOS = "../../../components/",
    segment = { priority: "PRIORITY", mass: "MASS" }
  } = options;

  let output = "";

  // ========== HEADER SECTION ==========
  output += `appId: ${appId}\n`;
  output += `jsEngine: ${jsEngine}\n\n`;

  // Tags - sesuai template: acceptence test
  output += `tags:\n`;
  output += `  - acceptence test\n`;

  // Environment variables - sesuai template: CASA (tanpa " - Android")
  output += `env:\n`;
  output += `  JIRA_FOLDER_NAME: CASA\n`;
  output += `\n`;

  // ========== ON FLOW START ========== (hanya 1 script sesuai template)
  output += `onFlowStart:\n`;
  output += `  - runScript:\n`;
  output += `      file: ../../../automation-env.js\n`;

  output += `---\n`;

  // Remove duplicates berdasarkan issueSummary
  const uniqueItems = [];
  const seenSummaries = new Set();
  
  items.forEach(item => {
    const summary = item.issueSummary?.trim() || "";
    if (!seenSummaries.has(summary)) {
      seenSummaries.add(summary);
      uniqueItems.push(item);
    }
  });

  // ========== ANDROID SECTION ==========
  output += `#=============================================================================== Android\n`;

  uniqueItems.forEach((item, index) => {
    const summary = item.issueSummary?.trim() || "";
    const issueKey = item.issueKey?.trim() || "";
    const tcName = summary.replace(/^TS_/, "TC_"); // Convert TS_ to TC_
    
    // Extract TC number from summary (e.g., TS_POJK_CASA_01_001 -> TC_POJK_CASA_01_001)
    const tcNumber = tcName;
    
    // Get label from Jira (use summary or custom label)
    const label = `${summary}`; // Bisa diisi dengan description dari Jira jika ada

    output += `- runFlow:\n`;
    output += `    label: ${label}\n`; // Diisi dengan summary
    output += `    file: ../../../components/pojk/pojk-casa/Android/${tcNumber}.yml\n`; // Path sesuai template
    output += `    env:\n`;
    output += `      PLATFORM: Android\n`; // Sesuai template
    output += `      JIRA_ISSUE: ${issueKey}\n`; // Diisi dengan issue key
    output += `      TC: ${tcNumber}\n`;
    output += `\n`;
  });

  // ========== iOS SECTION ==========
  output += `#=============================================================================== iOS\n`;

  uniqueItems.forEach((item, index) => {
    const summary = item.issueSummary?.trim() || "";
    const issueKey = item.issueKey?.trim() || "";
    const tcName = summary.replace(/^TS_/, "TC_");
    const tcNumber = tcName;
    const label = `${summary}`;

    output += `- runFlow:\n`;
    output += `    label: ${label}\n`;
    output += `    file: ../../../components/pojk/pojk-casa/iOS/${tcNumber}.yml\n`; // Path sesuai template (iOS bukan ios)
    output += `    env:\n`;
    output += `      PLATFORM: iOS\n`; // Sesuai template
    output += `      JIRA_ISSUE: ${issueKey}\n`;
    output += `      TC: ${tcNumber}\n`;
    output += `\n`;
  });

  // Write to file
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, output, "utf8");
  console.log(`✅ Test Scenario file generated: ${outputPath}`);
  
  return output;
}

/**
 * Decode HTML entities from Jira description
 */
function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}
