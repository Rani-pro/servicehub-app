import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {envConfig} from '../config/env';
import {AXIOS_CONFIG} from './apiConfig';
import {
  authInterceptor,
  cacheInterceptor,
  connectivityInterceptor,
  errorInterceptor,
  loggerInterceptor,
  retryInterceptor,
} from './interceptors/index';

/**
 * NetworkModule handles the initialization and configuration of the Axios HTTP client.
 * It implements the singleton pattern to ensure a consistent network state (base URL, timeouts, interceptors).
 */
export class NetworkModule {
  private static instance: NetworkModule;
  private axiosClient: AxiosInstance;

  private constructor() {
    this.axiosClient = this.createAxiosClient();
    this.setupInterceptors();
  }

  /** Returns the singleton instance of the NetworkModule. */
  public static getInstance(): NetworkModule {
    if (!NetworkModule.instance) {
      NetworkModule.instance = new NetworkModule();
    }
    return NetworkModule.instance;
  }

  /** Returns the configured AxiosInstance ready for use. */
  public getAxiosClient(): AxiosInstance {
    return this.axiosClient;
  }

  /**
   * Internal factory to create a new Axios instance with default configurations.
   */
  private createAxiosClient(): AxiosInstance {
    const config: AxiosRequestConfig = {
      ...AXIOS_CONFIG,
      baseURL: envConfig.apiBaseUrl,
    };

    return axios.create(config);
  }

  /**
   * Orchestrates the registration of all request and response interceptors.
   * Interceptors are executed in the order they are added (request) or reversed (response).
   */
  private setupInterceptors(): void {
    /* --- Request Interceptors (Reverse Execution Order) --- */

    // 4. Authentication (Attached last, runs FIRST after Logger/Cache/Retry/Connectivity?)
    // NOTE: Request interceptors execute in REVERSE order.
    // Connectivity is registered last so it runs FIRST (fail fast).
    // Wait, if it's reverse: Added [C, R, CA, L, A], Executed [A -> L -> CA -> R -> C]
    // This is still wrong. I want Connectivity to run FIRST.
    // So I should add Connectivity LAST.

    // 1. Authentication (Attaches tokens)
    if (authInterceptor.requestInterceptor) {
      this.axiosClient.interceptors.request.use(
        authInterceptor.requestInterceptor as any,
        authInterceptor.requestErrorInterceptor
      );
    }

    // 2. Logger (Captures final state)
    if (loggerInterceptor.requestInterceptor) {
      this.axiosClient.interceptors.request.use(
        loggerInterceptor.requestInterceptor as any,
        loggerInterceptor.requestErrorInterceptor
      );
    }

    // 3. Client-side Caching
    if (cacheInterceptor.requestInterceptor) {
      this.axiosClient.interceptors.request.use(cacheInterceptor.requestInterceptor as any);
    }

    // 4. Retry Logic
    if (retryInterceptor.requestInterceptor) {
      this.axiosClient.interceptors.request.use(
        retryInterceptor.requestInterceptor as any,
        retryInterceptor.requestErrorInterceptor
      );
    }

    // 5. Connectivity Check (FAIL FAST - Registered last, runs FIRST)
    if (connectivityInterceptor.requestInterceptor) {
      this.axiosClient.interceptors.request.use(
        connectivityInterceptor.requestInterceptor as any,
        connectivityInterceptor.requestErrorInterceptor as any
      );
    }

    /* --- Response Interceptors (Sequential Execution Order) --- */

    // 1. Authentication (Handles 401/Refresh)
    if (authInterceptor.responseInterceptor || authInterceptor.responseErrorInterceptor) {
      this.axiosClient.interceptors.response.use(
        authInterceptor.responseInterceptor,
        authInterceptor.responseErrorInterceptor as any
      );
    }

    // 2. Logger (Logs raw or cached response)
    if (loggerInterceptor.responseInterceptor || loggerInterceptor.responseErrorInterceptor) {
      this.axiosClient.interceptors.response.use(
        loggerInterceptor.responseInterceptor,
        loggerInterceptor.responseErrorInterceptor as any
      );
    }

    // 3. Cache Storage (Persists responses)
    if (cacheInterceptor.responseInterceptor || cacheInterceptor.responseErrorInterceptor) {
      this.axiosClient.interceptors.response.use(
        cacheInterceptor.responseInterceptor,
        cacheInterceptor.responseErrorInterceptor as any
      );
    }

    // 4. Retry Evaluation (Determines if fail is recoverable)
    if (retryInterceptor.responseInterceptor || retryInterceptor.responseErrorInterceptor) {
      this.axiosClient.interceptors.response.use(
        retryInterceptor.responseInterceptor,
        retryInterceptor.responseErrorInterceptor as any
      );
    }

    // 5. Global Error Handling (Final Transformation)
    if (errorInterceptor.responseInterceptor || errorInterceptor.responseErrorInterceptor) {
      this.axiosClient.interceptors.response.use(
        errorInterceptor.responseInterceptor,
        errorInterceptor.responseErrorInterceptor as any
      );
    }
  }

  /** Dynamically updates the base URL for the existing AxiosInstance. */
  public updateBaseURL(newBaseURL: string): void {
    this.axiosClient.defaults.baseURL = newBaseURL;
  }

  /** Dynamically updates the timeout for the existing AxiosInstance. */
  public updateTimeout(timeout: number): void {
    this.axiosClient.defaults.timeout = timeout;
  }
}

/** Pre-instantiated singleton instance for ease of use. */
export const networkModule = NetworkModule.getInstance();
/** Ready-to-use Axios client for the entire application. */
export const axiosClient = networkModule.getAxiosClient();
