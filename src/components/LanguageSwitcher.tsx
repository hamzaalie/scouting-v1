import React, { useState, useRef, useEffect } from 'react';
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
 * - Mobile-friendly design
 */
const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const languages = [
		{ code: 'en', name: 'English', flag: '🇬🇧' },
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
	];

	const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[1];

	const handleLanguageChange = (langCode: string) => {
		i18n.changeLanguage(langCode);
		setIsOpen(false);
		// Language preference is automatically saved to localStorage by i18next-browser-languagedetector
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div ref={dropdownRef} style={{ display: 'inline-block', position: 'relative' }}>
			<button
				type="button"
				onClick={toggleDropdown}
				className="btn btn-sm d-flex align-items-center"
				style={{
					padding: '0.5rem 1rem',
					fontSize: '0.9rem',
					borderRadius: '0.375rem',
					backgroundColor: 'rgba(255, 255, 255, 0.95)',
					border: '2px solid rgba(255, 255, 255, 0.3)',
					cursor: 'pointer',
					transition: 'all 0.2s ease',
					boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
					gap: '0.5rem',
					minWidth: '110px',
					justifyContent: 'space-between',
				}}
				aria-label="Change language"
			>
				<div className="d-flex align-items-center" style={{ gap: '0.5rem' }}>
					<span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{currentLanguage.flag}</span>
					<span style={{ fontWeight: 500, color: '#333' }}>{currentLanguage.code.toUpperCase()}</span>
				</div>
				<svg
					style={{ 
						width: '1rem', 
						height: '1rem', 
						color: '#6c757d',
						transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
						transition: 'transform 0.2s ease'
					}}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<div
					className="position-absolute"
					style={{
						top: 'calc(100% + 0.5rem)',
						left: 0,
						right: 0,
						minWidth: '150px',
						backgroundColor: 'white',
						borderRadius: '0.5rem',
						boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
						border: '1px solid #e0e0e0',
						zIndex: 9999,
						overflow: 'hidden',
					}}
				>
					{languages.map((lang) => (
						<button
							key={lang.code}
							type="button"
							onClick={() => handleLanguageChange(lang.code)}
							className="w-100 d-flex align-items-center text-start"
							style={{
								padding: '0.75rem 1rem',
								fontSize: '0.9rem',
								border: 'none',
								backgroundColor: i18n.language === lang.code ? '#f0f7ff' : 'white',
								color: i18n.language === lang.code ? '#0066cc' : '#333',
								fontWeight: i18n.language === lang.code ? 600 : 'normal',
								cursor: 'pointer',
								transition: 'all 0.15s ease',
								gap: '0.75rem',
								borderBottom: '1px solid #f0f0f0',
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
							<span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{lang.flag}</span>
							<span style={{ flex: 1 }}>{lang.name}</span>
							{i18n.language === lang.code && (
								<svg
									style={{ width: '1.1rem', height: '1.1rem', color: '#0066cc', flexShrink: 0 }}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
								</svg>
							)}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default LanguageSwitcher;
