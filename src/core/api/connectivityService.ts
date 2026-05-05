import NetInfo, {NetInfoState, NetInfoSubscription} from '@react-native-community/netinfo';
import logger from '../logger/logger';

/**
 * Union type for all supported connection vehicles.
 */
export type ConnectionType = 'wifi' | 'cellular' | 'none' | 'unknown' | 'bluetooth' | 'ethernet' | 'wimax' | 'vpn';

/**
 * Interface representing the refined connectivity state of the device.
 */
export interface ConnectivityState {
  isConnected: boolean;
  isInternetReachable: boolean | null;
  type: ConnectionType;
  isWifi: boolean;
  isCellular: boolean;
  isEthernet: boolean;
  isBluetooth: boolean;
  isVpn: boolean;
  isWimax: boolean;
  isUnknown: boolean;
  isNone: boolean;
}

/** Callback function type for connectivity change events. */
export type ConnectivityListener = (state: ConnectivityState) => void;

/**
 * Singleton service for monitoring and querying the device's network connectivity status.
 * Abstracts @react-native-community/netinfo and provides meaningful utility methods.
 */
export class ConnectivityService {
  private static instance: ConnectivityService;
  private listeners: Set<ConnectivityListener> = new Set();
  private subscription: NetInfoSubscription | null = null;
  private currentState: ConnectivityState | null = null;

  private constructor() {
    this.initialize();
  }

  /**
   * Returns the singleton instance of the service.
   */
  public static getInstance(): ConnectivityService {
    if (!ConnectivityService.instance) {
      ConnectivityService.instance = new ConnectivityService();
    }
    return ConnectivityService.instance;
  }

  /**
   * Resets the singleton instance for testing purposes.
   */
  public static resetInstance(): void {
    if (ConnectivityService.instance) {
      ConnectivityService.instance.destroy();
      (ConnectivityService as any).instance = null;
    }
  }

  /**
   * Initializes the service by fetching the current state and subscribing to changes.
   */
  private async initialize(): Promise<void> {
    const netInfoState = await NetInfo.fetch();
    this.currentState = this.transformNetInfoState(netInfoState);
    this.subscription = NetInfo.addEventListener(this.handleNetInfoChange.bind(this));
    logger.debug('ConnectivityService initialized', this.currentState);
  }

  /**
   * Handles state changes from NetInfo and notifies all registered listeners.
   */
  private handleNetInfoChange(state: NetInfoState): void {
    const connectivityState = this.transformNetInfoState(state);

    // Only notify if connection status actually changed
    if (this.currentState?.isConnected !== connectivityState.isConnected) {
      logger.info(`Network connection state changed: ${connectivityState.isConnected ? 'CONNECTED' : 'OFFLINE'}`);
    }

    this.currentState = connectivityState;

    // Notify all listeners
    this.listeners.forEach(listener => {
      try {
        listener(connectivityState);
      } catch (error) {
        logger.error('Error in connectivity listener callback:', error);
      }
    });
  }

  /**
   * Maps NetInfoState to our internal ConnectivityState interface.
   */
  private transformNetInfoState(netInfoState: NetInfoState): ConnectivityState {
    const type = netInfoState.type as ConnectionType;

    return {
      isConnected: netInfoState.isConnected ?? false,
      isInternetReachable: netInfoState.isInternetReachable,
      type,
      isWifi: type === 'wifi',
      isCellular: type === 'cellular',
      isEthernet: type === 'ethernet',
      isBluetooth: type === 'bluetooth',
      isVpn: type === 'vpn',
      isWimax: type === 'wimax',
      isUnknown: type === 'unknown',
      isNone: type === 'none',
    };
  }

  /** Returns the most recent captured connectivity state. */
  public getCurrentState(): ConnectivityState | null {
    return this.currentState;
  }

  /** Returns true if the device is currently reported as connected. */
  public isConnected(): boolean {
    return this.currentState?.isConnected ?? false;
  }

  /** Returns true if the internet is confirmed to be reachable. */
  public isInternetReachable(): boolean {
    return this.currentState?.isInternetReachable ?? false;
  }

  /** Checks if the current connection is via WiFi. */
  public isWifi(): boolean {
    return this.currentState?.isWifi ?? false;
  }

  /** Checks if the current connection is via a cellular network. */
  public isCellular(): boolean {
    return this.currentState?.isCellular ?? false;
  }

  /**
   * Adds a listener for connectivity changes.
   * @returns An unsubscribe function to stop listening.
   */
  public addListener(listener: ConnectivityListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Removes a previously registered listener.
   */
  public removeListener(listener: ConnectivityListener): void {
    this.listeners.delete(listener);
  }

  /**
   * Returns a quality indicator based on the connection type.
   */
  public getConnectionQuality(): 'excellent' | 'good' | 'poor' | 'none' {
    if (!this.isConnected()) return 'none';
    const type = this.currentState?.type;

    switch (type) {
      case 'ethernet':
        return 'excellent';
      case 'wifi':
        return 'good';
      case 'cellular':
        return 'poor';
      default:
        return 'poor';
    }
  }

  /**
   * Forces a manual refresh of the network state.
   */
  public async refresh(): Promise<ConnectivityState> {
    const netInfoState = await NetInfo.fetch();
    const connectivityState = this.transformNetInfoState(netInfoState);
    this.currentState = connectivityState;
    return connectivityState;
  }

  /**
   * Cleans up subscriptions and listeners.
   */
  public destroy(): void {
    if (this.subscription) {
      this.subscription();
      this.subscription = null;
    }
    this.listeners.clear();
    logger.debug('ConnectivityService destroyed');
  }
}

/**
 * Singleton instance of the ConnectivityService.
 */
export const connectivityService = ConnectivityService.getInstance();
