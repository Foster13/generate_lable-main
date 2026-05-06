# Commands Reference

Penjelasan lengkap semua commands yang tersedia di `package.json`.

---

## 🚀 Available Commands

Project ini memiliki **6 commands** yang powerful dan efisien:

### 1. `npm run generate-complete` ⭐ RECOMMENDED

**File:** `src/generateCompleteV2.js`

**Deskripsi:**
Generate Test Scenario dan Test Cases untuk 1 label spesifik. Command utama untuk single label generation.

**Proses:**
```
1. Fetch test cases dari Jira (by label)
   ↓
2. Generate 1 Test Scenario
   → yml-ts/{JIRA_LABELS}.yml
   ↓
3. Generate Test Cases dengan Steps dari Jira
   → yml-tc/TC_*.yml
```

**Output:**
- `yml-ts/{JIRA_LABELS}.yml` - 1 Test Scenario
- `yml-tc/TC_*.yml` - Test Cases untuk 1 label

**Kapan digunakan:**
- ✅ Generate untuk 1 label spesifik
- ✅ Development dan testing
- ✅ Quick generation

**Contoh:**
```bash
# .env
JIRA_LABELS=TS_POJK_CASA_02

# Command
npm run generate-complete

# Output
yml-ts/TS_POJK_CASA_02.yml
yml-tc/TC_POJK_CASA_02_001.yml
yml-tc/TC_POJK_CASA_02_002.yml
```

---

### 2. `npm run generate`

**File:** `src/generateCompleteV2.js`

**Deskripsi:**
Alias untuk `generate-complete`. Sama persis, hanya lebih singkat untuk diketik.

**Kapan digunakan:**
- Sama dengan `generate-complete`
- Lebih cepat dan praktis

---

### 3. `npm run generate-folder` ⭐ NEW! BATCH GENERATION

**File:** `src/generateByFolder.js`

**Deskripsi:**
Generate semua Test Scenarios dan Test Cases dari entire Jira folder. Batch generation yang sangat powerful! Sekarang support **custom output folder** via environment variable `OUTPUT_FOLDER`.

**Proses:**
```
1. Fetch ALL test cases dari Jira folder
   ↓
2. Group test cases by label
   ↓
3. Generate multiple Test Scenarios (1 per label)
   → {OUTPUT_FOLDER}/yml-ts/TS_*.yml (or yml-ts/ if not set)
   ↓
4. Generate ALL Test Cases
   → {OUTPUT_FOLDER}/yml-tc/TC_*.yml (or yml-tc/ if not set)
```

**Output:**
- Default (no OUTPUT_FOLDER): `yml-ts/` dan `yml-tc/`
- Custom (with OUTPUT_FOLDER): `{OUTPUT_FOLDER}/yml-ts/` dan `{OUTPUT_FOLDER}/yml-tc/`

**Kapan digunakan:**
- ✅ **Production deployment** - Generate entire module
- ✅ **Batch processing** - Semua labels sekaligus
- ✅ **Time saving** - 1 command untuk semua
- ✅ **Complete automation** - Entire folder
- ✅ **Custom output** - Pisahkan per fitur/module

**Contoh:**

#### Default Output:
```bash
# .env
JIRA_FOLDER_NAME=CASA - Android
# OUTPUT_FOLDER tidak di-set

# Command
npm run generate-folder

# Output
yml-ts/TS_POJK_CASA_01.yml
yml-ts/TS_POJK_CASA_02.yml
...
yml-tc/TC_POJK_CASA_01_001.yml
yml-tc/TC_POJK_CASA_01_002.yml
...
```

#### Custom Output Folder:
```bash
# .env
JIRA_FOLDER_NAME=Home - Android
OUTPUT_FOLDER=pojk-home

# Command
npm run generate-folder

# Output
pojk-home/yml-ts/TS_POJK_HOME_01.yml
pojk-home/yml-ts/TS_POJK_HOME_02.yml
...
pojk-home/yml-tc/TC_POJK_HOME_01_001.yml
pojk-home/yml-tc/TC_POJK_HOME_02_001.yml
...
```

#### Multiple Features:
```bash
# Transfer Feature
JIRA_FOLDER_NAME=Transfer - Android
OUTPUT_FOLDER=pojk-transfer
npm run generate-folder

# Login Feature
JIRA_FOLDER_NAME=Login - Android
OUTPUT_FOLDER=pojk-login
npm run generate-folder

# Payment Feature
JIRA_FOLDER_NAME=Payment - Android
OUTPUT_FOLDER=pojk-payment
npm run generate-folder
```

**Console Output:**
```
╔════════════════════════════════════════════════════════════╗
║     FOLDER-BASED GENERATION PIPELINE                      ║
║     Batch Generate from Jira Folder                       ║
╚════════════════════════════════════════════════════════════╝

📁 Target Folder: CASA - Android

📋 STEP 1: Fetching all test cases from Jira folder...
📥 Fetching test cases with pagination...
   Page 1: Found 20 test cases
   Page 2: Found 20 test cases
   Page 3: Found 20 test cases
   Page 4: Found 5 test cases
✅ Total fetched: 65 test cases from 4 page(s)

🔄 STEP 2: Grouping test cases by label...
✅ Found 32 unique labels:
   01. TS_POJK_CASA_01 (2 test cases)
   02. TS_POJK_CASA_02 (2 test cases)
   ...

🎯 STEP 3: Generating Test Scenarios (TS Level)...
✅ Generated 32 Test Scenario files in yml-ts/

📝 STEP 4: Generating Test Cases (TC) with Steps from Jira...
✅ Test Cases generated in yml-tc/ folder

📊 Summary:
   Folder: CASA - Android
   Test Scenarios: 32 files
   Test Cases: 65 files

🎉 All files are ready for automation!
```

---

### 4. `npm run generate-ts`

**File:** `src/utils/generateTSOnly.js`

**Deskripsi:**
Generate Test Scenario saja, tanpa generate Test Cases.

**Proses:**
```
1. Fetch test cases dari Jira (by label)
   ↓
2. Generate 1 Test Scenario
   → yml-ts/{JIRA_LABELS}.yml
```

**Output:**
- `yml-ts/{JIRA_LABELS}.yml` - 1 Test Scenario

**Kapan digunakan:**
- Update Test Scenario saja
- Sudah punya Test Cases
- Quick update orchestrator

---

---

## 📊 Perbandingan Commands

| Command | Scope | Test Scenarios | Test Cases | Time | Best For |
|---------|-------|---------------|------------|------|----------|
| `generate-complete` ⭐ | 1 Label | 1 | Few | ~10s | Development |
| `generate` ⭐ | 1 Label | 1 | Few | ~10s | Quick Dev |
| `generate-folder` 🚀 | Entire Folder | Many | Many | ~60s | Production |
| `generate-ts` | 1 Label | 1 | 0 | ~2s | TS Only |

---

## 🎯 Workflow Recommendations

### Scenario 1: Development & Testing
```bash
# Single label untuk development
npm run generate-complete
```

### Scenario 2: Production Deployment
```bash
# Entire module untuk production (default output)
npm run generate-folder
```

### Scenario 2b: Custom Output Folder
```bash
# Generate ke folder terpisah per fitur
# .env: OUTPUT_FOLDER=pojk-home
npm run generate-folder
```
```

### Scenario 3: Quick Test Scenario Update
```bash
# Update orchestrator saja
npm run generate-ts
```

### Scenario 4: Different Folders
```bash
# Ganti folder di .env
JIRA_FOLDER_NAME=Transfer - Android
OUTPUT_FOLDER=pojk-transfer
npm run generate-folder

# Ganti ke folder lain
JIRA_FOLDER_NAME=Login - iOS
OUTPUT_FOLDER=pojk-login
npm run generate-folder
```

---

## ⚙️ Configuration Examples

### Single Label Mode
```env
JIRA_LABELS=TS_POJK_CASA_02
```
```bash
npm run generate-complete
```

### Folder Mode
```env
JIRA_FOLDER_NAME=CASA - Android
```
```bash
npm run generate-folder
```

### Multiple Folders
```env
# CASA Android
JIRA_FOLDER_NAME=CASA - Android
# npm run generate-folder

# CASA iOS  
JIRA_FOLDER_NAME=CASA - iOS
# npm run generate-folder

# Transfer Android
JIRA_FOLDER_NAME=Transfer - Android
# npm run generate-folder
```

---

## 🔍 Troubleshooting

### Error: JIRA_FOLDER_NAME not set
```bash
# Add to .env
JIRA_FOLDER_NAME=CASA - Android
```

### Error: No test cases found in folder
```bash
# Check folder name spelling
# Check if folder has test cases
# Verify Jira credentials
```

### Large folder takes long time
```bash
# Normal for large folders (100+ test cases)
# Use pagination (automatic)
# Consider splitting by smaller folders
```

---

## 💡 Pro Tips

1. **Use `generate-folder` for production** - Complete module generation
2. **Use `generate-complete` for development** - Quick single label testing  
3. **Use `generate-ts` for quick updates** - When you only need orchestrator
4. **Folder naming matters** - Use exact folder name from Jira
5. **Check console output** - Rich information about progress
6. **Backup before batch generation** - Large operations

---

## 🎉 New Features Summary

✨ **Folder-based Generation** - Generate entire modules in 1 command  
📊 **Smart Grouping** - Auto-group test cases by label  
🔄 **Pagination Support** - Handle large folders automatically  
📈 **Rich Statistics** - Detailed progress and summary  
🎯 **Batch Processing** - Multiple Test Scenarios + All Test Cases  

**Version:** 3.1.0 with Folder-based Generation 🚀

---

### 5. `npm run convert-yaml`

**File:** `src/convertYamlToJs.js`

**Deskripsi:**
Convert YAML automation scripts to JavaScript objects for easier element management.

**Proses:**
```
1. Parse YAML file
   ↓
2. Extract elements (ids, texts, actions)
   ↓
3. Generate JavaScript object
   → output.js
```

**Usage:**
```bash
npm run convert-yaml <input.yml> <output.js> [objectName]
```

**Output:**
JavaScript object with element mappings

**Kapan digunakan:**
- Convert YAML automation to JS objects
- Element mapping for test frameworks
- Basic YAML to JS conversion

**Contoh:**
```bash
npm run convert-yaml coba.yml LoginElements.js
npm run convert-yaml test.yml elements/TestElements.js TestElements

# Output: LoginElements.js
output.LoginElements = {
  buttonLogin: 'Login',
  textPassword: 'Password',
  // ...
}
```

---

### 6. `npm run convert-yaml-login` ⭐ RECOMMENDED

**File:** `src/convertYamlToLogin.js`

**Deskripsi:**
Convert YAML automation scripts to JavaScript objects using `format/login.js` structure as reference. Smart screen detection and element categorization.

**Proses:**
```
1. Parse YAML file
   ↓
2. Detect screen contexts (PRELOGIN_SCREEN, PASSWORD_SCREEN, etc.)
   ↓
3. Categorize elements by screen
   ↓
4. Generate format/login.js style structure
   → output.js
```

**Usage:**
```bash
npm run convert-yaml-login <input.yml> <output.js> [moduleName]
```

**Output:**
JavaScript object organized by screen context

**Features:**
- 🎯 Smart screen detection
- 🧹 Clean element naming
- 🔄 Duplicate removal
- 📱 Screen-based organization
- 🎨 format/login.js style

**Kapan digunakan:**
- ✅ Convert YAML to screen-organized JS
- ✅ Match format/login.js structure
- ✅ Production automation scripts
- ✅ Complex multi-screen flows

**Contoh:**
```bash
npm run convert-yaml-login coba.yml LoginElements.js
npm run convert-yaml-login automation.yml elements/LoginMap.js AUTOMATION

# Output: LoginElements.js
output.LOGIN = {
    PRELOGIN_SCREEN: {
        buttonEWallet: 'E-Wallet',
        buttonQRIS: 'QRIS',
        buttonLogin: 'Login'
    },
    PASSWORD_SCREEN: {
        textFieldPassword: 'pass123',
        textPassword: 'Password'
    },
    HOMESCREEN: {
        buttonTransfer: 'MavIconButtonButtonTransfer'
    }
}
```

---

## 📊 Updated Commands Comparison

| Command | Scope | Output | Time | Best For |
|---------|-------|--------|------|----------|
| `generate-complete` ⭐ | 1 Label | TS + TC | ~10s | Development |
| `generate` ⭐ | 1 Label | TS + TC | ~10s | Quick Dev |
| `generate-folder` 🚀 | Entire Folder | Many TS + TC | ~60s | Production |
| `generate-ts` | 1 Label | TS Only | ~2s | TS Only |
| `convert-yaml` | 1 YAML File | JS Object | ~1s | Basic Conversion |
| `convert-yaml-login` ⭐ | 1 YAML File | Screen-organized JS | ~1s | Advanced Conversion |

---

## 🎯 Updated Workflow Recommendations

### Scenario 1: Development & Testing (Jira to YAML)
```bash
# Setup single label
echo "JIRA_LABELS=TS_POJK_CASA_02" >> .env

# Generate for development
npm run generate-complete
```

### Scenario 2: Production Batch (Jira to YAML)
```bash
# Setup folder
echo "JIRA_FOLDER_NAME=CASA - Android" >> .env

# Generate all at once
npm run generate-folder
```

### Scenario 3: YAML to JavaScript Conversion
```bash
# Basic conversion
npm run convert-yaml automation.yml ElementMap.js

# Advanced conversion (recommended)
npm run convert-yaml-login automation.yml LoginElements.js
```

### Scenario 4: Complete Automation Pipeline
```bash
# Step 1: Generate from Jira
npm run generate-folder

# Step 2: Convert YAML to JS (for each automation file)
npm run convert-yaml-login yml-tc/TC_POJK_CASA_01_001.yml elements/TC01.js
npm run convert-yaml-login yml-tc/TC_POJK_CASA_01_002.yml elements/TC02.js
```