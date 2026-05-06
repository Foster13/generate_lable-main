# Test Generator - Jira to YAML

Generator otomatis untuk membuat Test Scenario dan Test Cases dari JIRA dalam format YAML.

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone <repository-url>
cd generate-label

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env dengan credentials JIRA Anda

# 4. Generate!
npm run generate-folder
```

**📖 Panduan lengkap:** Lihat [QUICK_START.md](QUICK_START.md)

---

## 📋 Features

✅ **Fetch dari JIRA** - Ambil test cases langsung dari JIRA  
✅ **Auto Generate** - Generate Test Scenarios dan Test Cases otomatis  
✅ **Batch Processing** - Generate entire folder sekaligus  
✅ **Custom Output** - Output ke folder terpisah per fitur  
✅ **Pagination Support** - Handle large folders otomatis  
✅ **Rich Logging** - Progress tracking yang detail

---

## 🎯 Usage

### Mode 1: Single Label (Development)

Generate 1 label spesifik untuk development:

```bash
# .env
JIRA_LABELS = TS_POJK_CASA_01

# Command
npm run generate
```

**Output:**
- `yml-ts/TS_POJK_CASA_01.yml` - 1 Test Scenario
- `yml-tc/TC_POJK_CASA_01_*.yml` - Test Cases untuk label tersebut

---

### Mode 2: Entire Folder (Production) ⭐ RECOMMENDED

Generate semua labels dalam 1 folder untuk production:

```bash
# .env
JIRA_FOLDER_NAME = CASA - Android

# Command
npm run generate-folder
```

**Output:**
- `yml-ts/TS_POJK_CASA_*.yml` - Multiple Test Scenarios (1 per label)
- `yml-tc/TC_POJK_CASA_*.yml` - All Test Cases dalam folder

**Example:** Folder "CASA - Android" → 32 Test Scenarios + 65 Test Cases

---

### Mode 3: Custom Output Folder

Generate ke folder terpisah per fitur:

```bash
# .env
JIRA_FOLDER_NAME = Home - Android
OUTPUT_FOLDER = pojk-home

# Command
npm run generate-folder
```

**Output:**
- `pojk-home/yml-ts/TS_POJK_HOME_*.yml` - Test Scenarios
- `pojk-home/yml-tc/TC_POJK_HOME_*.yml` - Test Cases

---

## 📊 Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm run generate` | Generate 1 label | Development |
| `npm run generate-folder` | Generate entire folder | Production |
| `npm run generate-ts` | Generate TS only | Quick update |

**📖 Dokumentasi lengkap:** Lihat [COMMANDS.md](COMMANDS.md)

---

## ⚙️ Configuration

### Environment Variables (.env)

```env
# JIRA Credentials
JIRA_USERNAME = your_username
JIRA_PASSWORD = your_password
JIRA_BASE_URL = "https://jira.bni.co.id"
JIRA_VERSION_NAME = Sq Fraud Audit
JIRA_CYCLE_NAME = Acceptance Test

# Generation Mode
JIRA_LABELS = TS_POJK_CASA_01           # Single label mode
JIRA_FOLDER_NAME = CASA - Android       # Folder mode

# Optional: Custom output folder
OUTPUT_FOLDER = pojk-home               # Output to pojk-home/yml-ts and pojk-home/yml-tc
```

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
│   │   └── groupByLabel.js
│   ├── generateByFolder.js     # Folder-based generator
│   └── generateCompleteV2.js   # Single label generator
│
├── format/                     # Templates & references
│   ├── contohTC2.yml           # Test Case template
│   └── coontohTS.yml           # Test Scenario template
│
├── yml-ts/                     # Generated Test Scenarios (gitignored)
├── yml-tc/                     # Generated Test Cases (gitignored)
├── pojk-home/                  # Custom output folder (gitignored)
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

### Development Workflow

```bash
# 1. Set single label
JIRA_LABELS=TS_POJK_CASA_02

# 2. Generate
npm run generate

# 3. Test & iterate
```

### Production Workflow

```bash
# 1. Set folder
JIRA_FOLDER_NAME=CASA - Android

# 2. Generate all
npm run generate-folder

# 3. Deploy
```

### Multi-Feature Workflow

```bash
# Generate Home feature
JIRA_FOLDER_NAME=Home - Android
OUTPUT_FOLDER=pojk-home
npm run generate-folder

# Generate Transfer feature
JIRA_FOLDER_NAME=Transfer - Android
OUTPUT_FOLDER=pojk-transfer
npm run generate-folder

# Generate Login feature
JIRA_FOLDER_NAME=Login - Android
OUTPUT_FOLDER=pojk-login
npm run generate-folder
```

---

## 📖 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Panduan lengkap dari clone sampai generate
- **[COMMANDS.md](COMMANDS.md)** - Referensi lengkap semua commands
- **[POJK_HOME_GENERATION.md](POJK_HOME_GENERATION.md)** - Contoh penggunaan OUTPUT_FOLDER

---

## ❌ Troubleshooting

### Error: "JIRA_USERNAME is not set"
```bash
cp .env.example .env
# Edit .env dan isi credentials
```

### Error: "No test cases found"
```env
# Pastikan folder name exact match dengan JIRA
JIRA_FOLDER_NAME = CASA - Android
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

### Example 1: Generate CASA Module
```bash
# .env
JIRA_FOLDER_NAME = CASA - Android

# Generate
npm run generate-folder

# Result
✅ 32 Test Scenarios
✅ 65 Test Cases
```

### Example 2: Generate Home Feature
```bash
# .env
JIRA_FOLDER_NAME = Home - Android
OUTPUT_FOLDER = pojk-home

# Generate
npm run generate-folder

# Result
✅ pojk-home/yml-ts/ (14 files)
✅ pojk-home/yml-tc/ (31 files)
```

### Example 3: Generate Single Label
```bash
# .env
JIRA_LABELS = TS_POJK_CASA_01

# Generate
npm run generate

# Result
✅ yml-ts/TS_POJK_CASA_01.yml
✅ yml-tc/TC_POJK_CASA_01_*.yml
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

**Version:** 3.1.0  
**Last Updated:** May 2026

**Need help?** Check [QUICK_START.md](QUICK_START.md) or [COMMANDS.md](COMMANDS.md)
