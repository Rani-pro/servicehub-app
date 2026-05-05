import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import Counter from '../../components/Counter';
import Timer from '../../components/Timer';
import { styles } from './style';
import Button from '../../../../../shared/components/Button';
import { authRepository } from '../../../../auth/data/AuthRepository';
import { logout } from '../../../../auth/store/authSlice';
import firebase from '@react-native-firebase/app';

const PracticeScreen: React.FC = () => {
    const dispatch = useDispatch();

    // useState examples
    const [clickCount, setClickCount] = useState(0);
    const [userName, setUserName] = useState('Guest User');
    const [isVisible, setIsVisible] = useState(true);
    const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);

    useEffect(() => {
        const app = firebase.app();
        console.log('🔥 Firebase Connected:', app.name);
    }, []);

    const handleLogout = async () => {
        try {
            await authRepository.logout();
            dispatch(logout());
        } catch (error: any) {
            Alert.alert('Logout Failed', error.message);
        }
    };

    const incrementCounter = () => {
        setClickCount(prevCount => prevCount + 1);
    };

    const toggleVisibility = () => {
        setIsVisible(prev => !prev);
    };

    const addNewItem = () => {
        const newItem = `Item ${items.length + 1}`;
        setItems(prevItems => [...prevItems, newItem]);
    };

    const changeName = () => {
        const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Guest User'];
        const randomName = names[Math.floor(Math.random() * names.length)];
        setUserName(randomName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Practice Feature</Text>
                    <Button
                        title="Logout"
                        onPress={handleLogout}
                        style={styles.logoutButton}
                        size="small"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>useState Examples</Text>
                    
                    {/* Simple Counter */}
                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleTitle}>Simple Counter: {clickCount}</Text>
                        <TouchableOpacity style={styles.button} onPress={incrementCounter}>
                            <Text style={styles.buttonText}>Click Me! (+1)</Text>
                        </TouchableOpacity>
                    </View>

                    {/* String State */}
                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleTitle}>Current User: {userName}</Text>
                        <TouchableOpacity style={styles.button} onPress={changeName}>
                            <Text style={styles.buttonText}>Change Name</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Boolean State */}
                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleTitle}>Toggle Visibility</Text>
                        <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
                            <Text style={styles.buttonText}>
                                {isVisible ? 'Hide' : 'Show'} Content
                            </Text>
                        </TouchableOpacity>
                        {isVisible && (
                            <Text style={styles.hiddenText}>
                                🎉 This content is now visible!
                            </Text>
                        )}
                    </View>

                    {/* Array State */}
                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleTitle}>Dynamic List ({items.length} items)</Text>
                        <TouchableOpacity style={styles.button} onPress={addNewItem}>
                            <Text style={styles.buttonText}>Add New Item</Text>
                        </TouchableOpacity>
                        {items.map((item, index) => (
                            <Text key={index} style={styles.listItem}>
                                • {item}
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>State Management (useState)</Text>
                    <Counter label="Item Counter" initialValue={5} />
                    <Counter label="Point Tracker" />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Side Effects (useEffect)</Text>
                    <Timer label="Session Timer" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default PracticeScreen;
