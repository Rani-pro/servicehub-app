package com.servicehub

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.google.firebase.crashlytics.FirebaseCrashlytics

class CrashTestModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "CrashTestModule"
    }

    @ReactMethod
    fun testNativeCrash(promise: Promise) {
        try {
            // Log the test crash attempt
            FirebaseCrashlytics.getInstance().log("Native crash test initiated from React Native")
            
            // Add custom attributes
            FirebaseCrashlytics.getInstance().setCustomKey("crash_source", "ReactNative_module")
            FirebaseCrashlytics.getInstance().setCustomKey("test_type", "native_module_crash")
            
            // Resolve promise first to acknowledge the call
            promise.resolve("Test crash initiated")
            
            // Force crash after a short delay to allow promise resolution
            android.os.Handler(android.os.Looper.getMainLooper()).postDelayed({
                throw RuntimeException("Native crash test from React Native module - This is intentional for Crashlytics testing")
            }, 100)
            
        } catch (e: Exception) {
            promise.reject("CRASH_TEST_ERROR", "Failed to initiate test crash", e)
        }
    }

    @ReactMethod
    fun recordTestError(message: String, promise: Promise) {
        try {
            // Record a non-fatal error for testing
            FirebaseCrashlytics.getInstance().log("Recording test error: $message")
            FirebaseCrashlytics.getInstance().recordException(Exception("Test Error: $message"))
            promise.resolve("Test error recorded successfully")
        } catch (e: Exception) {
            promise.reject("RECORD_ERROR_FAILED", "Failed to record test error", e)
        }
    }

    @ReactMethod
    fun setTestUserId(userId: String, promise: Promise) {
        try {
            FirebaseCrashlytics.getInstance().setUserId(userId)
            FirebaseCrashlytics.getInstance().log("Test user ID set: $userId")
            promise.resolve("User ID set successfully")
        } catch (e: Exception) {
            promise.reject("SET_USER_ID_FAILED", "Failed to set user ID", e)
        }
    }
}