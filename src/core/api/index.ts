/**
 * Central API module barrel export.
 * Re-exports core network functionality from dedicated modules.
 *
 * This file serves as the main entry point for all API-related imports.
 * It consolidates exports from various modules to provide a clean, unified interface.
 */

/* -------------------------------------------------------------------------- */
/*                              NETWORK CLIENT                                */
/* -------------------------------------------------------------------------- */

export {axiosClient, networkModule, NetworkModule} from './axiosClient';

/* -------------------------------------------------------------------------- */
/*                              TYPE DEFINITIONS                              */
/* -------------------------------------------------------------------------- */

export * from './models/apiResponse';
export * from './models/tokenModel';
export * from './models/PaginatedResponse';

/* -------------------------------------------------------------------------- */
/*                              ERROR HANDLING                                */
/* -------------------------------------------------------------------------- */

export * from './apiErrorHandler';

/* -------------------------------------------------------------------------- */
/*                                 SERVICES                                   */
/* -------------------------------------------------------------------------- */

export {connectivityService, ConnectivityService} from './connectivityService';
export {sessionManager} from './sessionManager';

/* -------------------------------------------------------------------------- */
/*                         LEGACY COMPATIBILITY LAYER                         */
/* -------------------------------------------------------------------------- */

// Legacy API wrappers (getAPI, postAPI, etc.) have been removed.
// Please use axiosClient directly:
// Before: import { getAPI } from '@core/api';
// After:  import { axiosClient } from '@core/api';
//         const response = await axiosClient.get(url);
