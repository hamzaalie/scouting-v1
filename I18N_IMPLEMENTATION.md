# V1 i18n Implementation Guide

## ✅ Implementation Complete

The V1 application now has full internationalization (i18n) support with English and French languages.

## 📦 What Was Done

### 1. **Packages Installed**
- `react-i18next` - React bindings for i18next
- `i18next` - Core i18n framework
- `i18next-browser-languagedetector` - Automatic language detection

### 2. **Configuration Files**
- **`src/i18n/config.ts`** - i18n configuration
  - Default language: French (fr)
  - Fallback language: French
  - Auto-detection from localStorage and browser
  - Key: 'language' in localStorage

### 3. **Translation Files**
- **`src/i18n/locales/en/translation.json`** - English translations
- **`src/i18n/locales/fr/translation.json`** - French translations

Translation categories:
- `common` - Common UI elements (buttons, labels, etc.)
- `nav` - Navigation items
- `pricing` - Pricing page content
- `home` - Home page content
- `auth` - Authentication (login/logout)
- `profile` - User profile page
- `payment` - Payment page
- `subscription` - Subscription management
- `bookings` - Booking management
- `claims` - Claims management
- `invoices` - Invoice management
- `wallet` - Wallet page
- `errors` - Error messages

### 4. **Components Created**
- **`src/components/LanguageSwitcher.tsx`** - Language switcher dropdown component
  - Shows current language (EN | FR)
  - Flag icons for visual identification
  - Hover dropdown menu
  - Saves preference to localStorage

### 5. **Pages Updated**
- **Header** (`src/feature-module/common/header.tsx`)
  - Navigation menu items translated
  - Auth buttons translated
  - Language switcher added to navbar
  
- **Pricing** (`src/feature-module/pages/pricing.tsx`)
  - Monthly/Yearly toggle translated
  
- **Home** (`src/feature-module/home/home.tsx`)
  - i18n initialized
  
- **User Profile** (`src/feature-module/user/user-profile.tsx`)
  - Toast messages translated (success, error, reset)
  
- **Payment** (`src/feature-module/user/user-payment.tsx`)
  - i18n initialized

- **Helper Functions** (`src/helpers/input.helper.tsx`)
  - Date formatting supports English error messages

### 6. **Main App Updated**
- **`src/index.tsx`** - Added i18n config import

## 🚀 How to Use

### For Developers

1. **Import the hook in your component:**
```tsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return <h1>{t('common.welcome')}</h1>;
};
```

2. **Use translations in your JSX:**
```tsx
<button>{t('common.save')}</button>
<input placeholder={t('common.searchPlaceholder')} />
```

3. **With variables:**
```tsx
// Translation: "Welcome back, {{name}}!"
<h1>{t('profile.welcomeBack', { name: userName })}</h1>
```

### For Users

1. **Change Language:**
   - Click the language switcher in the top-right corner of the header
   - Select your preferred language (🇬🇧 English or 🇫🇷 Français)
   - Your preference is automatically saved

2. **Language Persistence:**
   - Your language choice is saved in browser localStorage
   - It will be remembered on your next visit

## 📝 Adding New Translations

1. **Add to English file** (`src/i18n/locales/en/translation.json`):
```json
{
  "mySection": {
    "myKey": "My English text"
  }
}
```

2. **Add to French file** (`src/i18n/locales/fr/translation.json`):
```json
{
  "mySection": {
    "myKey": "Mon texte français"
  }
}
```

3. **Use in component:**
```tsx
{t('mySection.myKey')}
```

## 🎨 Language Switcher Location

The language switcher appears in:
- **Desktop**: Top-right corner of header, before login/dashboard buttons
- **Mobile**: Hidden in mobile menu

## 🌐 Supported Languages

- **English (en)** 🇬🇧
- **French (fr)** 🇫🇷

## 🔄 Next Steps (Optional)

To add more translations to existing pages:
1. Search for hardcoded French text in components
2. Add corresponding keys to both translation files
3. Replace hardcoded text with `{t('key')}`

### Priority Pages to Translate:
- Footer
- About Us page
- FAQ page
- Contact Us page
- All user dashboard pages
- Booking pages
- Invoice pages
- Claims pages

## ✅ Testing

1. **Manual Testing:**
   - Visit the website
   - Click the language switcher
   - Verify all translated text changes
   - Refresh the page - language should persist

2. **What's Already Translated:**
   - Header navigation (Home, About, Pricing, Contact)
   - Login/Logout buttons
   - Dashboard button
   - Monthly/Yearly toggle on pricing
   - User profile success/error messages
   - Date formatting helper

## 📚 Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
