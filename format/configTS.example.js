/**
 * Contoh konfigurasi untuk generate Test Scenario
 * Copy file ini dan sesuaikan dengan kebutuhan project Anda
 */

export const testScenarioConfig = {
  // Path output file
  outputPath: "outputTestScenario.yml",
  
  // App ID untuk automation
  appId: "${APP_ID}",
  
  // JavaScript engine yang digunakan
  jsEngine: "graaljs",
  
  // Tags untuk test scenario
  tags: ["regression", "smoke", "sanity"],
  
  // Nama folder di Jira
  jiraFolderName: "Test Automation",
  
  // Path ke file Test Case untuk Android
  // Relatif dari lokasi file Test Scenario
  tcFilePathAndroid: "../../../components/transfer-menu/transfer/android/",
  
  // Path ke file Test Case untuk iOS
  // Relatif dari lokasi file Test Scenario
  tcFilePathIOS: "../../../components/transfer-menu/transfer/ios/",
  
  // Konfigurasi segment
  segment: {
    priority: "PRIORITY",
    mass: "MASS"
  }
};

/**
 * Contoh penggunaan:
 * 
 * import { testScenarioConfig } from './format/configTS.example.js';
 * import { generateTestScenario } from './src/utils/generateTestScenario.js';
 * 
 * generateTestScenario(testCases, testScenarioConfig);
 */
