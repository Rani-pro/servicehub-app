import { BaseRepository } from '../../../core/baseRepository';
import { authRepository } from '../../auth/data/AuthRepository';

export class SettingsRepository extends BaseRepository {
    async logout(): Promise<void> {
        return authRepository.logout();
    }

    async changePassword(newPassword: string): Promise<void> {
        return authRepository.updatePassword(newPassword);
    }
}

export const settingsRepository = new SettingsRepository();
