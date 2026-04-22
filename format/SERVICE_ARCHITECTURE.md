# Service Architecture

Dokumentasi arsitektur service untuk generator Test Scenario dan Test Cases.

## 📁 Struktur Service

```
src/
├── generator/
│   ├── generateAllTestScenariosYaml.js  ← Service untuk TS Level
│   ├── generateAllTestCasesYaml.js      ← Service untuk TC Level
│   └── generateAllTestStepsYaml.js      ← Legacy (deprecated)
├── utils/
│   ├── generateTestScenario.js          ← Core logic untuk TS
│   ├── generateTestCaseYAML.js          ← Core logic untuk TC
│   └── generateTSOnly.js                ← Standalone script untuk TS
└── generateCompleteV2.js                ← Main pipeline
```

## 🎯 Service Pattern

### 1. Test Scenario Service
**File:** `src/generator/generateAllTestScenariosYaml.js`

**Fungsi:**
- Generate Test Scenario (TS Level) dengan penamaan dinamis
- Penamaan file menggunakan `JIRA_LABELS` dari .env
- Orchestrator yang berisi daftar Test Cases

**Input:**
```javascript
generateAllTestScenariosYaml(allTests, {
  label: "TS_POJK_CASA_02",           // Dari JIRA_LABELS di .env
  outputDir: "./yml-ts",
  appId: "${APP_ID}",
  jsEngine: "graaljs",
  tags: ["regression"],
  jiraFolderName: "Test Automation",
  tcFilePathAndroid: "../../../components/android/",
  tcFilePathIOS: "../../../components/ios/",
  segment: {
    priority: "PRIORITY",
    mass: "MASS"
  }
});
```

**Output:**
- `yml-ts/TS_POJK_CASA_02.yml` - Test Scenario file

**Karakteristik:**
- ✅ Penamaan dinamis dari .env
- ✅ Auto-create folder jika belum ada
- ✅ Format sesuai `format/coontohTS.yml`
- ✅ Separate sections untuk Android & iOS
- ✅ No duplicate TCs

---

### 2. Test Cases Service
**File:** `src/generator/generateAllTestCasesYaml.js`

**Fungsi:**
- Generate Test Cases (TC) dengan Test Steps dari Jira
- Loop semua test cases dan fetch steps dari Jira
- Generate file TC untuk setiap test case

**Input:**
```javascript
await generateAllTestCasesYaml(allTests, authHeader, "./yml-tc");
```

**Output:**
- `yml-tc/TC_POJK_CASA_02_001.yml` - Test Case 1
- `yml-tc/TC_POJK_CASA_02_002.yml` - Test Case 2
- dst...

**Karakteristik:**
- ✅ Fetch steps dari Jira API
- ✅ Auto-convert TS_ ke TC_
- ✅ Format sesuai `format/TS_LOG_01_002.yml`
- ✅ Flat runFlow structure
- ✅ Balance script untuk first/last TC

---

## 🔄 Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    generateCompleteV2.js                    │
│                     (Main Pipeline)                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Fetch from Jira │
                    │   (getAll API)   │
                    └─────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
    ┌───────────────────────┐   ┌───────────────────────┐
    │ generateAllTest       │   │ generateAllTest       │
    │ ScenariosYaml         │   │ CasesYaml             │
    │ (TS Level Service)    │   │ (TC Level Service)    │
    └───────────────────────┘   └───────────────────────┘
                │                           │
                ▼                           ▼
    ┌───────────────────────┐   ┌───────────────────────┐
    │ generateTestScenario  │   │ getTestSteps (Jira)   │
    │ (Core Logic)          │   │ generateTestCaseYAML  │
    └───────────────────────┘   └───────────────────────┘
                │                           │
                ▼                           ▼
    ┌───────────────────────┐   ┌───────────────────────┐
    │ yml-ts/               │   │ yml-tc/               │
    │ TS_POJK_CASA_02.yml   │   │ TC_*.yml              │
    └───────────────────────┘   └───────────────────────┘
```

---

## 🔧 Konfigurasi

### Environment Variables (.env)
```env
# Jira Credentials
JIRA_USERNAME=your_username
JIRA_PASSWORD=your_password
JIRA_BASE_URL=https://jira.bni.co.id
JIRA_VERSION_NAME=Sq Fraud Audit
JIRA_CYCLE_NAME=Acceptance Test

# Label untuk penamaan Test Scenario
JIRA_LABELS=TS_POJK_CASA_02
```

### Service Options

#### Test Scenario Service Options
```javascript
{
  label: string,              // Nama file (dari JIRA_LABELS)
  outputDir: string,          // Output directory
  appId: string,              // App ID
  jsEngine: string,           // JS Engine (graaljs)
  tags: Array<string>,        // Tags array
  jiraFolderName: string,     // Jira folder name
  tcFilePathAndroid: string,  // TC path untuk Android
  tcFilePathIOS: string,      // TC path untuk iOS
  segment: {
    priority: string,         // Segment priority
    mass: string              // Segment mass
  }
}
```

#### Test Cases Service Options
```javascript
generateAllTestCasesYaml(
  allTests,      // Array of test cases
  authHeader,    // Jira auth header
  outputDir      // Output directory
)
```

---

## 📝 Usage Examples

### Example 1: Generate dengan Label Custom
```javascript
// .env
JIRA_LABELS=TS_CUSTOM_FEATURE_01

// Output: yml-ts/TS_CUSTOM_FEATURE_01.yml
```

### Example 2: Generate dengan Konfigurasi Custom
```javascript
generateAllTestScenariosYaml(allTests, {
  label: "TS_MY_FEATURE",
  outputDir: "./custom-output",
  tags: ["regression", "smoke", "critical"],
  jiraFolderName: "My Custom Folder",
  tcFilePathAndroid: "../../../custom/android/",
  tcFilePathIOS: "../../../custom/ios/",
});
```

### Example 3: Generate Test Scenario Saja
```bash
# Set JIRA_LABELS di .env
JIRA_LABELS=TS_POJK_CASA_02

# Run command
npm run generate-ts

# Output: yml-ts/TS_POJK_CASA_02.yml
```

---

## 🎯 Best Practices

### 1. Penamaan Label
- Gunakan format: `TS_{FEATURE}_{MODULE}_{VERSION}`
- Contoh: `TS_POJK_CASA_02`, `TS_LOGIN_AUTH_01`
- Konsisten dengan naming convention project

### 2. Folder Structure
```
yml-ts/                    ← Test Scenario Level
  ├── TS_POJK_CASA_01.yml
  ├── TS_POJK_CASA_02.yml
  └── TS_LOGIN_AUTH_01.yml

yml-tc/                    ← Test Cases Level
  ├── TC_POJK_CASA_01_001.yml
  ├── TC_POJK_CASA_01_002.yml
  ├── TC_POJK_CASA_02_001.yml
  └── TC_LOGIN_AUTH_01_001.yml
```

### 3. Service Reusability
- Service dapat dipanggil dari berbagai script
- Konfigurasi dapat di-override sesuai kebutuhan
- Fallback ke default value jika tidak ada konfigurasi

---

## 🔍 Troubleshooting

### Issue: File tidak ter-generate dengan nama yang benar
**Solution:** Check `JIRA_LABELS` di file `.env`

### Issue: Folder tidak ter-create otomatis
**Solution:** Service sudah handle auto-create, check permission folder

### Issue: Format output tidak sesuai
**Solution:** Check file referensi di `format/coontohTS.yml` dan `format/TS_LOG_01_002.yml`

---

## 📚 Related Files

- `format/coontohTS.yml` - Format referensi untuk Test Scenario
- `format/TS_LOG_01_002.yml` - Format referensi untuk Test Cases
- `COMMANDS.md` - Dokumentasi commands
- `README.md` - Dokumentasi utama
