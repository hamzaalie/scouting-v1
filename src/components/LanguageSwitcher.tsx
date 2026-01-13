import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Language Switcher Component
 * 
 * Dropdown component for switching between available languages.
 * 
 * Features:
 * - Shows current language (EN | FR)
 * - Click to switch languages
 * - Updates i18n language
 * - Saves preference to localStorage
 * - Flag icons for visual identification
 */
const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();

	const languages = [
		{ code: 'en', name: 'English', flag: '🇬🇧' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
	];

	const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[1];

	const handleLanguageChange = (langCode: string) => {
		i18n.changeLanguage(langCode);
		// Language preference is automatically saved to localStorage by i18next-browser-languagedetector
	};

	return (
		<div className="relative group" style={{ display: 'inline-block' }}>
			<button
				type="button"
				className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-2"
				style={{
					padding: '0.375rem 0.75rem',
					fontSize: '0.875rem',
					borderRadius: '0.25rem',
					backgroundColor: 'rgba(255, 255, 255, 0.95)',
					border: '1px solid #dee2e6',
					cursor: 'pointer',
					transition: 'all 0.2s ease',
				}}
				aria-label="Change language"
			>
				<span style={{ fontSize: '1.125rem' }}>{currentLanguage.flag}</span>
				<span className="d-none d-sm-inline">{currentLanguage.code.toUpperCase()}</span>
				<svg
					style={{ width: '1rem', height: '1rem', color: '#6c757d' }}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{/* Dropdown Menu */}
			<div
				className="position-absolute language-dropdown"
				style={{
					right: 0,
					marginTop: '0.5rem',
					width: '12rem',
					backgroundColor: 'white',
					borderRadius: '0.5rem',
					boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
					border: '1px solid #dee2e6',
					opacity: 0,
					visibility: 'hidden',
					transition: 'all 0.2s ease',
					zIndex: 50,
				}}
			>
				{/* Invisible bridge to prevent closing when moving cursor over the gap */}
				<div style={{ position: 'absolute', top: '-0.5rem', left: 0, width: '100%', height: '0.5rem', backgroundColor: 'transparent' }} />
				<div style={{ padding: '0.25rem 0' }}>
					{languages.map((lang) => (
						<button
							key={lang.code}
							type="button"
							onClick={() => handleLanguageChange(lang.code)}
							className="w-100 d-flex align-items-center gap-3 text-start"
							style={{
								padding: '0.5rem 1rem',
								fontSize: '0.875rem',
								border: 'none',
								backgroundColor: i18n.language === lang.code ? '#e7e5fb' : 'white',
								color: i18n.language === lang.code ? '#5145cd' : '#495057',
								fontWeight: i18n.language === lang.code ? 500 : 'normal',
								cursor: 'pointer',
								transition: 'all 0.2s ease',
							}}
							onMouseEnter={(e) => {
								if (i18n.language !== lang.code) {
									(e.target as HTMLButtonElement).style.backgroundColor = '#f8f9fa';
								}
							}}
							onMouseLeave={(e) => {
								if (i18n.language !== lang.code) {
									(e.target as HTMLButtonElement).style.backgroundColor = 'white';
								}
							}}
						>
							<span style={{ fontSize: '1.125rem' }}>{lang.flag}</span>
							<span>{lang.name}</span>
							{i18n.language === lang.code && (
								<svg
									style={{ width: '1rem', height: '1rem', marginLeft: 'auto', color: '#5145cd' }}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							)}
						</button>
					))}
				</div>
			</div>

			{/* CSS for hover effect */}
			<style>{`
				.group:hover .language-dropdown {
					opacity: 1 !important;
					visibility: visible !important;
				}
			`}</style>
		</div>
	);
};

export default LanguageSwitcher;
