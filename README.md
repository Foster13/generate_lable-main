# Test Generator - Jira to YAML

Generator untuk membuat Test Scenario dan Test Cases dari Jira.

## 🎯 Flow

```
Jira API → Test Scenario (TS Level) → Test Cases (TC) → Test Steps
```

## 📦 Instalasi

```bash
# Clone repository
git clone <repository-url>
cd generate-label

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan credentials Jira dan configuration
```

**Setup .env:**
```env
JIRA_USERNAME=your_username
JIRA_PASSWORD=your_password
JIRA_LABELS=TS_POJK_CASA_02              # For single label mode
JIRA_FOLDER_NAME=CASA - Android          # For folder mode
```

## 🚀 Cara Menggunakan

### Generate dari Single Label
```bash
npm run generate-complete
# atau
npm run generate
```

**Output:**
- `yml-ts/{JIRA_LABELS}.yml` - 1 Test Scenario
- `yml-tc/TC_*.yml` - Test Cases untuk 1 label

---

### Generate dari Entire Folder ⭐ NEW!
```bash
npm run generate-folder
```

**Output:**
- `yml-ts/TS_*.yml` - Multiple Test Scenarios (1 per label)
- `yml-tc/TC_*.yml` - All Test Cases dalam folder

**Example:**
```
Folder: CASA - Android
  ↓
32 Test Scenarios generated
65 Test Cases generated
```

---

### Generate Test Scenario Saja
```bash
npm run generate-ts
```

**Output:**
- `yml-ts/{JIRA_LABELS}.yml` - 1 Test Scenario

📖 **Penjelasan lengkap semua commands:** Lihat [COMMANDS.md](COMMANDS.md)

## 📊 Struktur Output

### Test Scenario (yml-ts/{JIRA_LABELS}.yml)
File orchestrator yang berisi daftar Test Cases untuk Android & iOS.
Nama file diambil dari `JIRA_LABELS` di file `.env`:
- Header (appId, jsEngine, tags)
- onFlowStart & onFlowEnd hooks
- Daftar runFlow per platform (Android/iOS)
- Tidak ada duplicate TC

### Test Cases (yml-tc/TC_*.yml)
File yang berisi Test Steps dari Jira:
- Header dengan environment config
- onFlowStart & onFlowComplete hooks
- Test Steps dengan format automation
- Screenshot commands
- Commands kosong siap diisi manual sesuai element

**Struktur Folder:**
```
yml-ts/                          ← Test Scenario Level (ignored in git)
  └── TS_POJK_CASA_02.yml        ← Generated files (nama dari .env)
yml-tc/                          ← Test Cases Level (ignored in git)
  ├── TC_POJK_CASA_02_001.yml    ← Generated files
  ├── TC_POJK_CASA_02_002.yml
  └── ...
format/                          ← Reference formats (committed)
  ├── coontohTS.yml
  └── TS_LOG_01_002.yml
```

**Note:** Generated files (`yml-ts/`, `yml-tc/`) are ignored in git. Only source code and documentation are committed.

## ⚙️ Konfigurasi

### 1. File .env
```env
# Single Label Mode
JIRA_LABELS=TS_POJK_CASA_02

# Folder Mode (NEW!)
JIRA_FOLDER_NAME=CASA - Android
```

**Single Label:** Generate 1 Test Scenario untuk 1 label  
**Folder Mode:** Generate semua Test Scenarios dalam folder (batch)

### 2. Kustomisasi Generator
Edit `src/generateCompleteV2.js` atau `src/generateByFolder.js`:

```javascript
generateAllTestScenariosYaml(getAllTC, {
  label: JIRA_LABELS || "outputTestScenario",
  jiraFolderName: "Your Folder Name",
  tcFilePathAndroid: "../../../components/android/",
  tcFilePathIOS: "../../../components/ios/",
  tags: ["regression", "smoke"],
});
```

## 📋 Commands

Tersedia **4 commands** yang simple dan powerful:

### 1. `npm run generate-complete` ⭐
Generate Test Scenario + Test Cases untuk 1 label

**Output:**
- `yml-ts/{JIRA_LABELS}.yml` - 1 Test Scenario
- `yml-tc/TC_*.yml` - Test Cases untuk 1 label

---

### 2. `npm run generate`
Alias untuk `generate-complete` (lebih singkat)

---

### 3. `npm run generate-folder` ⭐ NEW!
Generate semua Test Scenarios + Test Cases dari folder Jira (batch)

**Output:**
- `yml-ts/TS_*.yml` - Multiple Test Scenarios (1 per label)
- `yml-tc/TC_*.yml` - All Test Cases dalam folder

**Example:** Folder "CASA - Android" → 32 TS + 65 TC

---

### 4. `npm run generate-ts`
Generate Test Scenario saja (tanpa Test Cases)

**Output:**
- `yml-ts/{JIRA_LABELS}.yml` - 1 Test Scenario

---

📖 **Penjelasan lengkap:** Lihat [COMMANDS.md](COMMANDS.md)

## 🔍 Troubleshooting

**Error: Cannot connect to Jira**
- Check file `.env` - pastikan credentials benar

**Error: No test cases found**
- Check Jira query di `src/jira/getAll.js`

**File tidak ter-generate**
- Check console untuk error message
- Pastikan koneksi Jira stabil
