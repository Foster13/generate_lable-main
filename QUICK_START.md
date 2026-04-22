# Quick Start

## Instalasi

```bash
npm install
cp .env.example .env
# Edit .env dengan credentials Jira dan set mode generation
```

**Contoh .env:**
```env
JIRA_USERNAME=your_username
JIRA_PASSWORD=your_password

# Single Label Mode
JIRA_LABELS=TS_POJK_CASA_02

# Folder Mode (NEW!)
JIRA_FOLDER_NAME=CASA - Android
```

## Generate

### Single Label (1 Test Scenario)
```bash
npm run generate-complete
```

### Entire Folder (Multiple Test Scenarios) ⭐ NEW!
```bash
npm run generate-folder
```

**Output:**
- `yml-ts/{Multiple}.yml` - Multiple Test Scenarios
- `yml-tc/TC_*.yml` - All Test Cases dalam folder

**Example:** Folder "CASA - Android" → 32 TS + 65 TC files

## Commands Lainnya

```bash
npm run generate        # Shortcut untuk generate-complete
npm run generate-ts     # Generate Test Scenario saja
```

📖 **Penjelasan lengkap semua commands:** Lihat [COMMANDS.md](COMMANDS.md)

## Kustomisasi

### Single Label Mode
Edit `.env`:
```env
JIRA_LABELS=TS_POJK_CASA_02
```

### Folder Mode
Edit `.env`:
```env
JIRA_FOLDER_NAME=CASA - Android
```

### Advanced Configuration
Edit `src/generateCompleteV2.js` atau `src/generateByFolder.js`:

```javascript
generateAllTestScenariosYaml(getAllTC, {
  label: JIRA_LABELS || "outputTestScenario",
  jiraFolderName: "Your Folder",
  tcFilePathAndroid: "../../../components/android/",
  tcFilePathIOS: "../../../components/ios/",
  tags: ["regression"],
});
```

## Examples

### Development (Single Label)
```bash
# .env
JIRA_LABELS=TS_POJK_CASA_02

# Generate
npm run generate

# Output
yml-ts/TS_POJK_CASA_02.yml
yml-tc/TC_POJK_CASA_02_001.yml
yml-tc/TC_POJK_CASA_02_002.yml
```

### Production (Entire Folder)
```bash
# .env  
JIRA_FOLDER_NAME=CASA - Android

# Generate
npm run generate-folder

# Output
yml-ts/TS_POJK_CASA_01.yml
yml-ts/TS_POJK_CASA_02.yml
...
yml-ts/TS_POJK_CASA_32.yml
yml-tc/TC_POJK_CASA_01_001.yml
...
yml-tc/TC_POJK_CASA_32_003.yml
```
