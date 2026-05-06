# 🚀 Quick Start Guide

Panduan lengkap dari awal sampai bisa generate Test Scenarios dan Test Cases dari JIRA.

---

## 📋 Prerequisites

Pastikan sudah terinstall:
- ✅ **Node.js** (v14 atau lebih baru)
- ✅ **npm** (biasanya sudah include dengan Node.js)
- ✅ **Git**
- ✅ **Akses ke JIRA** (username & password)

Cek versi:
```bash
node --version    # Harus v14+
npm --version     # Harus v6+
git --version
```

---

## 🎯 Langkah 1: Clone Repository

```bash
# Clone repository
git clone <repository-url>

# Masuk ke folder project
cd generate-label
```

---

## 🎯 Langkah 2: Install Dependencies

```bash
# Install semua dependencies
npm install
```

**Output yang diharapkan:**
```
added 50 packages, and audited 51 packages in 5s
```

---

## 🎯 Langkah 3: Setup Environment (.env)

### 3.1 Copy template .env
```bash
# Copy file .env.example menjadi .env
cp .env.example .env
```

### 3.2 Edit file .env

Buka file `.env` dengan text editor dan isi dengan credentials JIRA Anda:

```env
# ============================================
# JIRA CREDENTIALS
# ============================================
JIRA_USERNAME = your_username_here
JIRA_PASSWORD = your_password_here
JIRA_BASE_URL = "https://jira.bni.co.id"
JIRA_VERSION_NAME = Sq Fraud Audit
JIRA_CYCLE_NAME = Acceptance Test

# ============================================
# GENERATION MODE
# ============================================

# Single Label Mode (npm run generate)
JIRA_LABELS = TS_POJK_CASA_01

# Folder Mode (npm run generate-folder)
JIRA_FOLDER_NAME = CASA - Android

# Optional: Custom Output Folder (default: current directory)
# Example: OUTPUT_FOLDER=pojk-home will create pojk-home/yml-ts and pojk-home/yml-tc
# OUTPUT_FOLDER = pojk-home
```

**⚠️ PENTING:**
- Ganti `your_username_here` dengan username JIRA Anda
- Ganti `your_password_here` dengan password JIRA Anda
- Sesuaikan `JIRA_VERSION_NAME` dan `JIRA_CYCLE_NAME` dengan project Anda

---

## 🎯 Langkah 4: Generate Test Cases

Sekarang Anda siap untuk generate! Ada 3 mode:

### Mode 1: Generate Single Label (Development)

**Untuk generate 1 label spesifik:**

1. **Set label di .env:**
   ```env
   JIRA_LABELS = TS_POJK_CASA_01
   ```

2. **Jalankan command:**
   ```bash
   npm run generate
   ```

3. **Output:**
   ```
   yml-ts/TS_POJK_CASA_01.yml          # 1 Test Scenario
   yml-tc/TC_POJK_CASA_01_001.yml      # Test Case 1
   yml-tc/TC_POJK_CASA_01_002.yml      # Test Case 2
   ```

---

### Mode 2: Generate Entire Folder (Production) ⭐ RECOMMENDED

**Untuk generate semua labels dalam 1 folder:**

1. **Set folder di .env:**
   ```env
   JIRA_FOLDER_NAME = CASA - Android
   # OUTPUT_FOLDER tidak perlu di-set (default output)
   ```

2. **Jalankan command:**
   ```bash
   npm run generate-folder
   ```

3. **Output:**
   ```
   yml-ts/TS_POJK_CASA_01.yml          # Test Scenario 1
   yml-ts/TS_POJK_CASA_02.yml          # Test Scenario 2
   yml-ts/TS_POJK_CASA_03.yml          # Test Scenario 3
   ...                                  # (32 files)
   
   yml-tc/TC_POJK_CASA_01_001.yml      # Test Case 1
   yml-tc/TC_POJK_CASA_01_002.yml      # Test Case 2
   yml-tc/TC_POJK_CASA_02_001.yml      # Test Case 3
   ...                                  # (65 files)
   ```

---

### Mode 3: Generate dengan Custom Output Folder

**Untuk generate ke folder terpisah (misal: pojk-home):**

1. **Set folder dan output di .env:**
   ```env
   JIRA_FOLDER_NAME = Home - Android
   OUTPUT_FOLDER = pojk-home
   ```

2. **Jalankan command:**
   ```bash
   npm run generate-folder
   ```

3. **Output:**
   ```
   pojk-home/yml-ts/TS_POJK_HOME_01.yml    # Test Scenario 1
   pojk-home/yml-ts/TS_POJK_HOME_02.yml    # Test Scenario 2
   ...
   
   pojk-home/yml-tc/TC_POJK_HOME_01_001.yml # Test Case 1
   pojk-home/yml-tc/TC_POJK_HOME_02_001.yml # Test Case 2
   ...
   ```

---

## 📊 Contoh Output Console

Ketika Anda menjalankan `npm run generate-folder`, Anda akan melihat:

```
╔════════════════════════════════════════════════════════════╗
║     FOLDER-BASED GENERATION PIPELINE                      ║
║     Batch Generate from Jira Folder                       ║
╚════════════════════════════════════════════════════════════╝

📁 Target Folder: CASA - Android

📋 STEP 1: Fetching all test cases from Jira folder...
────────────────────────────────────────────────────────────
📥 Fetching test cases with pagination...
   Page 1: Found 20 test cases
   Page 2: Found 20 test cases
   Page 3: Found 20 test cases
   Page 4: Found 5 test cases
✅ Total fetched: 65 test cases from 4 page(s)

🔄 STEP 2: Grouping test cases by label...
────────────────────────────────────────────────────────────
✅ Found 32 unique labels:
   01. TS_POJK_CASA_01 (2 test cases)
   02. TS_POJK_CASA_02 (2 test cases)
   ...

🎯 STEP 3: Generating Test Scenarios (TS Level)...
────────────────────────────────────────────────────────────
✅ Generated 32 Test Scenario files in yml-ts/

📝 STEP 4: Generating Test Cases (TC) with Steps from Jira...
────────────────────────────────────────────────────────────
✅ Test Cases generated in yml-tc/ folder

╔════════════════════════════════════════════════════════════╗
║                    ✨ GENERATION COMPLETE ✨                ║
╚════════════════════════════════════════════════════════════╝

📊 Summary:
   Folder: CASA - Android
   Test Scenarios: 32 files
   Test Cases: 65 files

🎉 All files are ready for automation!
```

---

## 🔍 Verifikasi Hasil

### Cek file yang di-generate:

**Windows (PowerShell):**
```powershell
# Lihat Test Scenarios
Get-ChildItem yml-ts/

# Lihat Test Cases
Get-ChildItem yml-tc/

# Hitung jumlah files
(Get-ChildItem yml-ts/).Count
(Get-ChildItem yml-tc/).Count
```

**Linux/Mac:**
```bash
# Lihat Test Scenarios
ls yml-ts/

# Lihat Test Cases
ls yml-tc/

# Hitung jumlah files
ls yml-ts/ | wc -l
ls yml-tc/ | wc -l
```

### Buka file untuk melihat isi:

```bash
# Lihat Test Scenario
cat yml-ts/TS_POJK_CASA_01.yml

# Lihat Test Case
cat yml-tc/TC_POJK_CASA_01_001.yml
```

---

## ❌ Troubleshooting

### Problem 1: Error "JIRA_USERNAME is not set"

**Solusi:**
```bash
# Pastikan file .env sudah dibuat
ls -la .env

# Jika belum ada, copy dari template
cp .env.example .env

# Edit .env dan isi credentials
```

---

### Problem 2: Error "No test cases found"

**Penyebab:**
- Folder name salah
- Label tidak ada di JIRA
- Credentials salah

**Solusi:**
```env
# Cek spelling folder name di .env
JIRA_FOLDER_NAME = CASA - Android  # Harus exact match dengan JIRA

# Atau cek label
JIRA_LABELS = TS_POJK_CASA_01  # Harus exact match dengan JIRA
```

---

### Problem 3: Error koneksi ke JIRA

**Solusi:**
```bash
# Cek koneksi internet
ping jira.bni.co.id

# Cek credentials di .env
# Pastikan username dan password benar
```

---

### Problem 4: npm install error

**Solusi:**
```bash
# Hapus node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install ulang
npm install
```

---

## 📚 Next Steps

Setelah berhasil generate, Anda bisa:

1. **Lihat dokumentasi lengkap:**
   ```bash
   # Baca COMMANDS.md untuk semua commands
   cat COMMANDS.md
   ```

2. **Generate untuk folder lain:**
   ```env
   # Edit .env
   JIRA_FOLDER_NAME = Transfer - Android
   OUTPUT_FOLDER = pojk-transfer
   ```
   ```bash
   npm run generate-folder
   ```

3. **Generate untuk fitur spesifik:**
   ```env
   # Edit .env
   JIRA_FOLDER_NAME = Home - Android
   OUTPUT_FOLDER = pojk-home
   ```
   ```bash
   npm run generate-folder
   ```

---

## 🎯 Summary Commands

| Task | Command |
|------|---------|
| **Clone repo** | `git clone <url> && cd generate-label` |
| **Install** | `npm install` |
| **Setup env** | `cp .env.example .env` (lalu edit) |
| **Generate 1 label** | `npm run generate` |
| **Generate folder** | `npm run generate-folder` |
| **Generate TS only** | `npm run generate-ts` |

---

## ✅ Checklist

Sebelum generate, pastikan:

- [ ] Node.js sudah terinstall (v14+)
- [ ] Repository sudah di-clone
- [ ] Dependencies sudah di-install (`npm install`)
- [ ] File `.env` sudah dibuat dan diisi
- [ ] JIRA credentials sudah benar
- [ ] JIRA_FOLDER_NAME atau JIRA_LABELS sudah di-set
- [ ] Koneksi internet aktif

Jika semua checklist ✅, Anda siap untuk generate! 🚀

---

**Need help?** Lihat dokumentasi lengkap di [COMMANDS.md](COMMANDS.md)
