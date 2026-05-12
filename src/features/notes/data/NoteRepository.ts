import { databaseService } from '../../../core/database/database';
import logger from '../../../core/logger/logger';
import { Note, CreateNoteInput, UpdateNoteInput } from './models/Note';

/**
 * NoteRepository
 *
 * Handles all SQLite CRUD operations for the `notes` table.
 * Uses op-sqlite's executeAsync for non-blocking queries.
 *
 * Pattern mirrors BookingRepository / ServicesRepository but
 * talks to local SQLite instead of a remote API.
 */
export class NoteRepository {
    private static instance: NoteRepository;

    private constructor() {}

    static getInstance(): NoteRepository {
        if (!NoteRepository.instance) {
            NoteRepository.instance = new NoteRepository();
        }
        return NoteRepository.instance;
    }

    // ─── CREATE ──────────────────────────────────────────────────────────────

    /**
     * Insert a new note into the database.
     * Returns the newly created Note with generated id and timestamps.
     */
    async create(input: CreateNoteInput): Promise<Note> {
        const db = databaseService.getDB();
        const now = Date.now();
        const id = `note_${now}_${Math.random().toString(36).slice(2, 7)}`;

        await db.executeAsync(
            `INSERT INTO notes (id, title, content, service_id, created_at, updated_at)
             VALUES (?, ?, ?, ?, ?, ?);`,
            [id, input.title, input.content, input.serviceId ?? null, now, now],
        );

        logger.info(`[NoteRepository] Created note id=${id}`);

        return {
            id,
            title: input.title,
            content: input.content,
            serviceId: input.serviceId,
            createdAt: now,
            updatedAt: now,
        };
    }

    // ─── READ ALL ─────────────────────────────────────────────────────────────

    /**
     * Fetch all notes ordered by newest first.
     */
    async getAll(): Promise<Note[]> {
        const db = databaseService.getDB();

        const result = await db.executeAsync(
            `SELECT id, title, content, service_id, created_at, updated_at
             FROM notes
             ORDER BY created_at DESC;`,
        );

        return this.mapRows(result.rows ?? []);
    }

    // ─── READ ONE ─────────────────────────────────────────────────────────────

    /**
     * Fetch a single note by its id.
     * Returns null if not found.
     */
    async getById(id: string): Promise<Note | null> {
        const db = databaseService.getDB();

        const result = await db.executeAsync(
            `SELECT id, title, content, service_id, created_at, updated_at
             FROM notes
             WHERE id = ?;`,
            [id],
        );

        const rows = result.rows ?? [];
        if (rows.length === 0) return null;

        return this.mapRow(rows[0]);
    }

    // ─── UPDATE ──────────────────────────────────────────────────────────────

    /**
     * Update an existing note's fields.
     * Only the provided fields are changed; updated_at is always refreshed.
     */
    async update(id: string, input: UpdateNoteInput): Promise<Note> {
        const existing = await this.getById(id);
        if (!existing) {
            throw new Error(`[NoteRepository] Note not found: ${id}`);
        }

        const db = databaseService.getDB();
        const now = Date.now();

        const updated: Note = {
            ...existing,
            title: input.title ?? existing.title,
            content: input.content ?? existing.content,
            serviceId: input.serviceId !== undefined ? input.serviceId : existing.serviceId,
            updatedAt: now,
        };

        await db.executeAsync(
            `UPDATE notes
             SET title = ?, content = ?, service_id = ?, updated_at = ?
             WHERE id = ?;`,
            [updated.title, updated.content, updated.serviceId ?? null, now, id],
        );

        logger.info(`[NoteRepository] Updated note id=${id}`);
        return updated;
    }

    // ─── DELETE ──────────────────────────────────────────────────────────────

    /**
     * Delete a note by id.
     */
    async delete(id: string): Promise<void> {
        const db = databaseService.getDB();

        await db.executeAsync(
            `DELETE FROM notes WHERE id = ?;`,
            [id],
        );

        logger.info(`[NoteRepository] Deleted note id=${id}`);
    }

    /**
     * Delete all notes (useful for testing / account wipe).
     */
    async deleteAll(): Promise<void> {
        const db = databaseService.getDB();
        await db.executeAsync(`DELETE FROM notes;`);
        logger.info('[NoteRepository] All notes deleted');
    }

    // ─── HELPERS ─────────────────────────────────────────────────────────────

    /** Map a raw SQLite row object to a typed Note */
    private mapRow(row: Record<string, unknown>): Note {
        return {
            id: row.id as string,
            title: row.title as string,
            content: row.content as string,
            serviceId: row.service_id as string | undefined,
            createdAt: row.created_at as number,
            updatedAt: row.updated_at as number,
        };
    }

    private mapRows(rows: Record<string, unknown>[]): Note[] {
        return rows.map(r => this.mapRow(r));
    }
}

export const noteRepository = NoteRepository.getInstance();
