/**
 * Note — local SQLite model
 *
 * A user note that can optionally be linked to a service.
 */
export interface Note {
    id: string;
    title: string;
    content: string;
    serviceId?: string;   // optional FK to a service
    createdAt: number;    // Unix timestamp (ms)
    updatedAt: number;
}

/** Payload for creating a new note */
export type CreateNoteInput = Pick<Note, 'title' | 'content' | 'serviceId'>;

/** Payload for updating an existing note */
export type UpdateNoteInput = Partial<Pick<Note, 'title' | 'content' | 'serviceId'>>;
