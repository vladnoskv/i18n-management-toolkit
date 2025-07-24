/**
 * UI Internationalization Module
 * Handles loading and managing UI translations for the i18n management tool
 */

const fs = require('fs');
const path = require('path');

class UIi18n {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.availableLanguages = ['en', 'de', 'es', 'fr', 'ru', 'ja', 'zh'];
        this.uiLocalesDir = path.join(__dirname, 'ui-locales');
        
        // Load default language
        this.loadLanguage('en');
        
        // Try to load user's preferred language from environment or config
        this.loadUserPreferredLanguage();
    }

    /**
     * Load translations for a specific language
     * @param {string} language - Language code (e.g., 'en', 'de', 'es')
     */
    loadLanguage(language) {
        if (!this.availableLanguages.includes(language)) {
            console.warn(`⚠️  Language '${language}' not available. Using English as fallback.`);
            language = 'en';
        }

        const translationFile = path.join(this.uiLocalesDir, `${language}.json`);
        
        try {
            if (fs.existsSync(translationFile)) {
                const content = fs.readFileSync(translationFile, 'utf8');
                this.translations = JSON.parse(content);
                this.currentLanguage = language;
            } else {
                console.warn(`⚠️  Translation file not found: ${translationFile}`);
                if (language !== 'en') {
                    this.loadLanguage('en'); // Fallback to English
                }
            }
        } catch (error) {
            console.error(`❌ Error loading translation file for '${language}':`, error.message);
            if (language !== 'en') {
                this.loadLanguage('en'); // Fallback to English
            }
        }
    }

    /**
     * Load user's preferred language from environment variables or config
     */
    loadUserPreferredLanguage() {
        // Check command line arguments
        const args = process.argv;
        const uiLangArg = args.find(arg => arg.startsWith('--ui-language='));
        if (uiLangArg) {
            const language = uiLangArg.split('=')[1];
            this.loadLanguage(language);
            return;
        }

        // Check environment variable
        const envLang = process.env.I18N_UI_LANGUAGE;
        if (envLang) {
            this.loadLanguage(envLang);
            return;
        }

        // Check system locale as fallback
        const systemLocale = process.env.LANG || process.env.LANGUAGE || process.env.LC_ALL;
        if (systemLocale) {
            const langCode = systemLocale.split('_')[0].split('.')[0];
            if (this.availableLanguages.includes(langCode)) {
                this.loadLanguage(langCode);
            }
        }
    }

    /**
     * Get translated text by key path
     * @param {string} keyPath - Dot-separated key path (e.g., 'menu.title')
     * @param {object} replacements - Object with replacement values
     * @returns {string} Translated text
     */
    t(keyPath, replacements = {}) {
        const keys = keyPath.split('.');
        let value = this.translations;

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`⚠️  Translation key not found: ${keyPath}`);
                return keyPath; // Return the key path as fallback
            }
        }

        if (typeof value !== 'string') {
            console.warn(`⚠️  Translation value is not a string: ${keyPath}`);
            return keyPath;
        }

        // Replace placeholders
        let result = value;
        for (const [placeholder, replacement] of Object.entries(replacements)) {
            result = result.replace(new RegExp(`\\{${placeholder}\\}`, 'g'), replacement);
        }

        return result;
    }

    /**
     * Get current language code
     * @returns {string} Current language code
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    /**
     * Get list of available languages
     * @returns {Array} Array of language codes
     */
    getAvailableLanguages() {
        return this.availableLanguages;
    }

    /**
     * Change the current UI language
     * @param {string} language - New language code
     */
    changeLanguage(language) {
        this.loadLanguage(language);
    }

    /**
     * Get language display name
     * @param {string} langCode - Language code
     * @returns {string} Display name of the language
     */
    getLanguageDisplayName(langCode) {
        const displayNames = {
            'en': 'English',
            'de': 'Deutsch (German)',
            'es': 'Español (Spanish)',
            'fr': 'Français (French)',
            'ru': 'Русский (Russian)',
            'ja': '日本語 (Japanese)',
            'zh': '中文 (Chinese)'
        };
        return displayNames[langCode] || langCode;
    }

    /**
     * Interactive language selection menu
     * @returns {Promise<string>} Selected language code
     */
    async selectLanguage() {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            console.log('\n' + this.t('language.title'));
            console.log(this.t('language.separator'));
            console.log(this.t('language.current', { language: this.getLanguageDisplayName(this.currentLanguage) }));
            console.log('\n' + this.t('language.available'));
            
            this.availableLanguages.forEach((lang, index) => {
                const displayName = this.getLanguageDisplayName(lang);
                const current = lang === this.currentLanguage ? ' ✓' : '';
                console.log(`  ${index + 1}. ${displayName}${current}`);
            });
            
            rl.question('\n' + this.t('language.prompt'), (answer) => {
                const choice = parseInt(answer);
                
                if (choice === 0) {
                    console.log(this.t('language.cancelled'));
                    rl.close();
                    resolve(this.currentLanguage);
                } else if (choice >= 1 && choice <= this.availableLanguages.length) {
                    const selectedLang = this.availableLanguages[choice - 1];
                    this.changeLanguage(selectedLang);
                    console.log(this.t('language.changed', { language: this.getLanguageDisplayName(selectedLang) }));
                    rl.close();
                    resolve(selectedLang);
                } else {
                    console.log(this.t('language.invalid'));
                    rl.close();
                    resolve(this.currentLanguage);
                }
            });
        });
    }

    /**
     * Save language preference to environment or config
     * @param {string} language - Language code to save
     */
    saveLanguagePreference(language) {
        // This could be extended to save to a config file
        // For now, we'll just set an environment variable for the current session
        process.env.I18N_UI_LANGUAGE = language;
    }
}

// Export singleton instance
module.exports = new UIi18n();