import { open, OPSQLiteConnection } from '@op-engineering/op-sqlite';
import logger from '../logger/logger';

/**
 * DatabaseService
 *
 * Singleton that manages the SQLite connection via op-sqlite.
 * All feature repositories that need local DB access call
 * `DatabaseService.getInstance().getDB()` to get the connection.
 *
 * Tables are created here on first open (migrations).
 */
class DatabaseService {
    private static instance: DatabaseService;
    private db: OPSQLiteConnection | null = null;
    private readonly DB_NAME = 'servicehub.db';

    private constructor() {}

    static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    /**
     * Opens the database and runs migrations.
     * Call once at app startup (App.tsx).
     */
    async init(): Promise<void> {
        try {
            this.db = open({ name: this.DB_NAME });
            await this.runMigrations();
            logger.info('[DatabaseService] SQLite opened successfully');
        } catch (error) {
            logger.error('[DatabaseService] Failed to open SQLite', error);
            throw error;
        }
    }

    /**
     * Returns the active DB connection.
     * Throws if init() was not called first.
     */
    getDB(): OPSQLiteConnection {
        if (!this.db) {
            throw new Error('[DatabaseService] DB not initialised. Call init() first.');
        }
        return this.db;
    }

    /**
     * Close the database connection (call on app unmount if needed).
     */
    close(): void {
        this.db?.close();
        this.db = null;
    }

    // ─── Migrations ──────────────────────────────────────────────────────────

    private async runMigrations(): Promise<void> {
        const db = this.getDB();

        // Notes table — stores user notes linked to bookings/services
        await db.executeAsync(`
            CREATE TABLE IF NOT EXISTS notes (
                id          TEXT PRIMARY KEY NOT NULL,
                title       TEXT NOT NULL,
                content     TEXT NOT NULL,
                service_id  TEXT,
                created_at  INTEGER NOT NULL,
                updated_at  INTEGER NOT NULL
            );
        `);

        logger.info('[DatabaseService] Migrations complete');
    }
}

export const databaseService = DatabaseService.getInstance();
