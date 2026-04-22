import fs from "fs";
import path from "path";

/**
 * Generate Test Case (TC) YAML file dengan Test Steps dari Jira
 * Format: Semua runFlow sejajar, tidak nested
 * Label ganjil = Test Step, Label genap = Expected Result
 * 
 * @param {Array} steps - Test steps dari Jira
 * @param {string} tcName - Nama Test Case (e.g., TC_POJK_CASA_01_001)
 * @param {string} issueKey - Jira issue key
 * @param {string} outputDir - Output directory
 * @param {boolean} isFirst - Apakah TC pertama (untuk balance before)
 * @param {boolean} isLast - Apakah TC terakhir (untuk balance after)
 */
export function generateTestCaseYAML(steps, tcName, issueKey, outputDir = "./yml-tc", isFirst = false, isLast = false) {
  let yamlContent = "";

  // ========== HEADER ==========
  yamlContent += `appId: \${APP_ID}\n\n`;
  yamlContent += `env:\n`;
  yamlContent += `  PATH_FOLDER_REPORT: ./reports\n\n`;

  // ========== ON FLOW START ==========
  yamlContent += `onFlowStart:\n`;
  yamlContent += `  - runScript:\n`;
  yamlContent += `      file: ../../../../configs/onflowstart/onflowstart.js\n`;
  yamlContent += `      env:\n`;
  yamlContent += `        JIRA_ISSUE: \${JIRA_ISSUE}\n`;

  // Add balance script untuk first atau last
  if (isFirst) {
    yamlContent += `  - runScript:\n`;
    yamlContent += `      file: ../../../../configs/get-balance.js\n`;
    yamlContent += `      env:\n`;
    yamlContent += `        BALANCE_STATE: before\n`;
  } else if (isLast) {
    yamlContent += `  - runScript:\n`;
    yamlContent += `      file: ../../../../configs/get-balance.js\n`;
    yamlContent += `      env:\n`;
    yamlContent += `        BALANCE_STATE: after\n`;
  }

  // ========== ON FLOW COMPLETE ==========
  yamlContent += `\n`;
  yamlContent += `onFlowComplete:\n`;
  yamlContent += `  - runScript:\n`;
  yamlContent += `      file: ../../../../configs/onflowend/onflowend.js\n`;
  yamlContent += `---\n`;

  // ========== TEST STEPS ==========
  // Semua runFlow sejajar, tidak nested
  // Label ganjil = step, Label genap = result
  let screenshotCounter = 1;
  let labelCounter = 1;
  
  steps.forEach((item) => {
    // Label ganjil - Test Step
    const step = item.step?.trim()?.replace(/:/g, ";") || "";
    yamlContent += `- runFlow :\n`;
    yamlContent += `    label: ${labelCounter.toString().padStart(2, '0')} - ${step}\n`;
    yamlContent += `    commands:\n`;
    labelCounter++;

    // Label genap - Expected Result
    const result = item.result?.replace(/\n/g, " ").replace(/\s+/g, " ").replace(/:/g, ";").trim() || "";
    yamlContent += `- runFlow :\n`;
    yamlContent += `    label: ${labelCounter.toString().padStart(2, '0')} - ${result}\n`;
    yamlContent += `    commands:\n`;
    yamlContent += `      - takeScreenshot: \${output.PATH_FOLDER_REPORT}/${screenshotCounter.toString().padStart(2, '0')}_\${TC}\n`;
    labelCounter++;
    screenshotCounter++;
  });

  // ========== WRITE FILE ==========
  const fileName = `${tcName}.yml`;
  const filePath = path.join(outputDir, fileName);
  
  fs.writeFileSync(filePath, yamlContent, "utf8");
  console.log(`   ✓ Created: ${fileName}`);
}
