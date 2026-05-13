import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Alert,
    Modal,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import Button from '../../../../../shared/components/Button';
import Input from '../../../../../shared/components/Input';
import Card from '../../../../../shared/components/Card';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import {
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
} from '../../../store/notesSlice';
import { Note } from '../../../data/models/Note';
import { styles } from './style';

const NotesScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { colors } = useTheme();
    const { notes, isLoading, error } = useAppSelector(state => state.notes);

    const [modalVisible, setModalVisible] = useState(false);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    useEffect(() => {
        dispatch(fetchNotes());
    }, [dispatch]);

    const openAddModal = () => {
        setEditingNote(null);
        setTitle('');
        setContent('');
        setTitleError('');
        setContentError('');
        setModalVisible(true);
    };

    const openEditModal = (note: Note) => {
        setEditingNote(note);
        setTitle(note.title);
        setContent(note.content);
        setTitleError('');
        setContentError('');
        setModalVisible(true);
    };

    const validate = (): boolean => {
        let valid = true;
        if (!title.trim()) { setTitleError('Title is required'); valid = false; }
        else setTitleError('');
        if (!content.trim()) { setContentError('Content is required'); valid = false; }
        else setContentError('');
        return valid;
    };

    const handleSave = useCallback(async () => {
        if (!validate()) return;
        if (editingNote) {
            await dispatch(updateNote({ id: editingNote.id, input: { title: title.trim(), content: content.trim() } }));
        } else {
            await dispatch(createNote({ title: title.trim(), content: content.trim() }));
        }
        setModalVisible(false);
    }, [dispatch, editingNote, title, content]);

    const handleDelete = (note: Note) => {
        Alert.alert('Delete Note', `Delete "${note.title}"?`, [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => dispatch(deleteNote(note.id)) },
        ]);
    };

    const renderItem = ({ item }: { item: Note }) => (
        <Card style={styles.card} shadow="small">
            <TouchableOpacity style={styles.cardBody} onPress={() => openEditModal(item)} activeOpacity={0.7}>
                <View style={styles.cardTop}>
                    <ResponsiveText variant="h4" color={colors.text} style={styles.cardTitle} numberOfLines={1}>
                        {item.title}
                    </ResponsiveText>
                    <TouchableOpacity onPress={() => handleDelete(item)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                        <ResponsiveText variant="body" color={colors.danger}>✕</ResponsiveText>
                    </TouchableOpacity>
                </View>
                <ResponsiveText variant="bodySmall" color={colors.textSecondary} numberOfLines={2} style={styles.cardContent}>
                    {item.content}
                </ResponsiveText>
                <ResponsiveText variant="caption" color={colors.textSecondary}>
                    {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </ResponsiveText>
            </TouchableOpacity>
        </Card>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <CommonHeader title="My Notes" leftElement="menu" rightElement="none" backgroundColor="primary" />

            {error ? (
                <View style={[styles.errorBanner, { backgroundColor: colors.danger + '20' }]}>
                    <ResponsiveText variant="bodySmall" color={colors.danger}>{error}</ResponsiveText>
                </View>
            ) : null}

            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={[styles.listContent, notes.length === 0 && styles.emptyContainer]}
                ListEmptyComponent={
                    !isLoading ? (
                        <ResponsiveText variant="body" color={colors.textSecondary} style={styles.emptyText}>
                            No notes yet. Tap "+ New Note" to create one.
                        </ResponsiveText>
                    ) : null
                }
            />

            {!modalVisible && (
                <View style={styles.fabContainer}>
                    <Button title="+ New Note" onPress={openAddModal} variant="primary" size="medium" />
                </View>
            )}

            {/* ── Modal ── */}
            <Modal visible={modalVisible} animationType="slide" transparent statusBarTranslucent>
                {/*
                 * Outer TouchableWithoutFeedback dismisses keyboard when tapping the dark overlay.
                 * Inner TouchableWithoutFeedback stops the tap from propagating to the overlay
                 * so the modal doesn't close when tapping inside the sheet.
                 * No KeyboardAvoidingView — ScrollView with keyboardShouldPersistTaps="handled"
                 * handles the keyboard correctly on both platforms without layout thrashing.
                 */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.modalBox, { backgroundColor: colors.white }]}>
                                <ScrollView
                                    keyboardShouldPersistTaps="always"
                                    showsVerticalScrollIndicator={false}
                                    bounces={false}
                                    contentContainerStyle={styles.modalScroll}
                                >
                                    <ResponsiveText variant="h3" color={colors.text} style={styles.modalTitle}>
                                        {editingNote ? 'Edit Note' : 'New Note'}
                                    </ResponsiveText>

                                    <Input
                                        label="Title"
                                        value={title}
                                        onChangeText={setTitle}
                                        placeholder="Enter note title"
                                        error={titleError}
                                        autoCapitalize="sentences"
                                    />

                                    <Input
                                        label="Content"
                                        value={content}
                                        onChangeText={setContent}
                                        placeholder="Write your note here..."
                                        error={contentError}
                                        multiline
                                        numberOfLines={5}
                                        size="large"
                                        style={styles.contentInput}
                                    />

                                    <View style={styles.modalActions}>
                                        <Button
                                            title="Cancel"
                                            onPress={() => setModalVisible(false)}
                                            variant="danger"
                                            style={styles.modalBtn}
                                        />
                                        <Button
                                            title={editingNote ? 'Update' : 'Save'}
                                            onPress={handleSave}
                                            loading={isLoading}
                                            style={styles.modalBtn}
                                        />
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default NotesScreen;
