# Generate Test Scenario

## Deskripsi
Generator untuk membuat file Test Scenario level yang berisi daftar Test Cases untuk Android dan iOS.

## Struktur File

```yaml
appId: ${APP_ID}
jsEngine: graaljs
tags:
  - regression
env:
  JIRA_FOLDER_NAME: Test Automation

onFlowStart:
  - runScript:
      file: ../../../automation-env.js
  - runScript:
      file: ../../../configs/general/setSegment.js
      env:
        SEGMENT: PRIORITY

onFlowEnd:
  - runScript:
      file: ../../../configs/general/setSegment.js
      env:
        SEGMENT: MASS

---
#=============================================================================== Android

- runFlow:
    label: 
    when:
      platform: android
    file: ../../../components/android/TC_XXX.yml
    env:
      JIRA_ISSUE: 
      TC: TC_XXX
      BALANCE_STATE: "before"  # Hanya untuk TC pertama

#=============================================================================== iOS
# ... (sama untuk iOS)
```

## Cara Menggunakan

### Generate Test Scenario
```bash
npm run generate-ts
```

Output: `outputTestScenario.yml`

### Generate Semua
```bash
npm run generate-complete
```

Output: Test Scenario + Test Cases

## Kustomisasi

Edit `src/generateCompleteV2.js`:

```javascript
generateTestScenario(getAllTC, {
  outputPath: "outputTestScenario.yml",
  appId: "${APP_ID}",
  jsEngine: "graaljs",
  tags: ["regression", "smoke"],
  jiraFolderName: "Your Folder Name",
  tcFilePathAndroid: "../../../components/android/",
  tcFilePathIOS: "../../../components/ios/",
  segment: {
    priority: "PRIORITY",
    mass: "MASS"
  }
});
```

## Opsi Konfigurasi

| Parameter | Default | Deskripsi |
|-----------|---------|-----------|
| `outputPath` | `"outputTestScenario.yml"` | Path file output |
| `appId` | `"${APP_ID}"` | Application ID |
| `jsEngine` | `"graaljs"` | JavaScript engine |
| `tags` | `["regression"]` | Tags untuk test scenario |
| `jiraFolderName` | `""` | Nama folder di Jira |
| `tcFilePathAndroid` | `"../../../components/"` | Path ke TC Android |
| `tcFilePathIOS` | `"../../../components/"` | Path ke TC iOS |

## Fitur

- ✅ Remove duplicate TC
- ✅ Platform separation (Android/iOS)
- ✅ Auto TS→TC conversion
- ✅ BALANCE_STATE untuk TC pertama
- ✅ Configurable
