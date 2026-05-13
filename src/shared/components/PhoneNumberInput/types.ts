import { TextInputProps, ViewStyle, TextStyle } from 'react-native';
import { Country } from './countryData';

export interface PhoneNumberInputProps extends Omit<TextInputProps, 'onChangeText'> {
    value?: string;
    onChangeText?: (text: string) => void;
    onCountryChange?: (country: Country) => void;
    defaultCountryCode?: string;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    error?: string;
}

export interface CountryPickerModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (country: Country) => void;
    selectedCountryCode?: string;
}
