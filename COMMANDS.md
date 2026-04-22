# Commands Reference

Penjelasan lengkap semua commands yang tersedia di `package.json`.

---

## 🚀 Available Commands

Project ini memiliki **4 commands** yang powerful dan efisien:

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
Generate semua Test Scenarios dan Test Cases dari entire Jira folder. Batch generation yang sangat powerful!

**Proses:**
```
1. Fetch ALL test cases dari Jira folder
   ↓
2. Group test cases by label
   ↓
3. Generate multiple Test Scenarios (1 per label)
   → yml-ts/TS_*.yml
   ↓
4. Generate ALL Test Cases
   → yml-tc/TC_*.yml
```

**Output:**
- `yml-ts/TS_POJK_CASA_01.yml` - Test Scenario 1
- `yml-ts/TS_POJK_CASA_02.yml` - Test Scenario 2
- `yml-ts/TS_POJK_CASA_03.yml` - Test Scenario 3
- ... (semua labels dalam folder)
- `yml-tc/TC_*.yml` - All Test Cases

**Kapan digunakan:**
- ✅ **Production deployment** - Generate entire module
- ✅ **Batch processing** - Semua labels sekaligus
- ✅ **Time saving** - 1 command untuk semua
- ✅ **Complete automation** - Entire folder

**Contoh:**
```bash
# .env
JIRA_FOLDER_NAME=CASA - Android

# Command
npm run generate-folder

# Output (Example)
32 Test Scenarios generated:
yml-ts/TS_POJK_CASA_01.yml
yml-ts/TS_POJK_CASA_02.yml
...
yml-ts/TS_POJK_CASA_32.yml

65 Test Cases generated:
yml-tc/TC_POJK_CASA_01_001.yml
yml-tc/TC_POJK_CASA_01_002.yml
...
yml-tc/TC_POJK_CASA_32_003.yml
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
# Entire module untuk production
npm run generate-folder
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
npm run generate-folder

# Ganti ke folder lain
JIRA_FOLDER_NAME=Login - iOS
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
