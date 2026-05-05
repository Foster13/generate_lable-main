# Label Update Summary

## 📋 Task Completed

✅ **Generate ulang TC files dari Jira** → `yml-tc/` folder  
✅ **Copy label dari `yml-tc` ke `Android` folder**  
✅ **Commands di folder Android tetap dipertahankan**

## 🔄 Process Flow

```
1. Generate TC from Jira
   └─> yml-tc/ (65 files with correct labels from Jira)

2. Copy Labels
   └─> Android/ (update labels, keep commands)
```

## 📊 Results

### Files Updated in Android Folder

| Range | Count | Status |
|-------|-------|--------|
| TC_POJK_CASA_01 to TC_POJK_CASA_20 | 36 files | ✅ Updated |
| TC_POJK_CASA_21 to TC_POJK_CASA_32 | 29 files | ⚠️ Not found in Android folder |

**Total Updated:** 36 files  
**Total Skipped:** 29 files (not exist in Android folder)

### Updated Files List

```
✅ TC_POJK_CASA_01_001.yml (12 labels)
✅ TC_POJK_CASA_01_002.yml (12 labels)
✅ TC_POJK_CASA_02_001.yml (12 labels)
✅ TC_POJK_CASA_02_002.yml (6 labels)
✅ TC_POJK_CASA_03_001.yml (12 labels)
✅ TC_POJK_CASA_03_002.yml (26 labels)
✅ TC_POJK_CASA_04_001.yml (18 labels)
✅ TC_POJK_CASA_05_001.yml (12 labels)
✅ TC_POJK_CASA_05_002.yml (6 labels)
✅ TC_POJK_CASA_06_001.yml (12 labels)
✅ TC_POJK_CASA_06_002.yml (6 labels)
✅ TC_POJK_CASA_07_001.yml (12 labels)
✅ TC_POJK_CASA_07_002.yml (26 labels)
✅ TC_POJK_CASA_08_001.yml (18 labels)
✅ TC_POJK_CASA_09_001.yml (12 labels)
✅ TC_POJK_CASA_09_002.yml (6 labels)
✅ TC_POJK_CASA_10_001.yml (12 labels)
✅ TC_POJK_CASA_10_002.yml (6 labels)
✅ TC_POJK_CASA_11_001.yml (12 labels)
✅ TC_POJK_CASA_11_002.yml (26 labels)
✅ TC_POJK_CASA_12_001.yml (18 labels)
✅ TC_POJK_CASA_13_001.yml (12 labels)
✅ TC_POJK_CASA_13_002.yml (6 labels)
✅ TC_POJK_CASA_14_001.yml (12 labels)
✅ TC_POJK_CASA_14_002.yml (6 labels)
✅ TC_POJK_CASA_15_001.yml (12 labels)
✅ TC_POJK_CASA_15_002.yml (26 labels)
✅ TC_POJK_CASA_16_001.yml (18 labels)
✅ TC_POJK_CASA_17_001.yml (12 labels)
✅ TC_POJK_CASA_17_002.yml (6 labels)
✅ TC_POJK_CASA_18_001.yml (12 labels)
✅ TC_POJK_CASA_18_002.yml (6 labels)
✅ TC_POJK_CASA_19_001.yml (12 labels)
✅ TC_POJK_CASA_19_002.yml (26 labels)
✅ TC_POJK_CASA_19_003.yml (8 labels)
✅ TC_POJK_CASA_20_001.yml (18 labels)
```

### Skipped Files (Not in Android Folder)

```
⚠️ TC_POJK_CASA_21_001.yml
⚠️ TC_POJK_CASA_21_002.yml
⚠️ TC_POJK_CASA_22_001.yml
⚠️ TC_POJK_CASA_22_002.yml
⚠️ TC_POJK_CASA_23_001.yml
⚠️ TC_POJK_CASA_23_002.yml
⚠️ TC_POJK_CASA_23_003.yml
⚠️ TC_POJK_CASA_24_001.yml
⚠️ TC_POJK_CASA_25_001.yml
⚠️ TC_POJK_CASA_25_002.yml
⚠️ TC_POJK_CASA_26_001.yml
⚠️ TC_POJK_CASA_26_002.yml
⚠️ TC_POJK_CASA_27_001.yml
⚠️ TC_POJK_CASA_27_002.yml
⚠️ TC_POJK_CASA_27_003.yml
⚠️ TC_POJK_CASA_28_001.yml
⚠️ TC_POJK_CASA_29_001.yml
⚠️ TC_POJK_CASA_29_002.yml
⚠️ TC_POJK_CASA_29_003.yml
⚠️ TC_POJK_CASA_29_004.yml
⚠️ TC_POJK_CASA_30_001.yml
⚠️ TC_POJK_CASA_30_002.yml
⚠️ TC_POJK_CASA_30_003.yml
⚠️ TC_POJK_CASA_31_001.yml
⚠️ TC_POJK_CASA_31_002.yml
⚠️ TC_POJK_CASA_31_003.yml
⚠️ TC_POJK_CASA_32_001.yml
⚠️ TC_POJK_CASA_32_002.yml
⚠️ TC_POJK_CASA_32_003.yml
```

## ✅ Verification

### Before Update (Android folder)
- ❌ Labels might be incorrect or outdated
- ✅ Commands already filled and correct

### After Update (Android folder)
- ✅ Labels updated from Jira (correct and current)
- ✅ Commands preserved (not modified)

### Example: TC_POJK_CASA_01_001.yml

**Label Updated:**
```yaml
label: 01 - Pengguna membuka aplikasi Wondr
```

**Commands Preserved:**
```yaml
commands:
  - launchApp: ${APP_ID}
```

## 📁 Folder Structure

```
project/
├── yml-tc/                    # Source (labels from Jira)
│   ├── TC_POJK_CASA_01_001.yml
│   ├── TC_POJK_CASA_01_002.yml
│   └── ... (65 files)
│
└── Android/                   # Target (labels updated, commands kept)
    ├── TC_POJK_CASA_01_001.yml ✅ Updated
    ├── TC_POJK_CASA_01_002.yml ✅ Updated
    └── ... (36 files updated)
```

## 🎯 What Was Done

1. **Generated fresh TC files from Jira**
   - Command: `npm run generate-folder`
   - Output: 65 TC files in `yml-tc/`
   - Labels: ✅ Correct from Jira
   - Commands: Empty (as expected)

2. **Copied labels to Android folder**
   - Script: `copyLabelsToAndroid.js` (temporary, deleted after use)
   - Process: Read labels from `yml-tc/`, write to `Android/`
   - Preservation: All commands in Android folder kept intact

3. **Verification**
   - Checked sample files
   - Confirmed labels updated
   - Confirmed commands preserved

## 📝 Notes

- **yml-tc folder**: Contains TC files with correct labels but empty commands
- **Android folder**: Contains TC files with correct labels AND filled commands
- **Missing files**: 29 files (TC_POJK_CASA_21 to TC_POJK_CASA_32) not found in Android folder
  - These files exist in `yml-tc/` but not in `Android/`
  - Skipped during copy process

## ✨ Result

**Android folder now has:**
- ✅ Correct labels from Jira
- ✅ Filled commands (preserved from original)
- ✅ Ready for automation testing

---

**Date:** 2026-05-04  
**Action:** Update labels from Jira, preserve commands  
**Status:** ✅ Success
