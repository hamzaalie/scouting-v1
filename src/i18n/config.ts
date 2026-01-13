import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en/translation.json';
import frTranslations from './locales/fr/translation.json';

/**
 * i18n Configuration for V1 Application
 * 
 * Sets up internationalization with:
 * - Languages: English (en) and French (fr)
 * - Default language: French
 * - Language detection: localStorage (key: 'language'), then browser
 * - Fallback language: French
 */
i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			en: {
				translation: enTranslations,
			},
			fr: {
				translation: frTranslations,
			},
		},
		lng: 'fr', // Default language (French for V1)
		fallbackLng: 'fr', // Fallback language
		debug: false, // Set to true for development debugging

		interpolation: {
			escapeValue: false, // React already escapes values
		},

		detection: {
			// Order of language detection
			order: ['localStorage', 'navigator'],
			// Keys to look for in localStorage
			caches: ['localStorage'],
			// localStorage key name
			lookupLocalStorage: 'language',
		},
	});

export default i18n;
