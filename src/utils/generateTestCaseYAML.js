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
  yamlContent += `appId: \${APP_ID}\n`;
  yamlContent += `env:\n`;
  yamlContent += `  PATH_FOLDER_REPORT: ./reports\n\n`;

  // ========== ON FLOW START ========== (sesuai contohTC2.yml)
  yamlContent += `onFlowStart:\n`;
  yamlContent += `  - runScript:\n`;
  yamlContent += `      file: ../../../../automation-env.js\n`; // Tambah automation-env.js
  yamlContent += `  - runScript:\n`;
  yamlContent += `      file: ../../../../configs/onflowstart/onflowstart.js\n`;
  yamlContent += `      env:\n`;
  yamlContent += `        JIRA_ISSUE: \${JIRA_ISSUE}\n`;

  // ========== ON FLOW COMPLETE ==========
  yamlContent += `\n`;
  yamlContent += `onFlowComplete:\n`;
  yamlContent += `  - runScript: ../../../../configs/onflowend/onflowend.js\n`; // Format lebih simple
  yamlContent += `---\n`;

  // ========== TEST STEPS ==========
  // Semua runFlow sejajar, tidak nested
  // Label ganjil = step, Label genap = result
  let screenshotCounter = 1;
  let labelCounter = 1;
  
  steps.forEach((item) => {
    // Label ganjil - Test Step (commands need to be filled manually)
    const step = item.step?.trim()?.replace(/:/g, ";") || "";
    yamlContent += `- runFlow:\n`;
    yamlContent += `    label: ${labelCounter.toString().padStart(2, '0')} - ${step}\n`;
    yamlContent += `    commands:\n`;
    labelCounter++;

    // Label genap - Expected Result (with screenshot)
    const result = item.result?.replace(/\n/g, " ").replace(/\s+/g, " ").replace(/:/g, ";").trim() || "";
    yamlContent += `- runFlow:\n`;
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
