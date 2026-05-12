import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { noteRepository } from '../data/NoteRepository';
import { Note, CreateNoteInput, UpdateNoteInput } from '../data/models/Note';

// ─── State ────────────────────────────────────────────────────────────────────

interface NotesState {
    notes: Note[];
    isLoading: boolean;
    error: string | null;
}

const initialState: NotesState = {
    notes: [],
    isLoading: false,
    error: null,
};

// ─── Thunks (async CRUD actions) ──────────────────────────────────────────────

/** Fetch all notes from SQLite */
export const fetchNotes = createAsyncThunk('notes/fetchAll', async () => {
    return noteRepository.getAll();
});

/** Create a new note in SQLite */
export const createNote = createAsyncThunk(
    'notes/create',
    async (input: CreateNoteInput) => {
        return noteRepository.create(input);
    },
);

/** Update an existing note in SQLite */
export const updateNote = createAsyncThunk(
    'notes/update',
    async ({ id, input }: { id: string; input: UpdateNoteInput }) => {
        return noteRepository.update(id, input);
    },
);

/** Delete a note from SQLite */
export const deleteNote = createAsyncThunk(
    'notes/delete',
    async (id: string) => {
        await noteRepository.delete(id);
        return id; // return id so reducer can remove it from state
    },
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: builder => {
        // ── fetchNotes ──
        builder
            .addCase(fetchNotes.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
                state.isLoading = false;
                state.notes = action.payload;
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Failed to load notes';
            });

        // ── createNote ──
        builder
            .addCase(createNote.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(createNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.isLoading = false;
                state.notes.unshift(action.payload); // add to top
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Failed to create note';
            });

        // ── updateNote ──
        builder
            .addCase(updateNote.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
                state.isLoading = false;
                const idx = state.notes.findIndex(n => n.id === action.payload.id);
                if (idx !== -1) state.notes[idx] = action.payload;
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Failed to update note';
            });

        // ── deleteNote ──
        builder
            .addCase(deleteNote.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
                state.isLoading = false;
                state.notes = state.notes.filter(n => n.id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message ?? 'Failed to delete note';
            });
    },
});

export const { clearError } = notesSlice.actions;
export default notesSlice.reducer;
