# POJK Home Feature Generation

## Overview
Dokumentasi untuk generate Test Scenarios dan Test Cases dari JIRA untuk fitur **Home** menggunakan script `generate-folder` dengan custom output folder.

## Query JIRA
```
project = "Maverick" 
AND fixVersion = "Sq Fraud Audit" 
AND cycleName in ("Acceptance Test") 
AND folderName in ("Home - Android") 
ORDER BY summary ASC
```

## Struktur Output

```
pojk-home/
├── yml-ts/          # Test Scenarios (TS Level)
│   ├── TS_POJK_HOME_01.yml
│   ├── TS_POJK_HOME_02.yml
│   ├── TS_POJK_HOME_03.yml
│   └── ... (14 files total)
│
└── yml-tc/          # Test Cases (TC Level)
    ├── TC_POJK_HOME_01_001.yml
    ├── TC_POJK_HOME_02_001.yml
    ├── TC_POJK_HOME_03_001.yml
    └── ... (31 files total)
```

## Cara Penggunaan

### 1. Konfigurasi .env
Pastikan file `.env` sudah dikonfigurasi dengan benar:

```env
# JIRA Credentials
JIRA_USERNAME = Muhamad.Irkhamsyah
JIRA_PASSWORD = bniMM1234/
JIRA_BASE_URL = "https://jira.bni.co.id"

# JIRA Query Parameters
JIRA_VERSION_NAME = Sq Fraud Audit
JIRA_CYCLE_NAME = Acceptance Test
JIRA_FOLDER_NAME = Home - Android

# Custom Output Folder (PENTING!)
OUTPUT_FOLDER = pojk-home
```

### 2. Jalankan Script
```bash
npm run generate-folder
```

**Note:** Script `generate-folder` sekarang support custom output folder melalui environment variable `OUTPUT_FOLDER`.

### 3. Hasil Generation
Script akan:
1. ✅ Fetch 31 test cases dari JIRA (project Maverick)
2. ✅ Group test cases berdasarkan label (14 unique labels)
3. ✅ Generate 14 Test Scenario files di `pojk-home/yml-ts/`
4. ✅ Generate 31 Test Case files di `pojk-home/yml-tc/`

## Statistik Generation

| Metric | Value |
|--------|-------|
| **Project** | Maverick |
| **Folder** | Home - Android |
| **Total Labels** | 14 |
| **Total Test Cases** | 31 |
| **Average per Label** | 2.2 |

## Detail Labels

| No | Label | Test Cases |
|----|-------|------------|
| 01 | TS_POJK_HOME_01 | 1 |
| 02 | TS_POJK_HOME_02 | 1 |
| 03 | TS_POJK_HOME_03 | 3 |
| 04 | TS_POJK_HOME_04 | 4 |
| 05 | TS_POJK_HOME_05 | 3 |
| 06 | TS_POJK_HOME_06 | 4 |
| 07 | TS_POJK_HOME_07 | 1 |
| 08 | TS_POJK_HOME_08 | 1 |
| 09 | TS_POJK_HOME_09 | 1 |
| 10 | TS_POJK_HOME_10 | 2 |
| 11 | TS_POJK_HOME_11 | 7 |
| 12 | TS_POJK_HOME_12 | 1 |
| 13 | TS_POJK_HOME_13 | 1 |
| 14 | TS_POJK_HOME_14 | 1 |

## Fitur Custom Output Folder

Script `generate-folder` sekarang mendukung custom output folder melalui environment variable `OUTPUT_FOLDER`.

### Contoh Penggunaan:

#### Default (tanpa OUTPUT_FOLDER):
```env
# .env
JIRA_FOLDER_NAME = CASA - Android
# OUTPUT_FOLDER tidak di-set
```
```bash
npm run generate-folder
```
**Output:** `yml-ts/` dan `yml-tc/`

#### Custom Output Folder:
```env
# .env
JIRA_FOLDER_NAME = Home - Android
OUTPUT_FOLDER = pojk-home
```
```bash
npm run generate-folder
```
**Output:** `pojk-home/yml-ts/` dan `pojk-home/yml-tc/`

### Keuntungan Custom Output Folder:

✅ **Flexible** - Bisa digunakan untuk fitur apapun, tidak hanya Home  
✅ **Reusable** - Satu script untuk semua kebutuhan  
✅ **Organized** - Pisahkan output per fitur/module  
✅ **Scalable** - Mudah untuk menambah fitur baru

### Contoh untuk Fitur Lain:

```env
# Transfer Feature
JIRA_FOLDER_NAME = Transfer - Android
OUTPUT_FOLDER = pojk-transfer

# Login Feature
JIRA_FOLDER_NAME = Login - Android
OUTPUT_FOLDER = pojk-login

# Payment Feature
JIRA_FOLDER_NAME = Payment - Android
OUTPUT_FOLDER = pojk-payment
```

## File Script

Script yang digunakan: `src/generateByFolder.js`

### Fitur Utama:
- ✅ Support custom output folder via `OUTPUT_FOLDER` env variable
- ✅ Backward compatible (default ke `yml-ts/` dan `yml-tc/` jika tidak di-set)
- ✅ Pagination support (auto-fetch multiple pages)
- ✅ Detailed logging dan progress tracking
- ✅ Flexible untuk semua fitur/module

## Perbedaan dengan Default

| Feature | Default (no OUTPUT_FOLDER) | Custom (with OUTPUT_FOLDER) |
|---------|---------------------------|----------------------------|
| **Output TS** | `yml-ts/` | `{OUTPUT_FOLDER}/yml-ts/` |
| **Output TC** | `yml-tc/` | `{OUTPUT_FOLDER}/yml-tc/` |
| **Use Case** | General purpose | Specific feature/module |
| **Example** | CASA default output | Home, Transfer, Login, etc |

## Troubleshooting

### Tidak ada test cases yang ditemukan
```
❌ No test cases found in folder: Home - Android
```

**Solusi:**
1. Periksa `JIRA_FOLDER_NAME` di `.env` (harus: `Home - Android`)
2. Periksa `JIRA_VERSION_NAME` (harus: `Sq Fraud Audit`)
3. Periksa `JIRA_CYCLE_NAME` (harus: `Acceptance Test`)
4. Pastikan credentials JIRA benar

### Error koneksi JIRA
```
❌ Error fetching page 1: ...
```

**Solusi:**
1. Periksa koneksi internet
2. Periksa JIRA_BASE_URL
3. Periksa username dan password

### Output folder tidak sesuai
```
Files generated in yml-ts/ instead of pojk-home/yml-ts/
```

**Solusi:**
1. Pastikan `OUTPUT_FOLDER` di-set di `.env`
2. Restart terminal setelah update `.env`
3. Cek typo di nama folder

## Next Steps

Setelah generation selesai, file YAML siap digunakan untuk automation testing:

1. ✅ Test Scenarios tersedia di `pojk-home/yml-ts/`
2. ✅ Test Cases tersedia di `pojk-home/yml-tc/`
3. ✅ Semua file sudah include steps dari JIRA
4. ✅ Ready untuk dijalankan dengan automation framework

---

**Generated:** May 5, 2026  
**Script Version:** 1.0.0  
**Total Files:** 45 (14 TS + 31 TC)
