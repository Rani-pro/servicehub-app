/**
 * --------------------------------------------------------------------------
 * PAGINATED API RESPONSE MODELS
 * --------------------------------------------------------------------------
 * Standardized structure for API responses that return paginated lists.
 * Keeps pagination metadata explicit and predictable.
 *
 * @template T - The type of items in the list.
 */

import {ApiMeta} from './apiResponse';

/* -------------------------------------------------------------------------- */
/*                           PAGINATED RESPONSE DATA                            */
/* -------------------------------------------------------------------------- */

export interface PaginatedResponse<T> {
  /** List of items for the current page */
  items: T[];
  /** Pagination metadata */
  meta: ApiMeta;
}
