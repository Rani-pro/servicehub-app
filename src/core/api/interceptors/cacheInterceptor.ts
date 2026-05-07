import {AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {TokenStorageService} from '../../storage/secureStorage';
import {envConfig} from '../../config/env';
import {endpoints} from '../networkConstants';
import {NETWORK_CONFIG} from '../apiConfig';
import logger from '../../logger/logger';
import {STORAGE_KEYS} from '../../storage/storageKeys';
import {getData, storeData, deleteUserStorageSpecificData} from '../../storage/mmkvStorage';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface CacheEntry {
  data: any;
  timestamp: number;
  headers: any;
  status: number;
}

interface CacheInterceptor {
  requestInterceptor: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
  requestErrorInterceptor: (error: AxiosError) => Promise<any>;
  responseInterceptor: (response: AxiosResponse) => AxiosResponse;
  responseErrorInterceptor: (error: AxiosError) => Promise<any>;
}

/* -------------------------------------------------------------------------- */
/*                               CACHE MANAGER                                */
/* -------------------------------------------------------------------------- */

class CacheManager {
  private static instance: CacheManager;

  private cache = new Map<string, CacheEntry>();
  private readonly cachePrefix = STORAGE_KEYS.CACHE.PREFIX;
  private readonly maxCacheSize = 100;

  private constructor() {}

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  /* ------------------------------- UTILITIES ------------------------------- */

  private generateCacheKey(config: AxiosRequestConfig): string {
    const {method, url, params, data} = config;
    const rawKey = `${method?.toUpperCase()}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`;

    return rawKey.replace(/[^a-zA-Z0-9]/g, '_');
  }

  private isCacheable(config: AxiosRequestConfig): boolean {
    if (config.method?.toLowerCase() !== 'get' || !envConfig.enableCache) {
      return false;
    }

    const cacheControl = config.headers?.['cache-control'] as string;
    if (cacheControl?.includes('no-cache') || cacheControl?.includes('no-store')) {
      return false;
    }

    const url = config.url ?? '';
    const cacheablePatterns = [
      endpoints.users,
      endpoints.profile,
      endpoints.customers,
      endpoints.locations,
      endpoints.installers,
      endpoints.ymm_make,
      endpoints.ymm_model,
      endpoints.ymm_style,
      endpoints.vin_decoder_search_history,
    ];

    return cacheablePatterns.some(pattern => url.includes(pattern));
  }

  private isExpired(entry: CacheEntry): boolean {
    return Date.now() - entry.timestamp > NETWORK_CONFIG.CACHE_DURATION;
  }

  /* ------------------------------ STORAGE HELPERS --------------------------- */

  private loadFromStorage(key: string): CacheEntry | null {
    return getData(this.cachePrefix + key) as CacheEntry | null;
  }

  private saveToStorage(key: string, entry: CacheEntry): void {
    storeData(this.cachePrefix + key, entry);
  }

  private deleteFromStorage(key: string): void {
    deleteUserStorageSpecificData(this.cachePrefix + key);
  }

  /* --------------------------------- PUBLIC -------------------------------- */

  public get(config: AxiosRequestConfig): CacheEntry | null {
    const key = this.generateCacheKey(config);

    let entry: CacheEntry | null | undefined = this.cache.get(key);

    // Lazy load from MMKV
    if (!entry) {
      entry = this.loadFromStorage(key);
      if (entry) {
        this.cache.set(key, entry);
      }
    }

    if (!entry || this.isExpired(entry)) {
      this.cache.delete(key);
      this.deleteFromStorage(key);
      return null;
    }

    return entry;
  }

  public set(config: AxiosRequestConfig, response: AxiosResponse): void {
    if (!this.isCacheable(config)) return;

    const key = this.generateCacheKey(config);

    const entry: CacheEntry = {
      data: response.data,
      timestamp: Date.now(),
      headers: response.headers,
      status: response.status,
    };

    this.cache.set(key, entry);
    this.saveToStorage(key, entry);

    if (this.cache.size > this.maxCacheSize) {
      this.cleanup();
    }
  }

  public clear(): void {
    this.cache.forEach((_, key) => this.deleteFromStorage(key));
    this.cache.clear();
  }

  public remove(key: string): void {
    this.cache.delete(key);
    this.deleteFromStorage(key);
  }

  public getStats(): {size: number; maxSize: number} {
    return {
      size: this.cache.size,
      maxSize: this.maxCacheSize,
    };
  }

  /* -------------------------------- CLEANUP -------------------------------- */

  private cleanup(): void {
    const entries = Array.from(this.cache.entries()).sort((a, b) => a[1].timestamp - b[1].timestamp);

    const toRemove = entries.slice(0, Math.floor(this.maxCacheSize * 0.2));

    toRemove.forEach(([key]) => {
      this.cache.delete(key);
      this.deleteFromStorage(key);
    });
  }
}

/* -------------------------------------------------------------------------- */
/*                              AXIOS INTERCEPTOR                              */
/* -------------------------------------------------------------------------- */

export const cacheInterceptor: CacheInterceptor = {
  requestInterceptor: async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const cacheManager = CacheManager.getInstance();
    const cachedEntry = cacheManager.get(config);

    if (cachedEntry) {
      logger.debug(`CacheInterceptor: Serving cached response for ${config.url}`);

      const cachedResponse: AxiosResponse = {
        data: cachedEntry.data,
        status: cachedEntry.status,
        statusText: 'OK (From Cache)',
        headers: cachedEntry.headers,
        config,
      };

      // Use a custom adapter to short-circuit the request and return the cached response
      config.adapter = () => Promise.resolve(cachedResponse);
    }

    return config;
  },

  requestErrorInterceptor: async (error: AxiosError) => {
    return Promise.reject(error);
  },

  responseInterceptor: (response: AxiosResponse): AxiosResponse => {
    if (response.statusText !== 'OK (From Cache)') {
      CacheManager.getInstance().set(response.config, response);
    }
    return response;
  },

  responseErrorInterceptor: async (error: AxiosError) => {
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      const cacheManager = CacheManager.getInstance();
      const cachedEntry = error.config ? cacheManager.get(error.config) : null;

      if (cachedEntry && error.config) {
        logger.info(`CacheInterceptor: Network failed, serving stale cache for ${error.config.url}`);

        const cachedResponse: AxiosResponse = {
          data: cachedEntry.data,
          status: cachedEntry.status,
          statusText: 'OK (Stale Cache)',
          headers: cachedEntry.headers,
          config: error.config,
        };

        return Promise.resolve(cachedResponse);
      }
    }

    return Promise.reject(error);
  },
};

/**
 * Utility function to clear all cached API responses.
 * Used during logout to ensure no user-specific data remains.
 */
export const clearApiCache = () => {
  CacheManager.getInstance().clear();
};
