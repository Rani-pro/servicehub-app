import { useAppSelector } from './reduxHooks';
import { LightColors, DarkColors } from '../theme/theme';

export const useTheme = () => {
    const theme = useAppSelector((state) => state.settings.theme);
    const colors = theme === 'dark' ? DarkColors : LightColors;

    return {
        colors,
        theme,
        isDark: theme === 'dark',
    };
};
