import { envConfig } from '../config/env';
import { tokenStorage } from '../storage/secureStorage';
import logError from '../../shared/utils/logError';

/**
 * Base URL for all API endpoints, fetched from environment configuration.
 * @constant {string}
 */
export let BASE_URL = envConfig.apiBaseUrl;
const VIN_SEARCH_BASE_URL = envConfig.vinSearchUrl;

/**
 * Call this once at app startup to override BASE_URL if home_url exists
 */
export const initBaseUrl = async () => {
  try {
    const storedUrl = await tokenStorage.getItem('home_url');
    if (storedUrl) {
      BASE_URL = storedUrl;
    } else {
      BASE_URL = envConfig.apiBaseUrl;
    }
  } catch (error) {
    logError('BaseURL', 'networkConstants', error);
  }
};

/**
 * Object containing all API endpoint paths.
 * @constant {Object<string, string>}
 */

//**
// TODO: Suggestion: Organize endpoints into modular classes or objects by feature for better maintainability.
// Store API prefix and version in variables or environment config for easy updates across all endpoints.

// Example modular class for VinDecoder endpoints:
// const API_PREFIX = '/api';
// const API_VERSION = '/V1';

// export class VinDecoderEndpoint {
//   static base = `${API_PREFIX}${API_VERSION}/vindecoder`;
//   static uris = {
//     search: `${VinDecoderEndpoint.base}/search`,
//     history: `${VinDecoderEndpoint.base}/history`,
//   };
// }
//
// then in endpoints object:
//
// vinDecoder: VinDecoderEndpoint.uris,

//
// Of course, we can change this as necessary and based on the different API endpoints.

export const endpoints = {
  error: '/404',
  /* Login & Refresh Token APIs */
  login: '/api/V1/tokens/app-login',
  refreshToken: '/api/V1/tokens/app-refresh',
  /* Settings & Dashboard APIs */
  profile: '/api/V1/identity/profile',
  profile_image: '/api/V1/identity/profile-image',
  profile_password: '/api/V1/identity/profile-password',
  signtos: '/api/V1/identity/signtos',
  termsOfService: '/documents/terms_of_service.pdf',
  logout: '/api/V1/tokens/logout',
  /* Password Reset API */
  password_reset: '/api/V1/identity/forgot-password',
  /* Vindecoder Search APIs */
  ymm_make: '/ymmb/makesall',
  ymm_model: '/ymmb/modelbymakeyear',
  ymm_style: '/ymmb/bodybyymm',
  vin_decoder_search: '/api/V1/vindecoder/search',
  vin_decoder_search_history: '/api/V1/vindecoder/history',
  /* Vindecoder Filter APIs */
  vin_decoder_init_filter: '/api/V1/vdfilterapi/initfiltering',
  vin_decoder_filter_reset_questions: '/api/V1/vdfilterapi/resetquestions',
  vin_decoder_filter_next_question: '/api/V1/vdfilterapi/getnextquestion',
  vin_decoder_filter_submit_answer: '/api/V1/vdfilterapi/submitanswer',
  /* Users List */
  users: '/api/V1/identity/users',
  users_paginated: '/api/V1/identity/users-paginated',
  roles: '/api/V1/identity/roles',
  location_names: '/api/V1/locations/names',
  /* Customers List */
  customers: '/api/V1/customers',
  locations: '/api/V1/locations/names',
  installers: '/api/V1/identity/users/installers',
  azure_read_write: '/api/V1/tokens/private-sas-token/jobs/read-write',
  profile_sas_token: '/api/V1/tokens/public-sas-token/user-profiles/read-write',
  /* Job APIs */
  jobs: '/api/V1/jobs',
  jobs_search: '/api/V1/jobs/search',
  /* Job Payment APIs */
  payment: '/api/V1/job',
  /* Firebase register */
  pushNotifications_register: '/api/V1/devices/register',
  /* Alerts & Notifications API */
  alerts: '/api/V1/alerts',
  alert: '/api/V1/alert',
};

/**
 * Type representing all possible keys of the endpoints object.
 */
type EndpointKey = keyof typeof endpoints;

/**
 * Returns the full URL for a given API endpoint key.
 *
 * @param key - The key representing the desired endpoint.
 * @returns Full URL constructed by combining base URL and endpoint path.
 */
export const getUrl = (key: EndpointKey) => {
  const baseUrl = BASE_URL?.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const endpoint = endpoints[BASE_URL ? key : 'error'];
  return `${baseUrl}${endpoint}`;
};

/**
 * Returns the full Vin decoder search URL for a given API endpoint key.
 *
 * @param key - The key representing the desired endpoint.
 * @returns Full URL constructed by combining Vin decoder search base URL and endpoint path.
 */
export const getVinDecoderSearchUrl = (key: EndpointKey) =>
  `${VIN_SEARCH_BASE_URL}${endpoints[VIN_SEARCH_BASE_URL ? key : 'error']}`;

/**
 * Standard HTTP Status Codes for consistent response checking.
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Global network configuration constants.
 */

/**
 * Commonly used HTTP Content-Type headers.
 */
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  TEXT: 'text/plain',
  HTML: 'text/html',
  JPEG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
  PDF: 'application/pdf',
  MP4: 'video/mp4',
} as const;

/**
 * Standard HTTP header keys.
 */
export const HEADERS = {
  AUTHORIZATION: 'Authorization',
  CONTENT_TYPE: 'Content-Type',
  ACCEPT: 'Accept',
  USER_AGENT: 'User-Agent',
  CACHE_CONTROL: 'Cache-Control',
} as const;
