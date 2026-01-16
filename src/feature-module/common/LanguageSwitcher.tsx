import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Language Switcher Component
 * 
 * Dropdown component for switching between French and English.
 * 
 * Features:
 * - Shows current language (FR | EN)
 * - Click to toggle dropdown
 * - Updates i18n language
 * - Saves preference to localStorage
 * - Flag icons for visual identification
 */
const LanguageSwitcher: React.FC = () => {
	const { i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const languages = [
		{ code: 'fr', name: 'Français', flag: '🇫🇷' },
		{ code: 'en', name: 'English', flag: '🇬🇧' },
	];

	const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

	const handleLanguageChange = (langCode: string) => {
		i18n.changeLanguage(langCode);
		localStorage.setItem('language', langCode);
		setIsOpen(false);
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div ref={dropdownRef} style={{ position: 'relative' }}>
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					padding: '8px 12px',
					fontSize: '14px',
					fontWeight: '500',
					color: 'white',
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					border: '2px solid white',
					borderRadius: '8px',
					cursor: 'pointer',
					transition: 'all 0.3s ease',
					outline: 'none',
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
				}}
				aria-label="Change language"
			>
				<span style={{ fontSize: '18px' }}>{currentLanguage.flag}</span>
				<span style={{ fontSize: '14px', fontWeight: '600' }}>
					{currentLanguage.code.toUpperCase()}
				</span>
				<svg
					style={{
						width: '14px',
						height: '14px',
						marginLeft: '4px',
						transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
						transition: 'transform 0.2s ease',
					}}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
				</svg>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<div
					style={{
						position: 'absolute',
						right: 0,
						marginTop: '8px',
						width: '160px',
						backgroundColor: 'white',
						borderRadius: '8px',
						boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
						border: '1px solid rgba(0, 0, 0, 0.1)',
						zIndex: 1000,
						overflow: 'hidden',
					}}
				>
					{languages.map((lang) => (
						<button
							key={lang.code}
							type="button"
							onClick={() => handleLanguageChange(lang.code)}
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								gap: '12px',
								padding: '10px 16px',
								fontSize: '14px',
								textAlign: 'left',
								border: 'none',
								backgroundColor: i18n.language === lang.code ? '#f0f9ff' : 'white',
								color: i18n.language === lang.code ? '#0369a1' : '#374151',
								cursor: 'pointer',
								transition: 'background-color 0.15s ease',
								fontWeight: i18n.language === lang.code ? '600' : '400',
								outline: 'none',
							}}
							onMouseEnter={(e) => {
								if (i18n.language !== lang.code) {
									e.currentTarget.style.backgroundColor = '#f3f4f6';
								}
							}}
							onMouseLeave={(e) => {
								if (i18n.language !== lang.code) {
									e.currentTarget.style.backgroundColor = 'white';
								}
							}}
						>
							<span style={{ fontSize: '18px' }}>{lang.flag}</span>
							<span>{lang.name}</span>
							{i18n.language === lang.code && (
								<svg
									style={{
										width: '16px',
										height: '16px',
										marginLeft: 'auto',
										color: '#0369a1',
									}}
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
			)}
		</div>
	);
};

export default LanguageSwitcher;
