import JailMonkey from 'jail-monkey';
import { Alert, BackHandler, Platform } from 'react-native';

/**
 * Security Service
 * 
 * Provides methods for device security checks like Root/Jailbreak detection.
 */
export class SecurityService {
  private static instance: SecurityService;

  private constructor() {}

  public static getInstance(): SecurityService {
    if (!SecurityService.instance) {
      SecurityService.instance = new SecurityService();
    }
    return SecurityService.instance;
  }

  /**
   * Performs basic security checks for Root/Jailbreak.
   * If the device is compromised, it alerts the user and may terminate the app.
   */
  public async performSecurityChecks(): Promise<boolean> {
    const isJailBroken = JailMonkey.isJailBroken();
    const canMockLocation = JailMonkey.canMockLocation();
    const isTrustworthy = !isJailBroken && !canMockLocation;

    if (!isTrustworthy) {
      this.handleSecurityCompromise(isJailBroken, canMockLocation);
      return false;
    }

    console.log('[SecurityService] Device security check passed');
    return true;
  }

  /**
   * Handles the UI and logic when a security risk is detected.
   */
  private handleSecurityCompromise(isJailBroken: boolean, canMockLocation: boolean) {
    let title = 'Security Risk Detected';
    let message = 'This application cannot run on a compromised device for security reasons.';

    if (isJailBroken) {
      message = 'Your device appears to be Rooted or Jailbroken. ' + message;
    } else if (canMockLocation) {
      message = 'Mock location services are enabled. ' + message;
    }

    Alert.alert(
      title,
      message,
      [
        {
          text: 'OK',
          onPress: () => {
            if (Platform.OS === 'android') {
              BackHandler.exitApp();
            }
          },
        },
      ],
      { cancelable: false }
    );
  }
}

export const securityService = SecurityService.getInstance();
