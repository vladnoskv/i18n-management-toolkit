# 🌐 I18N Management System

A comprehensive internationalization (i18n) management toolkit for JavaScript/TypeScript projects. This system helps you initialize, analyze, validate, and maintain translations across multiple languages with visual reports and automated workflows.

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📦 Requirements](#-requirements)
- [🛠️ Installation](#️-installation)
- [📁 Project Structure](#-project-structure)
- [🔧 Scripts Overview](#-scripts-overview)
- [⚙️ Configuration](#️-configuration)
- [📊 Workflow Guide](#-workflow-guide)
- [📈 Visual Reports](#-visual-reports)
- [🎯 Best Practices](#-best-practices)
- [🔍 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)

## 🚀 Quick Start

```bash
# Interactive mode - recommended for first-time users
node scripts/i18n/package/00-manage-i18n.js

# Direct command execution
node scripts/i18n/package/00-manage-i18n.js --command=init
node scripts/i18n/package/00-manage-i18n.js --command=analyze
node scripts/i18n/package/00-manage-i18n.js --command=validate
node scripts/i18n/package/00-manage-i18n.js --command=usage
```

## 📦 Requirements

### Dependencies

- **Node.js**: >= 16.0.0
- **i18next**: ^25.3.2 (supported and tested)
- **react-i18next**: ^15.6.0 (for React projects)

### Supported Project Types

- ✅ React/Next.js applications
- ✅ Vue.js applications
- ✅ Angular applications
- ✅ Vanilla JavaScript/TypeScript
- ✅ Node.js backend applications

## 🛠️ Installation

### 1. Ensure i18next is installed

```bash
# For React projects
npm install i18next@^25.3.2 react-i18next@^15.6.0 i18next-browser-languagedetector

# For Vue projects
npm install i18next@^25.3.2 vue-i18next

# For vanilla JS/Node.js
npm install i18next@^25.3.2
```

### 2. Copy the i18n management scripts

Copy the entire `scripts/i18n/package/` directory to your project:

```
your-project/
├── scripts/
│   └── i18n/
│       └── package/
│           ├── 00-manage-i18n.js
│           ├── 01-init-i18n.js
│           ├── 02-analyze-translations.js
│           ├── 03-validate-translations.js
│           ├── 04-check-usage.js
│           ├── 05-complete-translations.js
│           ├── 06-summary-report.js
│           └── README.md
```

### 3. Initialize your i18n structure

```bash
cd your-project
node scripts/i18n/package/00-manage-i18n.js --command=init
```

This will create:
```
your-project/
├── locales/
│   ├── en/
│   │   └── common.json
│   ├── de/
│   │   └── common.json
│   ├── es/
│   │   └── common.json
│   ├── fr/
│   │   └── common.json
│   └── ru/
│       └── common.json
└── i18n-reports/
    └── (generated reports)
```

## 📁 Project Structure

```
scripts/i18n/package/
├── 00-manage-i18n.js          # 🎛️  Main management interface
├── 01-init-i18n.js            # 🚀 Initialize new languages
├── 02-analyze-translations.js  # 📊 Analyze translation completeness
├── 03-validate-translations.js # ✅ Validate translation files
├── 04-check-usage.js          # 🔍 Check translation key usage
├── 05-complete-translations.js # 🎯 Complete translations (100% coverage)
├── 06-summary-report.js       # 📋 Generate summary reports
├── i18n-reports/              # 📈 Generated reports
└── README.md                   # 📖 This documentation
```

## 🔧 Scripts Overview

### 🎛️ 00-manage-i18n.js - Main Management Interface

The central hub for all i18n operations with both interactive and command-line interfaces.

**Features:**
- 🖥️ Interactive menu system
- 📊 Project status overview
- 🔄 Orchestrates all other scripts
- 🚀 Comprehensive workflow execution
- 🗑️ Report management

**Usage:**
```bash
# Interactive mode
node scripts/i18n/package/00-manage-i18n.js

# Direct commands
node scripts/i18n/package/00-manage-i18n.js --command=status
node scripts/i18n/package/00-manage-i18n.js --command=workflow
node scripts/i18n/package/00-manage-i18n.js --help
```

**Interactive Menu:**
```
🌐 I18N MANAGEMENT MENU
============================================================
1. 🚀 Initialize new languages
2. 🔍 Analyze translations
3. ✅ Validate translations
4. 📊 Check key usage
5. 🎯 Complete translations (100% coverage)
6. 🔄 Run full workflow
7. 📋 Show project status
8. 🗑️  Delete all reports
9. ❓ Help
0. 🚪 Exit
```

### 🚀 01-init-i18n.js - Language Initialization

Initializes new language files with automatic directory creation and sample content.

**Features:**
- 📁 Creates language directories and files automatically
- 🔄 Preserves existing translations
- 🏷️ Marks missing translations with `__NOT_TRANSLATED__`
- 🎯 Interactive language selection
- 📝 Generates sample translation files
- 🛡️ Safe operation (won't overwrite existing translations)

**Usage:**
```bash
# Interactive mode
node scripts/i18n/package/01-init-i18n.js

# Specific languages
node scripts/i18n/package/01-init-i18n.js --languages=de,fr,es

# Custom source directory
node scripts/i18n/package/01-init-i18n.js --source-dir=./locales
```

### 📊 02-analyze-translations.js - Translation Analysis

Comprehensive analysis of translation completeness with detailed reporting.

**Features:**
- 📈 Translation completeness statistics
- 🏗️ Structural consistency checking
- 🐛 Issue identification (missing, empty, partial translations)
- 📄 Detailed per-file analysis
- 📊 Visual progress indicators
- 📝 Generates comprehensive reports

**Usage:**
```bash
# Analyze all languages
node scripts/i18n/package/02-analyze-translations.js

# Specific language
node scripts/i18n/package/02-analyze-translations.js --language=de

# Generate detailed reports
node scripts/i18n/package/02-analyze-translations.js --output-reports
```

**Sample Output:**
```
🔄 Analyzing de...
   📄 Files: 1/1
   🔤 Keys: 0/14 (0%)
   ⚠️  Missing: 14
   🐛 Issues: 14
   📄 Report saved: ./i18n-reports/analysis-de.txt
```

### ✅ 03-validate-translations.js - Translation Validation

Validates translation files for syntax, structure, and completeness.

**Features:**
- 🔍 JSON syntax validation
- 🏗️ Structural consistency checking
- ✅ Translation completeness validation
- ⚠️ Error and warning reporting
- 🎯 Strict mode for enhanced validation
- 📊 Detailed validation statistics

**Usage:**
```bash
# Validate all languages
node scripts/i18n/package/03-validate-translations.js

# Specific language
node scripts/i18n/package/03-validate-translations.js --language=de

# Strict mode
node scripts/i18n/package/03-validate-translations.js --strict
```

### 🔍 04-check-usage.js - Usage Analysis

Analyzes source code to find unused translation keys and missing translations.

**Features:**
- 🔍 Scans source code for translation key usage
- 🗑️ Identifies unused translation keys
- ⚠️ Finds missing translations referenced in code
- 🔄 Detects dynamic translation patterns
- 📊 Generates detailed usage reports
- 🎯 Supports multiple i18n patterns

**Supported Translation Patterns:**
- `t('key')` - Standard i18next
- `$t('key')` - Vue i18n
- `i18n.t('key')` - Direct i18next
- `translate('key')` - Custom functions
- `formatMessage({ id: 'key' })` - React Intl

**Usage:**
```bash
# Analyze usage
node scripts/i18n/package/04-check-usage.js

# Custom source directory
node scripts/i18n/package/04-check-usage.js --source-dir=./src

# Generate detailed report
node scripts/i18n/package/04-check-usage.js --output-report
```

### 🎯 05-complete-translations.js - Translation Completion

Helps achieve 100% translation coverage with guided completion.

**Features:**
- 🎯 Identifies incomplete translations
- 📝 Guided translation completion
- 🔄 Batch processing capabilities
- ✅ Validation during completion
- 📊 Progress tracking

### 📋 06-summary-report.js - Summary Reports

Generates comprehensive project-wide translation summaries.

**Features:**
- 📊 Project-wide statistics
- 🌐 Multi-language overview
- 📈 Progress tracking
- 🎯 Priority recommendations
- 📄 Exportable reports

## ⚙️ Configuration

### Default Configuration

All scripts use consistent default configuration:

```javascript
const DEFAULT_CONFIG = {
  sourceDir: './locales',                    // I18n files location
  sourceLanguage: 'en',                      // Source language
  notTranslatedMarker: '__NOT_TRANSLATED__', // Marker for missing translations
  defaultLanguages: ['de', 'es', 'fr', 'ru'], // Default target languages
  outputDir: './i18n-reports',               // Reports output directory
  excludeFiles: ['.DS_Store', 'Thumbs.db'],  // Files to ignore
  strictMode: false                          // Strict validation mode
};
```

### Customization Options

#### 1. Command Line Arguments
```bash
node scripts/i18n/package/00-manage-i18n.js --source-dir=./locales --source-language=en
```

#### 2. Environment Variables
```bash
export I18N_SOURCE_DIR=./locales
export I18N_SOURCE_LANGUAGE=en
export I18N_DEFAULT_LANGUAGES=de,es,fr,ru
```

#### 3. Configuration File (Optional)
Create `i18n.config.js` in your project root:
```javascript
module.exports = {
  sourceDir: './locales',
  sourceLanguage: 'en',
  defaultLanguages: ['de', 'es', 'fr', 'ru', 'ja', 'zh'],
  outputDir: './reports/i18n',
  strictMode: true
};
```

## 📊 Workflow Guide

### 🚀 Initial Setup

1. **Install dependencies:**
   ```bash
   npm install i18next@^25.3.2 react-i18next@^15.6.0
   ```

2. **Initialize your project:**
   ```bash
   node scripts/i18n/package/00-manage-i18n.js --command=init
   ```

3. **Validate the setup:**
   ```bash
   node scripts/i18n/package/00-manage-i18n.js --command=validate
   ```

### 🔄 Regular Maintenance

1. **Check project status:**
   ```bash
   node scripts/i18n/package/00-manage-i18n.js --command=status
   ```

2. **Analyze translations:**
   ```bash
   node scripts/i18n/package/00-manage-i18n.js --command=analyze
   ```

3. **Run full workflow:**
   ```bash
   node scripts/i18n/package/00-manage-i18n.js --command=workflow
   ```

### 🎯 Development Workflow

1. **Add new translation keys** to your source language files
2. **Run analysis** to identify missing translations
3. **Complete translations** for target languages
4. **Validate** all translation files
5. **Check usage** to find unused keys
6. **Generate reports** for team review

## 📈 Visual Reports

The system generates comprehensive, easy-to-read reports:

### 📊 Analysis Report Example

```
TRANSLATION ANALYSIS REPORT FOR DE
Generated: 2025-07-24T02:39:44.763Z
Status: 0/14 translated (0%)
Files analyzed: 1/1
Keys needing translation: 14

FILE BREAKDOWN:
==================================================

📄 common.json
   📊 Translation: 0/14 (0%)
   🏗️  Structure: Consistent
   ⚠️  Issues: 14
      not translated: 14

KEYS TO TRANSLATE:
==================================================

Key: common.welcome
English: "Welcome"
de: [NEEDS TRANSLATION]

Key: common.hello
English: "Hello"
de: [NEEDS TRANSLATION]
```

### 📋 Console Output Features

- 🎨 **Color-coded status indicators**
- 📊 **Progress bars and percentages**
- 🔍 **Detailed issue breakdowns**
- 📈 **Visual completion statistics**
- 🎯 **Actionable recommendations**

### 📄 Report Types

1. **Analysis Reports** (`analysis-{lang}.txt`)
   - Translation completeness
   - Missing key details
   - File-by-file breakdown

2. **Validation Reports** (`validation-{lang}.txt`)
   - Syntax errors
   - Structural issues
   - Consistency problems

3. **Usage Reports** (`usage-analysis.txt`)
   - Unused translation keys
   - Missing translations in code
   - Dynamic key patterns

4. **Summary Reports** (`project-summary.txt`)
   - Project-wide statistics
   - Language priority recommendations
   - Overall health metrics

## 🎯 Best Practices

### 📁 File Organization

```
locales/
├── en/                    # Source language
│   ├── common.json        # Common UI elements
│   ├── navigation.json    # Navigation items
│   ├── forms.json         # Form labels and validation
│   └── errors.json        # Error messages
├── de/                    # Target languages
│   ├── common.json
│   ├── navigation.json
│   ├── forms.json
│   └── errors.json
└── ...
```

### 🔑 Key Naming Conventions

```json
{
  "common.welcome": "Welcome",
  "navigation.home": "Home",
  "forms.validation.required": "This field is required",
  "errors.network.timeout": "Network timeout occurred"
}
```

### 🛡️ Translation Safety

- ✅ Always use the `__NOT_TRANSLATED__` marker
- ✅ Run validation before deployment
- ✅ Keep translation keys descriptive
- ✅ Use namespacing for organization
- ❌ Don't delete keys without checking usage
- ❌ Don't modify key names without updating code

### 🔄 Automation Integration

#### GitHub Actions Example

```yaml
name: I18n Validation
on: [push, pull_request]

jobs:
  validate-translations:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node scripts/i18n/package/03-validate-translations.js --strict
      - run: node scripts/i18n/package/04-check-usage.js
```

## 🔍 Troubleshooting

### Common Issues

#### ❌ "Source directory not found"
```bash
# Check if the directory exists
ls -la locales/

# Initialize if missing
node scripts/i18n/package/01-init-i18n.js
```

#### ❌ "JSON syntax error"
```bash
# Validate JSON files
node scripts/i18n/package/03-validate-translations.js --strict

# Check specific file
node -e "console.log(JSON.parse(require('fs').readFileSync('locales/de/common.json', 'utf8')))"
```

#### ❌ "No translation keys found"
```bash
# Check source language files
node scripts/i18n/package/02-analyze-translations.js --language=en

# Verify file structure
find locales/ -name "*.json" -exec echo "=== {} ===" \; -exec cat {} \;
```

### Debug Mode

Run any script with debug information:
```bash
DEBUG=true node scripts/i18n/package/00-manage-i18n.js
```

### Getting Help

```bash
# Show help for any script
node scripts/i18n/package/00-manage-i18n.js --help
node scripts/i18n/package/02-analyze-translations.js --help
```

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with multiple project types
5. Submit a pull request

### Testing

```bash
# Test with sample project
mkdir test-project && cd test-project
npm init -y
npm install i18next@^25.3.2

# Copy scripts and test
cp -r ../scripts .
node scripts/i18n/package/00-manage-i18n.js --command=init
```

### Feature Requests

We welcome feature requests! Please open an issue with:
- Clear description of the feature
- Use case examples
- Expected behavior

---

## 📄 License

MIT License - feel free to use in your projects!

## 🙏 Acknowledgments

- Built for i18next ^25.3.2 compatibility
- Supports modern JavaScript/TypeScript projects
- Designed for developer productivity
- Community-driven improvements

---

**Happy translating! 🌍✨**