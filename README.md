# Test Generator - Jira to YAML

Generator otomatis untuk membuat Test Scenario dan Test Cases dari JIRA dalam format YAML berdasarkan folder.

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone <repository-url>
cd generate-label

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env dengan credentials JIRA dan folder name

# 4. Generate!
npm run generate
```

**📖 Panduan lengkap:** Lihat [TWO_GENERATION_MODES.md](TWO_GENERATION_MODES.md)

---

## 📋 Features

✅ **2 Generation Modes** - Folder-based (all assignees) atau Assignee-only (all folders)  
✅ **Fetch dari JIRA** - Ambil test cases langsung dari JIRA  
✅ **Auto Generate** - Generate Test Scenarios dan Test Cases otomatis  
✅ **Flexible Scope** - By folder atau by assignee  
✅ **Batch Processing** - Generate multiple test cases sekaligus  
✅ **Custom Output** - Output ke folder terpisah per mode  
✅ **Auto Pagination** - Handle large datasets otomatis  
✅ **Rich Logging** - Progress tracking yang detail

---

## 🎯 Usage

### Mode 1: Folder-Based Generation

Generate **ALL test cases** dari **folder tertentu** (semua assignee):

```bash
# Edit .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android  # ← REQUIRED
OUTPUT_FOLDER = profilesettings

# Generate
npm run generate
```

**Output:**
- `profilesettings/yml-ts/` - Test Scenarios dari folder (ALL assignees)
- `profilesettings/yml-tc/` - Test Cases dari folder (ALL assignees)

**Note:** Mode ini **TIDAK menggunakan** `JIRA_ASSIGNEE`

---

### Mode 2: Assignee-Only Generation

Generate **SEMUA test cases** yang di-assign ke user tertentu dari **SEMUA folder** dengan filter **execution status**:

```bash
# Edit .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_ASSIGNEE = your.username                      # ← REQUIRED
JIRA_EXECUTION_STATUS = UNEXECUTED                 # ← Optional (default: UNEXECUTED)
OUTPUT_FOLDER_ASSIGNEE = all-my-tests

# Generate
npm run generate-assignee
```

**Output:**
- `all-my-tests/yml-ts/` - Test Scenarios dari SEMUA folder (UNEXECUTED only)
- `all-my-tests/yml-tc/` - Test Cases dari SEMUA folder (UNEXECUTED only)

**Execution Status Options:**
- `UNEXECUTED` - Belum dieksekusi (default)
- `PASS` - Passed
- `FAIL` - Failed
- `WIP` - Work in progress
- `BLOCKED` - Blocked

**Note:** Mode ini **TIDAK menggunakan** `JIRA_FOLDER_NAME`

**📖 Detail lengkap:** Lihat [TWO_GENERATION_MODES.md](TWO_GENERATION_MODES.md)

---

## ⚙️ Configuration

### Environment Variables (.env)

```env
# JIRA Credentials
JIRA_USERNAME = your_username
JIRA_PASSWORD = your_password
JIRA_BASE_URL = https://jira.bni.co.id

# JIRA Query Parameters (sesuaikan dengan JIRA Anda)
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android

# REQUIRED: Assignee Filter
JIRA_ASSIGNEE = your.username                    # ← WAJIB DIISI!

# Output Configuration (optional)
OUTPUT_FOLDER = profilesettings
```

### Parameter yang Perlu Diubah:

| Parameter | Folder-Based | Assignee-Only | Keterangan |
|-----------|--------------|---------------|------------|
| `JIRA_VERSION_NAME` | ✅ Required | ✅ Required | Version dari JIRA |
| `JIRA_CYCLE_NAME` | ✅ Required | ✅ Required | Cycle dari JIRA |
| `JIRA_FOLDER_NAME` | ✅ Required | ❌ Not used | Folder name di JIRA |
| `JIRA_ASSIGNEE` | ❌ Not used | ✅ Required | JIRA username |
| `JIRA_EXECUTION_STATUS` | ❌ Not used | ❌ Optional | Execution status (default: UNEXECUTED) |
| `OUTPUT_FOLDER` | ❌ Optional | ❌ Not used | Output folder (folder-based) |
| `OUTPUT_FOLDER_ASSIGNEE` | ❌ Not used | ❌ Optional | Output folder (assignee-only) |

---

## 📊 Commands

| Command | Description | Mode |
|---------|-------------|------|
| `npm run generate` | Generate from specific folder + assignee | Folder-Based |
| `npm run generate-folder` | Alias untuk `npm run generate` | Folder-Based |
| `npm run generate-assignee` | Generate from ALL folders by assignee | Assignee-Only |

---

## 📁 Project Structure

```
generate-label/
├── src/                        # Source code
│   ├── generator/              # Generator services
│   │   ├── generateAllTestCasesYaml.js
│   │   └── generateAllTestScenariosYaml.js
│   ├── jira/                   # JIRA integration
│   │   ├── auth.js
│   │   ├── getAllByFolder.js
│   │   └── getStepJira.js
│   ├── utils/                  # Utilities
│   │   ├── constans.js
│   │   ├── generateTestCaseYAML.js
│   │   ├── generateTestScenario.js
│   │   └── groupByLabel.js
│   └── generateByFolder.js     # Main generator
│
├── format/                     # Templates & references
│   ├── contohTC2.yml           # Test Case template
│   └── coontohTS.yml           # Test Scenario template
│
├── yml-ts/                     # Generated Test Scenarios (gitignored)
├── yml-tc/                     # Generated Test Cases (gitignored)
├── profilesettings/            # Custom output folder (gitignored)
│
├── .env                        # Environment config (gitignored)
├── .env.example                # Environment template
├── package.json                # NPM configuration
├── README.md                   # This file
└── TWO_GENERATION_MODES.md     # Two modes documentation
```

---

## 🔄 Workflow

### Workflow 1: Generate Specific Feature (Folder-Based)

```bash
# 1. Edit .env - Set folder only
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android  # ← REQUIRED
OUTPUT_FOLDER = profilesettings

# 2. Generate
npm run generate

# 3. Done! All test cases from folder in profilesettings/
```

---

### Workflow 2: Generate UNEXECUTED Test Cases for Assignee (Assignee-Only)

```bash
# 1. Edit .env - Set assignee + execution status
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_ASSIGNEE = your.username                      # ← REQUIRED
JIRA_EXECUTION_STATUS = UNEXECUTED                 # ← Optional (default)
OUTPUT_FOLDER_ASSIGNEE = all-my-tests

# 2. Generate
npm run generate-assignee

# 3. Done! All UNEXECUTED test cases for assignee in all-my-tests/
```

---

### Contoh untuk Berbagai Skenario:

**Skenario 1: Profile & Settings Folder (Folder-Based)**
```env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android
OUTPUT_FOLDER = profilesettings

# Run: npm run generate
# Result: ALL test cases from folder (all assignees)
```

**Skenario 2: All UNEXECUTED Test Cases for John (Assignee-Only)**
```env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_ASSIGNEE = john.doe
JIRA_EXECUTION_STATUS = UNEXECUTED
OUTPUT_FOLDER_ASSIGNEE = john-unexecuted

# Run: npm run generate-assignee
# Result: ALL UNEXECUTED test cases assigned to john.doe (all folders)
```

**Skenario 3: All FAILED Test Cases for Jane (Assignee-Only)**
```env
JIRA_VERSION_NAME = Sprint 10
JIRA_CYCLE_NAME = Regression Test
JIRA_ASSIGNEE = jane.smith
JIRA_EXECUTION_STATUS = FAIL
OUTPUT_FOLDER_ASSIGNEE = jane-failed

# Run: npm run generate-assignee
# Result: ALL FAILED test cases assigned to jane.smith
```

**Skenario 4: Transfer Feature (Folder-Based)**
```env
JIRA_VERSION_NAME = Sprint 10
JIRA_CYCLE_NAME = Regression Test
JIRA_FOLDER_NAME = Transfer - Android
OUTPUT_FOLDER = transfer

# Run: npm run generate
# Result: ALL test cases from Transfer folder
```

---

## 📖 Documentation

- **[TWO_GENERATION_MODES.md](TWO_GENERATION_MODES.md)** - Panduan lengkap 2 mode: Folder-Based vs Assignee-Only

---

## ❌ Troubleshooting

### Error: "JIRA_FOLDER_NAME is not set"
```bash
# This error occurs when using folder-based mode
# Solution: Set JIRA_FOLDER_NAME in .env
JIRA_FOLDER_NAME = Profile and Settings - Android

# Or use assignee-only mode instead:
npm run generate-assignee
```

### Error: "JIRA_ASSIGNEE is not set"
```bash
# This error occurs when using assignee-only mode
# Solution: Set JIRA_ASSIGNEE in .env
JIRA_ASSIGNEE = your.username

# Or use folder-based mode instead:
npm run generate
```

### Error: "No test cases found"
```env
# For folder-based mode:
# Check: Folder name exact match (case-sensitive!)
JIRA_FOLDER_NAME = Profile and Settings - Android

# For assignee-only mode:
# Check: Assignee username is correct
JIRA_ASSIGNEE = your.username
```

### Error: Koneksi JIRA gagal
```bash
# Cek koneksi internet
ping jira.bni.co.id

# Cek credentials di .env
```

---

## 🎯 Examples

### Example 1: Profile & Settings (Folder-Based)
```bash
# .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android
OUTPUT_FOLDER = profilesettings

# Generate
npm run generate

# Result
✅ ALL test cases from folder (all assignees)
✅ Test Scenarios → profilesettings/yml-ts/
✅ Test Cases → profilesettings/yml-tc/
```

### Example 2: All UNEXECUTED Test Cases for John (Assignee-Only)
```bash
# .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_ASSIGNEE = john.doe
JIRA_EXECUTION_STATUS = UNEXECUTED
OUTPUT_FOLDER_ASSIGNEE = john-unexecuted

# Generate
npm run generate-assignee

# Result
✅ All UNEXECUTED test cases assigned to john.doe from ALL folders
✅ Test Scenarios → john-unexecuted/yml-ts/
✅ Test Cases → john-unexecuted/yml-tc/
```

### Example 3: All FAILED Test Cases for Jane (Assignee-Only)
```bash
# .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_ASSIGNEE = jane.smith
JIRA_EXECUTION_STATUS = FAIL
OUTPUT_FOLDER_ASSIGNEE = jane-failed

# Generate
npm run generate-assignee

# Result
✅ All FAILED test cases assigned to jane.smith
✅ Test Scenarios → jane-failed/yml-ts/
✅ Test Cases → jane-failed/yml-tc/
```

### Example 4: Transfer Feature (Folder-Based)
```bash
# .env
JIRA_VERSION_NAME = Sprint 10
JIRA_CYCLE_NAME = Regression Test
JIRA_FOLDER_NAME = Transfer - Android
OUTPUT_FOLDER = transfer

# Generate
npm run generate

# Result
✅ ALL test cases from Transfer folder
✅ Test Scenarios → transfer/yml-ts/
✅ Test Cases → transfer/yml-tc/
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License.

---

## 👥 Authors

- **Muhamad Irkhamsyah** - Initial work

---

## 🙏 Acknowledgments

- JIRA API for test case management
- Node.js community for excellent tools
- Team members for feedback and testing

---

**Version:** 3.2.0  
**Last Updated:** May 2026

**Need help?** Lihat [TWO_GENERATION_MODES.md](TWO_GENERATION_MODES.md) untuk panduan lengkap.
