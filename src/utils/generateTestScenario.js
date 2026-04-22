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

  // Tags
  output += `tags:\n`;
  tags.forEach(tag => {
    output += `  - ${tag}\n`;
  });

  // Environment variables
  if (jiraFolderName) {
    output += `env:\n`;
    output += `  JIRA_FOLDER_NAME: ${jiraFolderName}\n`;
  }
  output += `\n`;

  // ========== ON FLOW START ==========
  output += `onFlowStart:\n`;
  output += `  - runScript:\n`;
  output += `      file: ../../../automation-env.js\n`;
  output += `  - runScript:\n`;
  output += `      file: ../../../configs/general/setSegment.js\n`;
  output += `      env:\n`;
  output += `        SEGMENT: ${segment.priority}\n\n`;

  // ========== ON FLOW END ==========
  output += `onFlowEnd:\n`;
  output += `  - runScript:\n`;
  output += `      file: ../../../configs/general/setSegment.js\n`;
  output += `      env:\n`;
  output += `        SEGMENT: ${segment.mass}\n\n`;

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
  output += `#=============================================================================== Android\n\n`;

  uniqueItems.forEach((item, index) => {
    const summary = item.issueSummary?.trim() || "";
    const issueKey = item.issueKey?.trim() || "";
    const tcName = summary.replace(/^TS_/, "TC_"); // Convert TS_ to TC_
    
    // Extract TC number from summary (e.g., TS_POJK_CASA_01_001 -> TC_POJK_CASA_01_001)
    const tcNumber = tcName;

    output += `- runFlow:\n`;
    output += `    label: \n`; // Kosong sesuai format contoh
    output += `    when:\n`;
    output += `      platform: android\n`;
    output += `    file: ${tcFilePathAndroid}${tcName}.yml\n`;
    output += `    env:\n`;
    output += `      JIRA_ISSUE: \n`; // Kosong sesuai format contoh
    output += `      TC: ${tcNumber}\n`;
    
    // Add BALANCE_STATE only for first item
    if (index === 0) {
      output += `      BALANCE_STATE: "before"\n`;
    }
    
    output += `\n`;
  });

  // ========== iOS SECTION ==========
  output += `#=============================================================================== iOS\n\n`;

  uniqueItems.forEach((item, index) => {
    const summary = item.issueSummary?.trim() || "";
    const issueKey = item.issueKey?.trim() || "";
    const tcName = summary.replace(/^TS_/, "TC_");
    const tcNumber = tcName;

    output += `- runFlow:\n`;
    output += `    label: \n`;
    output += `    when:\n`;
    output += `      platform: ios\n`;
    output += `    file: ${tcFilePathIOS}${tcName}.yml\n`;
    output += `    env:\n`;
    output += `      JIRA_ISSUE: \n`;
    output += `      TC: ${tcNumber}\n`;
    
    // Add BALANCE_STATE only for first item
    if (index === 0) {
      output += `      BALANCE_STATE: "before"\n`;
    }
    
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
