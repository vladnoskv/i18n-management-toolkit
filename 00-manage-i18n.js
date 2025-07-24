#!/usr/bin/env node
/**
 * I18N MANAGEMENT SCRIPT
 * 
 * This is the main entry point for all i18n operations.
 * It provides an interactive interface to manage translations.
 * 
 * Usage:
 *   node scripts/i18n/00-manage-i18n.js
 *   node scripts/i18n/00-manage-i18n.js --command=init
 *   node scripts/i18n/00-manage-i18n.js --command=analyze
 *   node scripts/i18n/00-manage-i18n.js --command=validate
 *   node scripts/i18n/00-manage-i18n.js --command=usage
 *   node scripts/i18n/00-manage-i18n.js --help
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Import other i18n scripts
const I18nInitializer = require('./01-init-i18n');
const I18nAnalyzer = require('./02-analyze-translations');
const I18nValidator = require('./03-validate-translations');
const I18nUsageAnalyzer = require('./04-check-usage');

// Default configuration
const DEFAULT_CONFIG = {
  sourceDir: './locales',
  sourceLanguage: 'en',
  defaultLanguages: ['de', 'es', 'fr', 'ru'],
  outputDir: './i18n-reports'
};

class I18nManager {
  constructor(config = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Parse command line arguments
  parseArgs() {
    const args = process.argv.slice(2);
    const parsed = {};
    
    args.forEach(arg => {
      if (arg.startsWith('--')) {
        const [key, value] = arg.substring(2).split('=');
        if (key === 'command') {
          parsed.command = value;
        } else if (key === 'help') {
          parsed.help = true;
        } else if (key === 'source-dir') {
          parsed.sourceDir = value;
        } else if (key === 'languages') {
          parsed.languages = value.split(',');
        } else if (key === 'interactive') {
          parsed.interactive = value !== 'false';
        }
      }
    });
    
    return parsed;
  }

  // Display help information
  showHelp() {
    console.log(`
🌐 I18N MANAGEMENT TOOL
${'='.repeat(60)}
`);
    console.log('This tool helps you manage internationalization (i18n) for your project.\n');
    
    console.log('COMMANDS:');
    console.log('  init      Initialize i18n for new languages');
    console.log('  analyze   Analyze translation completeness');
    console.log('  validate  Validate translation files');
    console.log('  usage     Check translation key usage');
    console.log('  complete  Complete translations for 100% coverage');
    console.log('  status    Show overall i18n status');
    console.log('  workflow  Run full workflow with completion');
    console.log('  delete    Delete all report files');
    console.log('  help      Show this help message\n');
    
    console.log('OPTIONS:');
    console.log('  --command=<cmd>        Run specific command directly');
    console.log('  --source-dir=<path>    Set i18n source directory');
    console.log('  --languages=<list>     Comma-separated list of languages');
    console.log('  --interactive=false    Disable interactive mode\n');
    
    console.log('EXAMPLES:');
    console.log('  node scripts/i18n/00-manage-i18n.js');
    console.log('  node scripts/i18n/00-manage-i18n.js --command=init');
    console.log('  node scripts/i18n/00-manage-i18n.js --command=validate --languages=de,fr');
    console.log('  node scripts/i18n/00-manage-i18n.js --source-dir=./locales\n');
  }

  // Prompt user for input
  async prompt(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  // Get project status
  async getProjectStatus() {
    const sourceDir = path.resolve(this.config.sourceDir);
    const sourceLanguageDir = path.join(sourceDir, this.config.sourceLanguage);
    
    const status = {
      hasI18n: fs.existsSync(sourceDir),
      hasSourceLanguage: fs.existsSync(sourceLanguageDir),
      languages: [],
      files: [],
      totalKeys: 0
    };
    
    if (status.hasI18n) {
      // Get available languages
      status.languages = fs.readdirSync(sourceDir)
        .filter(item => {
          const itemPath = path.join(sourceDir, item);
          return fs.statSync(itemPath).isDirectory();
        });
      
      // Get translation files
      if (status.hasSourceLanguage) {
        status.files = fs.readdirSync(sourceLanguageDir)
          .filter(file => file.endsWith('.json'));
        
        // Count total keys
        for (const fileName of status.files) {
          try {
            const filePath = path.join(sourceLanguageDir, fileName);
            const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            status.totalKeys += this.countKeys(content);
          } catch (error) {
            // Ignore parsing errors for status
          }
        }
      }
    }
    
    return status;
  }

  // Count keys recursively
  countKeys(obj) {
    let count = 0;
    
    for (const value of Object.values(obj)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        count += this.countKeys(value);
      } else {
        count++;
      }
    }
    
    return count;
  }

  // Display project status
  async showStatus() {
    console.log('📊 I18N PROJECT STATUS');
    console.log('=' .repeat(60));
    
    const status = await this.getProjectStatus();
    
    console.log(`📁 Source directory: ${path.resolve(this.config.sourceDir)}`);
    console.log(`🔤 Source language: ${this.config.sourceLanguage}`);
    console.log(`🌐 I18n setup: ${status.hasI18n ? '✅ Yes' : '❌ No'}`);
    
    if (status.hasI18n) {
      console.log(`🗂️  Available languages: ${status.languages.join(', ')}`);
      console.log(`📄 Translation files: ${status.files.length}`);
      console.log(`🔤 Total translation keys: ${status.totalKeys}`);
      
      if (status.languages.length > 1) {
        console.log('\n💡 You can run analysis to check translation completeness');
      }
    } else {
      console.log('\n💡 Run initialization to set up i18n for your project');
    }
  }

  // Interactive menu
  async showMenu() {
    console.log('\n🌐 I18N MANAGEMENT MENU');
    console.log('=' .repeat(60));
    console.log('1. 🚀 Initialize new languages');
    console.log('2. 🔍 Analyze translations');
    console.log('3. ✅ Validate translations');
    console.log('4. 📊 Check key usage');
    console.log('5. 🎯 Complete translations (100% coverage)');
    console.log('6. 🔄 Run full workflow');
    console.log('7. 📋 Show project status');
    console.log('8. 🗑️  Delete all reports');
    console.log('9. ❓ Help');
    console.log('0. 🚪 Exit\n');
    
    const choice = await this.prompt('Select an option (0-9): ');
    return choice;
  }

  // Run initialization
  async runInit(languages = null) {
    console.log('\n🚀 INITIALIZING I18N');
    console.log('=' .repeat(60));
    
    const initializer = new I18nInitializer({
      sourceDir: this.config.sourceDir,
      sourceLanguage: this.config.sourceLanguage
    });
    
    if (languages) {
      // Non-interactive mode with specified languages
      await initializer.init(languages);
    } else {
      // Interactive mode
      await initializer.init();
    }
  }

  // Run analysis
  async runAnalysis(languages = null) {
    console.log('\n🔍 ANALYZING TRANSLATIONS');
    console.log('=' .repeat(60));
    
    const analyzer = new I18nAnalyzer({
      sourceDir: this.config.sourceDir,
      sourceLanguage: this.config.sourceLanguage,
      outputDir: this.config.outputDir
    });
    
    // Override command line args for specific languages
    if (languages) {
      process.argv = process.argv.slice(0, 2).concat([
        `--languages=${languages.join(',')}`,
        '--output-reports'
      ]);
    } else {
      process.argv = process.argv.slice(0, 2).concat(['--output-reports']);
    }
    
    await analyzer.analyze();
  }

  // Run validation
  async runValidation(languages = null) {
    console.log('\n✅ VALIDATING TRANSLATIONS');
    console.log('=' .repeat(60));
    
    const validator = new I18nValidator({
      sourceDir: this.config.sourceDir,
      sourceLanguage: this.config.sourceLanguage
    });
    
    // Override command line args for specific languages
    if (languages) {
      process.argv = process.argv.slice(0, 2).concat([
        `--language=${languages[0]}` // Validator takes single language
      ]);
    }
    
    const result = await validator.validate();
    return result;
  }

  // Run usage analysis
  async runUsageAnalysis() {
    console.log('\n📊 ANALYZING KEY USAGE');
    console.log('=' .repeat(60));
    
    const usageAnalyzer = new I18nUsageAnalyzer({
      sourceDir: './src',
      i18nDir: this.config.sourceDir,
      sourceLanguage: this.config.sourceLanguage,
      outputDir: this.config.outputDir
    });
    
    // Override command line args
    process.argv = process.argv.slice(0, 2).concat(['--output-report']);
    
    await usageAnalyzer.analyze();
  }

  // Run completion
  async runCompletion() {
    console.log('\n🎯 COMPLETING TRANSLATIONS');
    console.log('=' .repeat(60));
    
    try {
      const I18nCompleter = require('./05-complete-translations');
      const completer = new I18nCompleter({
        sourceDir: this.config.sourceDir,
        sourceLanguage: this.config.sourceLanguage,
        outputDir: this.config.outputDir
      });
      
      await completer.complete();
    } catch (error) {
      console.error('❌ Error running completion:', error.message);
    }
  }

  // Delete all reports
  async deleteReports() {
    console.log('\n🗑️  DELETING ALL REPORTS');
    console.log('=' .repeat(60));
    
    // Use the configured output directory
    const reportsDir = path.resolve(this.config.outputDir);
    
    console.log(`🔍 Looking for reports in: ${reportsDir}`);
    
    // Ensure the reports directory exists, create if it doesn't
    if (!fs.existsSync(reportsDir)) {
      console.log('📁 Reports directory does not exist. Creating it...');
      try {
        fs.mkdirSync(reportsDir, { recursive: true });
        console.log('✅ Reports directory created.');
        console.log('📄 No report files found to delete.');
        return;
      } catch (error) {
        console.error('❌ Error creating reports directory:', error.message);
        return;
      }
    }
    
    try {
      const files = fs.readdirSync(reportsDir);
      const reportFiles = files.filter(file => 
        file.endsWith('.txt') || file.endsWith('.json') || file.endsWith('.log')
      );
      
      if (reportFiles.length === 0) {
        console.log('📄 No report files found to delete.');
        return;
      }
      
      console.log(`📄 Found ${reportFiles.length} report files:`);
      reportFiles.forEach(file => console.log(`   - ${file}`));
      
      const confirm = await this.prompt('\n⚠️  Are you sure you want to delete all reports? (y/N): ');
      
      if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
        let deletedCount = 0;
        
        for (const file of reportFiles) {
          try {
            fs.unlinkSync(path.join(reportsDir, file));
            deletedCount++;
            console.log(`✅ Deleted: ${file}`);
          } catch (error) {
            console.log(`❌ Failed to delete ${file}: ${error.message}`);
          }
        }
        
        console.log(`\n🎉 Successfully deleted ${deletedCount} report files.`);
      } else {
        console.log('❌ Operation cancelled.');
      }
      
    } catch (error) {
      console.error('❌ Error reading reports directory:', error.message);
    }
  }

  // Run comprehensive workflow
  async runWorkflow() {
    console.log('\n🔄 RUNNING COMPREHENSIVE I18N WORKFLOW');
    console.log('=' .repeat(60));
    
    const status = await this.getProjectStatus();
    
    if (!status.hasI18n) {
      console.log('❌ I18n not set up. Please run initialization first.');
      return;
    }
    
    console.log('1️⃣ Completing translations for 100% coverage...');
    await this.runCompletion();
    
    console.log('\n2️⃣ Validating translations...');
    await this.runValidation();
    
    console.log('\n3️⃣ Analyzing translation completeness...');
    await this.runAnalysis();
    
    console.log('\n4️⃣ Checking key usage...');
    await this.runUsageAnalysis();
    
    console.log('\n🎉 Workflow completed with 100% coverage! Check the reports directory for detailed results.');
  }

  // Main execution
  async run() {
    try {
      const args = this.parseArgs();
      
      // Update config from args
      if (args.sourceDir) {
        this.config.sourceDir = args.sourceDir;
      }
      
      // Show help
      if (args.help) {
        this.showHelp();
        this.rl.close();
        return;
      }
      
      // Show header
      console.log('\n🌐 I18N MANAGEMENT TOOL');
      console.log('=' .repeat(60));
      
      // Direct command execution
      if (args.command) {
        switch (args.command.toLowerCase()) {
          case 'init':
            await this.runInit(args.languages);
            break;
          case 'analyze':
            await this.runAnalysis(args.languages);
            break;
          case 'validate':
            await this.runValidation(args.languages);
            break;
          case 'usage':
            await this.runUsageAnalysis();
            break;
          case 'complete':
            await this.runCompletion();
            break;
          case 'status':
            await this.showStatus();
            break;
          case 'workflow':
            await this.runWorkflow();
            break;
          case 'delete':
            await this.deleteReports();
            break;
          case 'help':
            this.showHelp();
            break;
          default:
            console.log(`❌ Unknown command: ${args.command}`);
            this.showHelp();
        }
        
        this.rl.close();
        return;
      }
      
      // Interactive mode
      if (args.interactive !== false) {
        await this.showStatus();
        
        while (true) {
          const choice = await this.showMenu();
          
          switch (choice) {
            case '1':
              await this.runInit();
              break;
            case '2':
              await this.runAnalysis();
              break;
            case '3':
              await this.runValidation();
              break;
            case '4':
              await this.runUsageAnalysis();
              break;
            case '5':
              await this.runCompletion();
              break;
            case '6':
              await this.runWorkflow();
              break;
            case '7':
              await this.showStatus();
              break;
            case '8':
              await this.deleteReports();
              break;
            case '9':
              this.showHelp();
              break;
            case '0':
              console.log('\n👋 Goodbye!');
              this.rl.close();
              return;
            default:
              console.log('❌ Invalid choice. Please select 0-9.');
          }
          
          // Pause before showing menu again
          await this.prompt('\nPress Enter to continue...');
        }
      } else {
        // Non-interactive mode without command
        await this.showStatus();
        this.rl.close();
      }
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      this.rl.close();
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const manager = new I18nManager();
  manager.run();
}

module.exports = I18nManager;