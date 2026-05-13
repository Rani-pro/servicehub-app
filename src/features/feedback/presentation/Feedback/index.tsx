import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Icon = MaterialIcon as any;
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { useTheme } from '../../../../shared/hooks/useTheme';
import { getStyles } from './style';
import { CommonHeader } from '../../../../shared/components/CommonHeader';

const FEEDBACK_CATEGORIES = [
    'Bug Report',
    'Feature Request',
    'UI/UX Issue',
    'Performance Issue',
    'General Feedback'
];

const FeedbackScreen = () => {
    const { colors } = useTheme();
    const styles = getStyles(colors);

    const [rating, setRating] = useState<number>(0);
    const [category, setCategory] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [screenshot, setScreenshot] = useState<Asset | null>(null);
    
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleRating = (value: number) => {
        setRating(value);
        if (errors.rating) setErrors(prev => ({ ...prev, rating: '' }));
    };

    const handleCategorySelect = (selectedCategory: string) => {
        setCategory(selectedCategory);
        if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
    };

    const handlePickImage = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.8,
            });

            if (result.assets && result.assets.length > 0) {
                setScreenshot(result.assets[0]);
            }
        } catch (error) {
            console.error('Image picker error', error);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (rating === 0) newErrors.rating = 'Please provide a rating.';
        if (!category) newErrors.category = 'Please select a category.';
        if (!message.trim()) newErrors.message = 'Please enter your feedback.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(() => resolve(undefined), 1500));
            
            Alert.alert(
                'Success!',
                'Thank you for your feedback. We appreciate your input!',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Reset form
                            setRating(0);
                            setCategory('');
                            setMessage('');
                            setEmail('');
                            setScreenshot(null);
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <CommonHeader 
                title="Feedback" 
                leftElement="back" 
                backgroundColor="white" 
            />
            
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardView}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Rating Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Rate your experience <Text style={styles.requiredStar}>*</Text>
                        </Text>
                        <View style={styles.ratingContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity 
                                    key={star} 
                                    onPress={() => handleRating(star)}
                                    activeOpacity={0.7}
                                >
                                    <Icon 
                                        name={star <= rating ? 'star' : 'star-outline'} 
                                        size={48} 
                                        color={star <= rating ? colors.warning : colors.border} 
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        {!!errors.rating && <Text style={styles.errorText}>{errors.rating}</Text>}
                    </View>

                    {/* Category Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>
                            Category <Text style={styles.requiredStar}>*</Text>
                        </Text>
                        <View style={styles.categoriesContainer}>
                            {FEEDBACK_CATEGORIES.map((cat) => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[
                                        styles.categoryChip,
                                        category === cat && styles.categoryChipSelected
                                    ]}
                                    onPress={() => handleCategorySelect(cat)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.categoryText,
                                        category === cat && styles.categoryTextSelected
                                    ]}>
                                        {cat}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {!!errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
                    </View>

                    {/* Message Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>
                            Feedback Details <Text style={styles.requiredStar}>*</Text>
                        </Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Describe your experience..."
                            placeholderTextColor={colors.textSecondary}
                            value={message}
                            onChangeText={(text) => {
                                setMessage(text);
                                if (errors.message) setErrors(prev => ({ ...prev, message: '' }));
                            }}
                            multiline
                            numberOfLines={6}
                        />
                        {!!errors.message && <Text style={styles.errorText}>{errors.message}</Text>}
                    </View>

                    {/* Contact Email Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Email Address (Optional)</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email to hear back from us"
                            placeholderTextColor={colors.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Screenshot Section */}
                    <View style={styles.section}>
                        <Text style={styles.label}>Screenshot (Optional)</Text>
                        {!screenshot ? (
                            <TouchableOpacity 
                                style={styles.uploadButton} 
                                onPress={handlePickImage}
                                activeOpacity={0.7}
                            >
                                <Icon name="camera-plus" size={24} color={colors.primary} />
                                <Text style={styles.uploadText}>Upload Image</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.imagePreviewContainer}>
                                <Image 
                                    source={{ uri: screenshot.uri }} 
                                    style={styles.imagePreview} 
                                    resizeMode="cover"
                                />
                                <TouchableOpacity 
                                    style={styles.removeImageButton}
                                    onPress={() => setScreenshot(null)}
                                >
                                    <Icon name="close" size={20} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            isSubmitting && styles.submitButtonDisabled
                        ]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                        activeOpacity={0.8}
                    >
                        {isSubmitting ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.submitButtonText}>Submit Feedback</Text>
                        )}
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default FeedbackScreen;
