# 📁 Project Folder Structure

## Overview
Project ini memiliki struktur folder yang terorganisir untuk memisahkan source code, templates, dan generated output files.

## 📂 Folder Structure

```
generate-label/
├── 📁 src/                     # Source code
│   ├── 📁 generator/           # Generator services
│   ├── 📁 jira/               # Jira integration
│   └── 📁 utils/              # Utility functions
├── 📁 format/                  # Format reference files & templates
├── 📁 yml-ts/                  # Test Scenario files (generated)
├── 📁 yml-tc/                  # Test Cases files (generated)
├── 📁 node_modules/            # Dependencies
├── 📄 .env                     # Environment configuration
├── 📄 .env.example             # Environment template
├── 📄 package.json             # NPM configuration
└── 📄 README.md                # Main documentation
```

## 📋 Folder Details

### 🔧 **Source Code (`src/`)**
Contains all source code and utilities:

```
src/
├── generator/
│   ├── generateAllTestCasesYaml.js    # TC generator
│   └── generateAllTestScenariosYaml.js # TS generator
├── jira/
│   ├── auth.js                         # Jira authentication
│   ├── getAll.js                       # Get all test cases
│   ├── getAllByFolder.js               # Get by folder
│   └── getStepJira.js                  # Get test steps
├── utils/
│   ├── constans.js                     # Constants
│   ├── generateTestCaseYAML.js         # TC YAML generator
│   ├── generateTestScenario.js         # TS YAML generator
│   ├── generateTSOnly.js               # TS only generator
│   └── groupByLabel.js                 # Label grouping
├── generateByFolder.js                 # Folder-based generator
└── generateCompleteV2.js               # Complete generator
```

### 📝 **Format References (`format/`)**
Template and reference files:

```
format/
├── contohTC.yml                # TC template v1
├── contohTC2.yml               # TC template v2 (current)
├── coontohTS.yml               # TS template (current)
├── generateTS.md               # TS generation guide
├── SERVICE_ARCHITECTURE.md     # Architecture docs
└── TS_LOG_01_002.yml          # Example TS
```

### 📊 **Generated Outputs**

#### **Test Scenarios (`yml-ts/`)**
Generated Test Scenario files from Jira:
```
yml-ts/
├── TS_POJK_CASA_01.yml
├── TS_POJK_CASA_02.yml
├── TS_POJK_CASA_03.yml
└── ... (32 files total)
```
- **Source**: Jira labels
- **Command**: `npm run generate-ts` or `npm run generate-folder`
- **Format**: Test Scenario level (orchestrator)

#### **Test Cases (`yml-tc/`)**
Generated Test Cases files with steps from Jira:
```
yml-tc/
├── TC_POJK_CASA_01_001.yml
├── TC_POJK_CASA_01_002.yml
├── TC_POJK_CASA_02_001.yml
└── ... (65 files total)
```
- **Source**: Jira test cases with steps
- **Command**: `npm run generate-complete` or `npm run generate-folder`
- **Format**: Test Cases with detailed steps

## 🔄 **Generation Flow**

### Single Label Mode
```
Jira Label → Test Scenario (1 file)
          → Test Cases (multiple files)
```

### Folder Mode (Batch)
```
Jira Folder → Multiple Test Scenarios (1 per label)
           → All Test Cases in folder
```

## 📁 **File Naming Conventions**

### Test Scenarios
- Pattern: `TS_{PROJECT}_{MODULE}_{NUMBER}.yml`
- Example: `TS_POJK_CASA_01.yml`
- Location: `yml-ts/`

### Test Cases
- Pattern: `TC_{PROJECT}_{MODULE}_{NUMBER}_{SEQUENCE}.yml`
- Example: `TC_POJK_CASA_01_001.yml`
- Location: `yml-tc/`

## 🚫 **Ignored Folders (.gitignore)**

The following folders are ignored in git:
- `yml-ts/` - Generated Test Scenarios
- `yml-tc/` - Generated Test Cases
- `node_modules/` - Dependencies

**Rationale**: These are generated files that can be recreated from source code and Jira data.

## 💡 **Usage Examples**

### Generate from Jira - Single Label
```bash
# Set label in .env
JIRA_LABELS=TS_POJK_CASA_02

# Generate
npm run generate-complete

# Output:
# - yml-ts/TS_POJK_CASA_02.yml (1 Test Scenario)
# - yml-tc/TC_POJK_CASA_02_*.yml (Multiple Test Cases)
```

### Generate from Jira - Entire Folder
```bash
# Set folder in .env
JIRA_FOLDER_NAME=CASA - Android

# Generate
npm run generate-folder

# Output:
# - yml-ts/TS_POJK_CASA_*.yml (32 Test Scenarios)
# - yml-tc/TC_POJK_CASA_*.yml (65 Test Cases)
```

### Generate Test Scenario Only
```bash
npm run generate-ts

# Output:
# - yml-ts/TS_POJK_CASA_02.yml (1 Test Scenario only)
```

## 🎯 **Best Practices**

1. **Keep source files in git**: Only commit `src/`, `format/`, documentation
2. **Regenerate outputs**: Use commands to recreate `yml-ts/`, `yml-tc/`
3. **Use folder mode for batch**: Prefer `npm run generate-folder` for multiple labels
4. **Update templates**: Modify files in `format/` to change output format
5. **Environment config**: Use `.env` for configuration, never commit `.env` file

## 📊 **Statistics**

| Item | Count | Location |
|------|-------|----------|
| Test Scenarios | 32 | yml-ts/ |
| Test Cases | 65 | yml-tc/ |
| Source Files | 13 | src/ |
| Templates | 6 | format/ |
| NPM Commands | 5 | package.json |

This structure ensures clean separation of concerns and makes the project easy to navigate and maintain! 🚀