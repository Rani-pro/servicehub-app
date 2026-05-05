# Interceptors Module - Integration Report

## ✅ **All Interceptors Properly Integrated**

### 📁 **Interceptor Files:**

```
src/core/api/interceptors/
├── index.ts ........................ Barrel export (all 6 interceptors)
├── authInterceptor.ts .............. Authentication & token management
├── cacheInterceptor.ts ............. Client-side caching with MMKV
├── connectivityInterceptor.ts ...... Fail-fast offline check
├── errorInterceptor.ts ............. Global error transformation
├── loggerInterceptor.ts ............ Request/response logging
└── retryInterceptor.ts ............. Automatic retry logic
```

### 🔄 **Interceptor Chain (Execution Order):**

#### **Request Chain** (Execution Sequence):

```
1. connectivityInterceptor ... Fails fast if offline (No unnecessary work)
2. retryInterceptor ......... Prepares retry configuration
3. cacheInterceptor ......... Checks for cached responses (Saves network/auth)
4. loggerInterceptor ........ Logs outgoing request details
5. authInterceptor .......... Attaches JWT tokens (Final step before network)
   ↓
   [Network Request]
```

#### **Response Chain** (Sequential Order):

```
   [Network Response]
   ↓
1. authInterceptor .......... Handles 401/token refresh
2. loggerInterceptor ........ Logs response details
3. cacheInterceptor ......... Stores cacheable responses
4. retryInterceptor ......... Retries on failure
5. errorInterceptor ......... Transforms to ApiError (Standardized format)
```

### 📊 **Integration Status:**

| Interceptor                 | Status    | Used In        | Features                             |
| --------------------------- | --------- | -------------- | ------------------------------------ |
| **connectivityInterceptor** | ✅ Active | axiosClient.ts | Fail-fast offline check              |
| **authInterceptor**         | ✅ Active | axiosClient.ts | Token attachment, 401 handling       |
| **cacheInterceptor**        | ✅ Active | axiosClient.ts | MMKV caching, stale-while-revalidate |
| **errorInterceptor**        | ✅ Active | axiosClient.ts | ApiError transformation              |
| **loggerInterceptor**       | ✅ Active | axiosClient.ts | Request/response logging             |
| **retryInterceptor**        | ✅ Active | axiosClient.ts | Exponential backoff, jitter          |

**Total:** 6 interceptors integrated into the core network layer.

### 🎯 **How Interceptors Are Used:**

#### **1. Registration in `axiosClient.ts`:**

The registration order in `axiosClient.ts` is carefully managed because Axios executes request interceptors in **reverse** order of registration.

```typescript
private setupInterceptors(): void {
    // Request Interceptors (Added in reverse order of execution)
    this.axiosClient.interceptors.request.use(authInterceptor.requestInterceptor);
    this.axiosClient.interceptors.request.use(loggerInterceptor.requestInterceptor);
    this.axiosClient.interceptors.request.use(cacheInterceptor.requestInterceptor);
    this.axiosClient.interceptors.request.use(retryInterceptor.requestInterceptor);
    this.axiosClient.interceptors.request.use(connectivityInterceptor.requestInterceptor); // Runs FIRST
}
```

#### **2. Automatic Application:**

Every API call through `axiosClient` automatically goes through all interceptors:

```typescript
import {axiosClient} from '@core/api';

// This request automatically:
// - Checks connectivity
// - Attaches auth token
// - Checks cache
// - Logs request/response
// - Retries on failure
// - Transforms errors
const response = await axiosClient.get('/users');
```

### 🔍 **Individual Interceptor Details:**

#### **1. connectivityInterceptor.ts**

- **Purpose:** Prevent unnecessary network calls when offline
- **Request:** Throws `ApiError` with `NO_INTERNET` code if device is offline
- **Status:** Integrated as the first layer of defense

#### **2. authInterceptor.ts**

- **Purpose:** JWT token management
- **Request:** Attaches `Authorization: Bearer <token>` header
- **Response:** Handles 401 errors, initiates token refresh logic
- **Dependencies:** `TokenStorageService`

#### **3. cacheInterceptor.ts**

- **Purpose:** Client-side HTTP caching
- **Request:** Returns cached response if available and fresh
- **Response:** Stores GET responses in MMKV
- **Features:** Stale-while-revalidate support

#### **4. errorInterceptor.ts**

- **Purpose:** Standardize error format
- **Response:** Transforms `AxiosError` → `ApiError`
- **Features:** Extracts status code, machine-readable codes, and field validation errors

#### **5. loggerInterceptor.ts**

- **Purpose:** Debug and monitoring
- **Features:** Logs method, URL, headers, duration, and response status

#### **6. retryInterceptor.ts**

- **Purpose:** Automatic retry on transient failures
- **Features:** Exponential backoff with jitter, retries on 5xx and network errors

### 🧪 **Testing Interceptors:**

Interceptors are verified using unit and integration tests. Manual verification can be done by:

1. Turning off internet (triggers `connectivityInterceptor`)
2. Forcing a 401 response (triggers `authInterceptor` refresh)
3. Making duplicate GET requests (triggers `cacheInterceptor`)

**The interceptor architecture is production-ready and fully integrated!** 🎉
