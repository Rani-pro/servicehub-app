import { ThemeMode } from '../../shared/theme/theme';

export interface SettingsState {
    isLoading: boolean;
    error: string | null;
    theme: ThemeMode;
}

