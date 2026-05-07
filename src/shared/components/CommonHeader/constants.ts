export type LeftElementType = 'menu' | 'back' | 'none';
export type RightElementType = 'notification' | 'menu' | 'search' | 'more' | 'none';
export type BackgroundType = 'white' | 'primary' | 'transparent';

export const ICON_SIZE = 24;
export const BUTTON_SIZE = 40;
export const BADGE_SIZE = 16;
export const BADGE_MIN_WIDTH = 16;

export const RIGHT_ICON_MAP: Record<string, string> = {
  notification: 'bell-outline',
  search: 'magnify',
  more: 'dots-vertical',
  menu: 'menu',
};

export interface CommonHeaderProps {
  title?: string;
  subtitle?: string;
  leftElement?: LeftElementType;
  rightElement?: RightElementType;
  backgroundColor?: BackgroundType;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showNotificationBadge?: boolean;
  rightIcon?: string;
  leftIcon?: string;
}
