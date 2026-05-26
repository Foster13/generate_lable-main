# Two Generation Modes - Folder-Based vs Assignee-Only

## Overview

Generator sekarang memiliki **2 script terpisah** dengan 2 mode berbeda:

1. **Folder-Based Mode** (`npm run generate`) - Generate dari folder tertentu + assignee
2. **Assignee-Only Mode** (`npm run generate-assignee`) - Generate dari SEMUA folder by assignee

---

## Mode 1: Folder-Based Generation

Generate **ALL test cases** dari **folder tertentu** (semua assignee).

### Command
```bash
npm run generate
# atau
npm run generate-folder
```

### Configuration (.env)

```env
# JIRA Credentials
JIRA_USERNAME = Muhamad.Irkhamsyah
JIRA_PASSWORD = bniMM1234/
JIRA_BASE_URL = "https://jira.bni.co.id"

# JIRA Query Parameters
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2

# REQUIRED for folder-based
JIRA_FOLDER_NAME = Profile and Settings - Android

# Output
OUTPUT_FOLDER = profilesettings
```

**Note:** `JIRA_ASSIGNEE` **TIDAK digunakan** untuk mode ini!

### ZQL Query
```sql
fixVersion = "Regression R5.2" 
AND cycleName in ("Feature R2") 
AND folderName in ("Profile and Settings - Android")
```

**Note:** Tidak ada filter `assignee`!

### Output
```
profilesettings/
├── yml-ts/  ← Test Scenarios (ALL assignees)
└── yml-tc/  ← Test Cases (ALL assignees)
```

### Use Case
- ✅ Generate semua test cases dalam folder tertentu
- ✅ Tidak peduli siapa assignee-nya
- ✅ Fokus pada folder/feature tertentu
- ✅ Organized output per feature

---

## Mode 2: Assignee-Only Generation

Generate **SEMUA test cases** yang di-assign ke user dari **SEMUA folder** dengan filter **execution status**.

### Command
```bash
npm run generate-assignee
```

### Configuration (.env)

```env
# JIRA Credentials
JIRA_USERNAME = Muhamad.Irkhamsyah
JIRA_PASSWORD = bniMM1234/
JIRA_BASE_URL = "https://jira.bni.co.id"

# JIRA Query Parameters
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2

# REQUIRED for assignee-only
JIRA_ASSIGNEE = Muhamad.Irkhamsyah

# Execution status filter (default: UNEXECUTED)
JIRA_EXECUTION_STATUS = UNEXECUTED

# Output
OUTPUT_FOLDER_ASSIGNEE = all-my-tests
```

**Note:** `JIRA_FOLDER_NAME` **TIDAK digunakan** untuk mode ini!

### ZQL Query
```sql
fixVersion = "Regression R5.2" 
AND cycleName in ("Feature R2") 
AND assignee = "Muhamad.Irkhamsyah"
AND executionStatus = "UNEXECUTED"
```
**Note:** Tidak ada filter `folderName`!

### Output
```
all-my-tests/
├── yml-ts/  ← Test Scenarios dari SEMUA folder (UNEXECUTED only)
└── yml-tc/  ← Test Cases dari SEMUA folder (UNEXECUTED only)
```

### Execution Status Options
- `UNEXECUTED` - Test cases yang belum dieksekusi (default)
- `PASS` - Test cases yang passed
- `FAIL` - Test cases yang failed
- `WIP` - Test cases yang work in progress
- `BLOCKED` - Test cases yang blocked

### Use Case
- ✅ Generate UNEXECUTED test cases untuk assignee tertentu
- ✅ Sprint planning - lihat pending test cases
- ✅ Overview lengkap dari pending work
- ✅ Batch processing unexecuted test cases

---

## Comparison Table

| Feature | Folder-Based | Assignee-Only |
|---------|--------------|---------------|
| **Command** | `npm run generate` | `npm run generate-assignee` |
| **Script** | `src/generateByFolder.js` | `src/generateByAssignee.js` |
| **JIRA_FOLDER_NAME** | ✅ Required | ❌ Not used |
| **JIRA_ASSIGNEE** | ❌ Not used | ✅ Required |
| **JIRA_EXECUTION_STATUS** | ❌ Not used | ✅ Used (default: UNEXECUTED) |
| **OUTPUT_FOLDER** | ✅ Used | ❌ Not used |
| **OUTPUT_FOLDER_ASSIGNEE** | ❌ Not used | ✅ Used |
| **Scope** | Single folder, all assignees | All folders, single assignee |
| **ZQL Filter** | folder only | assignee + executionStatus |

---

## Examples

### Example 1: Profile & Settings (Folder-Based)

```bash
# Edit .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_FOLDER_NAME = Profile and Settings - Android
OUTPUT_FOLDER = profilesettings

# Run
npm run generate

# Result
✅ ALL test cases from "Profile and Settings - Android" folder (all assignees)
📁 profilesettings/yml-ts/ - Test Scenarios
📁 profilesettings/yml-tc/ - Test Cases
```

---

### Example 2: All My UNEXECUTED Test Cases (Assignee-Only)

```bash
# Edit .env
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
JIRA_ASSIGNEE = Muhamad.Irkhamsyah
JIRA_EXECUTION_STATUS = UNEXECUTED
OUTPUT_FOLDER_ASSIGNEE = all-my-tests

# Run
npm run generate-assignee

# Result
✅ ALL UNEXECUTED test cases assigned to Muhamad.Irkhamsyah from ALL folders
📁 all-my-tests/yml-ts/ - Test Scenarios
📁 all-my-tests/yml-tc/ - Test Cases
```

---

### Example 3: Multiple Features (Folder-Based)

```bash
# Feature 1: Profile
JIRA_FOLDER_NAME=Profile and Settings - Android
OUTPUT_FOLDER=profilesettings
npm run generate

# Feature 2: Transfer
JIRA_FOLDER_NAME=Transfer - Android
OUTPUT_FOLDER=transfer
npm run generate

# Feature 3: Home
JIRA_FOLDER_NAME=Home - Android
OUTPUT_FOLDER=home
npm run generate

# Result
✅ profilesettings/ - Profile test cases
✅ transfer/ - Transfer test cases
✅ home/ - Home test cases
```

---

### Example 4: Sprint Review (Assignee-Only)

```bash
# Feature 1: Profile
JIRA_FOLDER_NAME=Profile and Settings - Android
OUTPUT_FOLDER=profilesettings
npm run generate

# Feature 2: Transfer
JIRA_FOLDER_NAME=Transfer - Android
OUTPUT_FOLDER=transfer
npm run generate

# Feature 3: Home
JIRA_FOLDER_NAME=Home - Android
OUTPUT_FOLDER=home
npm run generate

# Result
✅ profilesettings/ - Profile test cases (all assignees)
✅ transfer/ - Transfer test cases (all assignees)
✅ home/ - Home test cases (all assignees)
```

---

### Example 5: UNEXECUTED Test Cases for John (Assignee-Only)

```bash
# Get all UNEXECUTED test cases for john.doe
JIRA_VERSION_NAME = Sprint 10
JIRA_CYCLE_NAME = Regression Test
JIRA_ASSIGNEE = john.doe
JIRA_EXECUTION_STATUS = UNEXECUTED
OUTPUT_FOLDER_ASSIGNEE = john-unexecuted

npm run generate-assignee

# Result
✅ john-unexecuted/ - All UNEXECUTED test cases for john.doe
```

---

### Example 6: FAILED Test Cases for Jane (Assignee-Only)

```bash
# Get all FAILED test cases for jane.smith
JIRA_VERSION_NAME = Sprint 10
JIRA_CYCLE_NAME = Regression Test
JIRA_ASSIGNEE = jane.smith
JIRA_EXECUTION_STATUS = FAIL
OUTPUT_FOLDER_ASSIGNEE = jane-failed

npm run generate-assignee

# Result
✅ jane-failed/ - All FAILED test cases for jane.smith
```

---

## When to Use Each Mode

### Use Folder-Based Mode When:
- ✅ Want to generate ALL test cases from specific folder
- ✅ Don't care about assignee
- ✅ Need organized output per feature/folder
- ✅ Working on specific feature regardless of who's assigned

### Use Assignee-Only Mode When:
- ✅ Generate UNEXECUTED test cases untuk assignee tertentu
- ✅ Sprint planning - lihat pending test cases
- ✅ Want to see all unexecuted assignments for specific person
- ✅ Need overview of pending work
- ✅ Batch processing unexecuted test cases

---

## Technical Details

### Folder-Based Mode

**File:** `src/generateByFolder.js`

**JIRA API:** `src/jira/getAllByFolder.js`

**Query:**
```javascript
const zqlQuery = `fixVersion = "${version}" AND cycleName in ("${cycle}") AND folderName in ("${folder}")`;
```

**Validation:**
- ✅ `JIRA_FOLDER_NAME` must be set
- ❌ `JIRA_ASSIGNEE` not used

---

### Assignee-Only Mode

**File:** `src/generateByAssignee.js`

**JIRA API:** `src/jira/getAllByAssignee.js`

**Query:**
```javascript
const zqlQuery = `fixVersion = "${version}" AND cycleName in ("${cycle}") AND assignee = "${assignee}" AND executionStatus = "${executionStatus}"`;
```

**Validation:**
- ✅ `JIRA_ASSIGNEE` must be set
- ✅ `JIRA_EXECUTION_STATUS` defaults to "UNEXECUTED" if not set
- ❌ `JIRA_FOLDER_NAME` not used

---

## Environment Variables

### Shared Variables (Both Modes)
```env
JIRA_USERNAME = your_username
JIRA_PASSWORD = your_password
JIRA_BASE_URL = https://jira.bni.co.id
JIRA_VERSION_NAME = Regression R5.2
JIRA_CYCLE_NAME = Feature R2
```

### Folder-Based Specific
```env
JIRA_FOLDER_NAME = Profile and Settings - Android  # ← REQUIRED
OUTPUT_FOLDER = profilesettings                    # ← Optional
```

### Assignee-Only Specific
```env
JIRA_ASSIGNEE = your.username                      # ← REQUIRED
JIRA_EXECUTION_STATUS = UNEXECUTED                 # ← Optional (default: UNEXECUTED)
OUTPUT_FOLDER_ASSIGNEE = all-my-tests              # ← Optional
```

---

## Troubleshooting

### Folder-Based Mode

**Error: "JIRA_FOLDER_NAME is not set"**
```bash
# Solution: Set JIRA_FOLDER_NAME in .env
JIRA_FOLDER_NAME = Profile and Settings - Android
```

**Error: "No test cases found"**
```bash
# Check:
1. Folder name is correct (case-sensitive!)
2. Folder has test cases
3. Version and Cycle are correct
```

---

### Assignee-Only Mode

**Error: "JIRA_ASSIGNEE is not set"**
```bash
# Solution: Set JIRA_ASSIGNEE in .env
JIRA_ASSIGNEE = your.username
```

**Error: "No test cases found"**
```bash
# Check:
1. Assignee username is correct
2. You have test cases assigned to you
3. Execution status is correct (default: UNEXECUTED)
4. Version and Cycle are correct
```

---

## Tips

1. **Daily Work:** Use Folder-Based mode for specific feature (all assignees)
2. **Sprint Planning:** Use Assignee-Only mode with UNEXECUTED status
3. **Bug Fixing:** Use Assignee-Only mode with FAIL status
4. **Multiple Features:** Run Folder-Based mode multiple times with different folders
5. **Team Overview:** Use Assignee-Only mode for each team member

---

## Version History

- **v3.2.0** - Added 2 separate generation modes
- **v3.1.0** - Assignee filter required
- **v3.0.0** - Folder-based generation only

---

**Last Updated:** May 2026
