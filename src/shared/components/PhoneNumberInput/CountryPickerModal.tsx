import React, { useState, useMemo, useCallback } from 'react';
import {
    View,
    Text,
    Modal,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CountryPickerModalProps } from './types';
import { countryData, Country } from './countryData';
import { styles } from './styles';
import { Colors } from '../../theme/theme';

export const CountryPickerModal: React.FC<CountryPickerModalProps> = React.memo(({
    visible,
    onClose,
    onSelect,
    selectedCountryCode,
}) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Memoize filtered data to prevent unnecessary recalculations
    const filteredCountries = useMemo(() => {
        if (!searchQuery) return countryData;
        const lowerQuery = searchQuery.toLowerCase();
        return countryData.filter(
            (country) =>
                country.name.toLowerCase().includes(lowerQuery) ||
                country.dialCode.includes(lowerQuery)
        );
    }, [searchQuery]);

    // Handle Search
    const handleSearch = useCallback((text: string) => {
        setSearchQuery(text);
    }, []);

    // Handle Select
    const handleSelect = useCallback((country: Country) => {
        setSearchQuery(''); // Reset search on select
        onSelect(country);
    }, [onSelect]);

    // Render individual list item
    const renderItem = useCallback(({ item }: { item: Country }) => {
        const isSelected = item.code === selectedCountryCode;
        return (
            <TouchableOpacity
                style={[styles.countryItem, isSelected && styles.selectedCountryItem]}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
            >
                <Text style={styles.countryFlag}>{item.flag}</Text>
                <Text style={styles.countryName} numberOfLines={1}>
                    {item.name}
                </Text>
                <Text style={styles.countryDialCode}>{item.dialCode}</Text>
                {isSelected && (
                    <Ionicons name="checkmark" size={20} color={Colors.primary} style={{ marginLeft: 8 }} />
                )}
            </TouchableOpacity>
        );
    }, [handleSelect, selectedCountryCode]);

    // Key extractor for FlatList
    const keyExtractor = useCallback((item: Country) => item.code, []);

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                            style={styles.modalContent}
                        >
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>Select Country</Text>
                                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                    <Ionicons name="close" size={24} color={Colors.text} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.searchContainer}>
                                <TextInput
                                    style={styles.searchInput}
                                    placeholder="Search country or dial code..."
                                    placeholderTextColor={Colors.textSecondary}
                                    value={searchQuery}
                                    onChangeText={handleSearch}
                                    clearButtonMode="while-editing"
                                    autoCorrect={false}
                                />
                            </View>

                            <FlatList
                                data={filteredCountries}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                contentContainerStyle={styles.listContainer}
                                keyboardShouldPersistTaps="handled"
                                initialNumToRender={20}
                                maxToRenderPerBatch={20}
                            />
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
});

CountryPickerModal.displayName = 'CountryPickerModal';
