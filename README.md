# Test Generator - Jira to YAML

Generator untuk membuat Test Scenario dan Test Cases dari Jira.

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


## ⚙️ Konfigurasi

### File .env
```env
# Single Label Mode
JIRA_LABELS=TS_POJK_CASA_02

# Folder Mode (NEW!)
JIRA_FOLDER_NAME=CASA - Android
```

**Single Label:** Generate 1 Test Scenario untuk 1 label  
**Folder Mode:** Generate semua Test Scenarios dalam folder (batch)

## 📁 Output Structure

```
project/
├── yml-ts/                    # Test Scenarios
│   ├── TS_POJK_CASA_01.yml
│   ├── TS_POJK_CASA_02.yml
│   └── ...
│
└── yml-tc/                    # Test Cases
    ├── TC_POJK_CASA_01_001.yml
    ├── TC_POJK_CASA_01_002.yml
    └── ...
```

## 📖 Dokumentasi

- **[QUICK_START.md](QUICK_START.md)** - Panduan cepat memulai
- **[COMMANDS.md](COMMANDS.md)** - Daftar lengkap commands
- **[FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md)** - Struktur folder project
- **[CHANGELOG.md](CHANGELOG.md)** - Riwayat perubahan
