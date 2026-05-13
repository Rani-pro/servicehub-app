import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { PhoneNumberInputProps } from './types';
import { countryData, Country } from './countryData';
import { CountryPickerModal } from './CountryPickerModal';
import { styles } from './styles';
import { Colors } from '../../theme/theme';

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = React.memo(({
    value,
    onChangeText,
    onCountryChange,
    defaultCountryCode = 'US',
    containerStyle,
    inputStyle,
    error,
    ...rest
}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    
    const initialCountry = useMemo(() => {
        return countryData.find(c => c.code === defaultCountryCode) || countryData[0];
    }, [defaultCountryCode]);

    const [selectedCountry, setSelectedCountry] = useState<Country>(initialCountry);

    const handleCountrySelect = useCallback((country: Country) => {
        setSelectedCountry(country);
        setModalVisible(false);
        if (onCountryChange) {
            onCountryChange(country);
        }
    }, [onCountryChange]);

    const openModal = useCallback(() => setModalVisible(true), []);
    const closeModal = useCallback(() => setModalVisible(false), []);

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.inputContainer, error ? styles.inputContainerError : null]}>
                {/* Country Selector */}
                <TouchableOpacity
                    style={styles.countrySelector}
                    onPress={openModal}
                    activeOpacity={0.7}
                >
                    <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                    <Text style={styles.dialCodeText}>{selectedCountry.dialCode}</Text>
                    <Ionicons 
                        name="chevron-down" 
                        size={16} 
                        color={Colors.textSecondary} 
                        style={styles.dropdownIcon} 
                    />
                </TouchableOpacity>

                {/* Phone Number Input */}
                <TextInput
                    style={[styles.textInput, inputStyle]}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType="phone-pad"
                    placeholder="Phone number"
                    placeholderTextColor={Colors.textSecondary}
                    {...rest}
                />
            </View>

            {/* Error Message */}
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            {/* Country Picker Modal */}
            <CountryPickerModal
                visible={isModalVisible}
                onClose={closeModal}
                onSelect={handleCountrySelect}
                selectedCountryCode={selectedCountry.code}
            />
        </View>
    );
});

PhoneNumberInput.displayName = 'PhoneNumberInput';
