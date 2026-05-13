export interface Country {
    name: string;
    dialCode: string;
    code: string;
    flag: string;
}

export const countryData: Country[] = [
    { name: 'United States', dialCode: '+1', code: 'US', flag: '🇺🇸' },
    { name: 'United Kingdom', dialCode: '+44', code: 'GB', flag: '🇬🇧' },
    { name: 'Canada', dialCode: '+1', code: 'CA', flag: '🇨🇦' },
    { name: 'Australia', dialCode: '+61', code: 'AU', flag: '🇦🇺' },
    { name: 'India', dialCode: '+91', code: 'IN', flag: '🇮🇳' },
    { name: 'Germany', dialCode: '+49', code: 'DE', flag: '🇩🇪' },
    { name: 'France', dialCode: '+33', code: 'FR', flag: '🇫🇷' },
    { name: 'Italy', dialCode: '+39', code: 'IT', flag: '🇮🇹' },
    { name: 'Spain', dialCode: '+34', code: 'ES', flag: '🇪🇸' },
    { name: 'Japan', dialCode: '+81', code: 'JP', flag: '🇯🇵' },
    { name: 'China', dialCode: '+86', code: 'CN', flag: '🇨🇳' },
    { name: 'Brazil', dialCode: '+55', code: 'BR', flag: '🇧🇷' },
    { name: 'Mexico', dialCode: '+52', code: 'MX', flag: '🇲🇽' },
    { name: 'South Africa', dialCode: '+27', code: 'ZA', flag: '🇿🇦' },
    { name: 'New Zealand', dialCode: '+64', code: 'NZ', flag: '🇳🇿' },
    { name: 'Singapore', dialCode: '+65', code: 'SG', flag: '🇸🇬' },
    { name: 'United Arab Emirates', dialCode: '+971', code: 'AE', flag: '🇦🇪' },
    { name: 'Saudi Arabia', dialCode: '+966', code: 'SA', flag: '🇸🇦' },
    // Add more as needed, keeping it somewhat concise for performance/demo purposes
];
