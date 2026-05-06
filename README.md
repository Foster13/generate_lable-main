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

**📖 Panduan lengkap:** Lihat [QUICK_START.md](QUICK_START.md)

---

## 📋 Features

✅ **Fetch dari JIRA** - Ambil test cases langsung dari JIRA folder  
✅ **Auto Generate** - Generate Test Scenarios dan Test Cases otomatis  
✅ **Batch Processing** - Generate entire folder sekaligus  
✅ **Custom Output** - Output ke folder terpisah per fitur  
✅ **Auto Pagination** - Handle large folders otomatis  
✅ **Rich Logging** - Progress tracking yang detail

---

## 🎯 Usage

### Generate dari JIRA Folder

```bash
# Edit .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android
OUTPUT_FOLDER = profilesettings

# Generate
npm run generate
```

**Output:**
- `profilesettings/yml-ts/` - Test Scenarios
- `profilesettings/yml-tc/` - Test Cases

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

# Output Configuration (optional)
OUTPUT_FOLDER = profilesettings
```

### Parameter yang Perlu Diubah:

| Parameter | Keterangan | Contoh |
|-----------|------------|--------|
| `JIRA_VERSION_NAME` | Version dari JIRA | `Regression R5.2`, `Sprint 10` |
| `JIRA_CYCLE_NAME` | Cycle dari JIRA | `Feature R2`, `Acceptance Test` |
| `JIRA_FOLDER_NAME` | Folder name di JIRA (exact match!) | `Profile and Settings - Android` |
| `OUTPUT_FOLDER` | Custom output folder (optional) | `profilesettings`, `transfer` |

---

## 📊 Commands

| Command | Description |
|---------|-------------|
| `npm run generate` | Generate Test Scenarios & Test Cases dari JIRA folder |
| `npm run generate-folder` | Alias untuk `npm run generate` |

**📖 Dokumentasi lengkap:** Lihat [COMMANDS.md](COMMANDS.md)

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
├── QUICK_START.md              # Quick start guide
└── COMMANDS.md                 # Commands reference
```

---

## 🔄 Workflow

### Generate untuk Fitur Baru

```bash
# 1. Edit .env - Ubah 4 parameter
JIRA_VERSION_NAME = [Your Version]
JIRA_CYCLE_NAME = [Your Cycle]
JIRA_FOLDER_NAME = [Your Folder]
OUTPUT_FOLDER = [output-folder]

# 2. Generate
npm run generate

# 3. Done! Files ready in [output-folder]/yml-ts/ and [output-folder]/yml-tc/
```

### Contoh untuk Berbagai Fitur:

**Profile & Settings:**
```env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android
OUTPUT_FOLDER = profilesettings
```

**Transfer:**
```env
JIRA_VERSION_NAME = Sprint 10
JIRA_CYCLE_NAME = Regression Test
JIRA_FOLDER_NAME = Transfer - Android
OUTPUT_FOLDER = transfer
```

**Home (default output):**
```env
JIRA_VERSION_NAME = Sq Fraud Audit
JIRA_CYCLE_NAME = Acceptance Test
JIRA_FOLDER_NAME = Home - Android
OUTPUT_FOLDER =
```

---

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Panduan lengkap dari clone sampai generate
- **[COMMANDS.md](COMMANDS.md)** - Referensi lengkap commands
- **[PROFILE_SETTINGS_GENERATION.md](PROFILE_SETTINGS_GENERATION.md)** - Contoh Profile & Settings
- **[POJK_HOME_GENERATION.md](POJK_HOME_GENERATION.md)** - Contoh Home feature

---

## ❌ Troubleshooting

### Error: "JIRA_FOLDER_NAME is not set"
```bash
# Edit .env dan set JIRA_FOLDER_NAME
JIRA_FOLDER_NAME = Profile and Settings - Android
```

### Error: "No test cases found"
```env
# Pastikan folder name exact match dengan JIRA (case-sensitive!)
JIRA_FOLDER_NAME = Profile and Settings - Android
```

### Error: Koneksi JIRA gagal
```bash
# Cek koneksi internet
ping jira.bni.co.id

# Cek credentials di .env
```

**📖 Troubleshooting lengkap:** Lihat [QUICK_START.md](QUICK_START.md#-troubleshooting)

---

## 🎯 Examples

### Example 1: Profile & Settings
```bash
# .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android
OUTPUT_FOLDER = profilesettings

# Generate
npm run generate

# Result
✅ 11 Test Scenarios → profilesettings/yml-ts/
✅ 16 Test Cases → profilesettings/yml-tc/
```

### Example 2: Transfer Feature
```bash
# .env
JIRA_VERSION_NAME = Sprint 10
JIRA_CYCLE_NAME = Regression Test
JIRA_FOLDER_NAME = Transfer - Android
OUTPUT_FOLDER = transfer

# Generate
npm run generate

# Result
✅ Test Scenarios → transfer/yml-ts/
✅ Test Cases → transfer/yml-tc/
```

### Example 3: Default Output
```bash
# .env
JIRA_VERSION_NAME = Sq Fraud Audit
JIRA_CYCLE_NAME = Acceptance Test
JIRA_FOLDER_NAME = CASA - Android
OUTPUT_FOLDER =

# Generate
npm run generate

# Result
✅ Test Scenarios → yml-ts/
✅ Test Cases → yml-tc/
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

**Need help?** Check [QUICK_START.md](QUICK_START.md) or [COMMANDS.md](COMMANDS.md)
