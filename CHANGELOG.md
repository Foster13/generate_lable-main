# Changelog

## [3.1.0] - 2026-04-22 - Folder-based Generation 🚀

### Added - Major Feature
- ✨ **Folder-based Generation** - Generate entire modules from Jira folder
- 🎯 **New Command:** `npm run generate-folder` - Batch generation
- 📊 **Smart Grouping** - Auto-group test cases by label
- 🔄 **Pagination Support** - Handle large folders automatically
- 📈 **Rich Statistics** - Detailed progress and summary reporting

### New Files
- ✅ `src/generateByFolder.js` - Main folder-based generation script
- ✅ `src/jira/getAllByFolder.js` - Jira API for folder queries
- ✅ `src/utils/groupByLabel.js` - Smart grouping utility

### Enhanced
- ✅ `src/utils/constans.js` - Added JIRA_FOLDER_NAME support
- ✅ `.env` - Added folder configuration
- ✅ `package.json` - Added generate-folder command

### Benefits
- 🚀 **Batch Processing** - Generate 32 Test Scenarios + 65 Test Cases in 1 command
- ⏱️ **Time Saving** - 1 command for entire module vs manual per label
- 🎯 **Production Ready** - Complete automation for deployment
- 📊 **Smart Analytics** - Auto-detect labels and statistics

### Example Usage
```bash
# .env
JIRA_FOLDER_NAME=CASA - Android

# Command
npm run generate-folder

# Result
✅ 32 Test Scenarios generated
✅ 65 Test Cases generated
```

### Updated Documentation
- ✅ README.md - Added folder-based examples
- ✅ COMMANDS.md - Comprehensive folder command documentation
- ✅ QUICK_START.md - Added folder mode quick start

---

## [3.0.0] - 2026-04-22 - Major Cleanup 🧹

### Removed - Legacy Files
- ❌ `src/generateComplete.js` - Replaced by `generateCompleteV2.js`
- ❌ `src/main.js` - Legacy workflow
- ❌ `src/utils/convertTStoTC.js` - No longer needed (direct TC generation from Jira)
- ❌ `src/utils/combineLabels.js` - Not essential
- ❌ `src/utils/generateYAMLFromSteps.js` - Legacy
- ❌ `src/utils/generateYAMLDirect.js` - Legacy
- ❌ `src/utils/converstAllTestCase.js` - Unused
- ❌ `src/generator/generateAllTestStepsYaml.js` - Legacy (yml/ folder generation)

### Removed - Legacy Commands
- ❌ `npm run generate-old` - Legacy workflow
- ❌ `npm run generate-all` - Legacy workflow
- ❌ `npm run convert` - No longer needed
- ❌ `npm run combine` - Not essential
- ❌ `npm run lable` - Typo command

### Simplified
**Only 3 commands remain:**
- ✅ `npm run generate-complete` - Main command
- ✅ `npm run generate` - Shortcut
- ✅ `npm run generate-ts` - Test Scenario only

### Benefits
- 🎯 Simpler workflow
- 🚀 Faster onboarding
- 📦 Smaller codebase
- 🧹 No legacy confusion
- ✨ Better maintainability

---

## [2.1.0] - 2026-04-22

### Added
- **Service untuk generate Test Scenario dengan penamaan dinamis**
  - `src/generator/generateAllTestScenariosYaml.js` - Service baru untuk generate TS Level
  - Penamaan file Test Scenario sekarang menggunakan `JIRA_LABELS` dari .env
  - Contoh: `JIRA_LABELS=TS_POJK_CASA_02` → `yml-ts/TS_POJK_CASA_02.yml`

### Changed
- `src/generateCompleteV2.js` - Menggunakan service baru `generateAllTestScenariosYaml`
- `src/utils/generateTSOnly.js` - Menggunakan service baru `generateAllTestScenariosYaml`
- Dokumentasi diupdate untuk menjelaskan penamaan dinamis dari .env

### Removed
- `yml-ts/outputTestScenario.yml` - Diganti dengan penamaan dinamis dari JIRA_LABELS

---

## [2.0.1] - 2026-04-21

### Fixed
- Remove duplicate TC di Test Scenario
- Fix double path (`android/android/` → `android/`)

### Improvements
- Test Scenario sekarang 100% match dengan format referensi
- Duplicate detection berdasarkan `issueSummary`

---

## [2.0.0] - 2026-04-21

### Major Changes
**Flow diubah:**
- Lama: Jira → Test Scenario → Test Steps → Test Cases
- Baru: Jira → Test Scenario → Test Cases (with Steps from Jira)

### Added
- `src/generateCompleteV2.js` - Complete pipeline
- `src/generator/generateAllTestCasesYaml.js` - Generator Test Cases
- `src/utils/generateTestCaseYAML.js` - Utility generate TC YAML

### Changed
- `npm run generate` → `generateCompleteV2.js`
- `npm run generate-complete` → `generateCompleteV2.js`

---

## [1.1.0] - 2026-04-21

### Added
- Generator Test Scenario (TS Level)
- Command: `npm run generate-ts`
- Dokumentasi lengkap

---

## [1.0.0] - Initial Release

### Features
- Generate Test Steps dari Jira
- Convert TS ke TC
- Combine labels
