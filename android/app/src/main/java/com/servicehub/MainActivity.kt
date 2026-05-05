package com.servicehub

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.google.firebase.crashlytics.FirebaseCrashlytics

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "SERVICEHUB"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    // Log that MainActivity has been created for Crashlytics testing
    FirebaseCrashlytics.getInstance().log("MainActivity created successfully")
  }

  override fun onCreateOptionsMenu(menu: Menu?): Boolean {
    // Add a test crash button to the options menu (accessible via 3-dot menu)
    menu?.add(0, 1, 0, "Test Crash")?.setShowAsAction(MenuItem.SHOW_AS_ACTION_NEVER)
    return super.onCreateOptionsMenu(menu)
  }

  override fun onOptionsItemSelected(item: MenuItem): Boolean {
    return when (item.itemId) {
      1 -> {
        // Test crash button pressed
        FirebaseCrashlytics.getInstance().log("Test crash initiated from MainActivity menu")
        
        // Add custom attributes for this crash
        FirebaseCrashlytics.getInstance().setCustomKey("crash_source", "MainActivity_menu")
        FirebaseCrashlytics.getInstance().setCustomKey("test_type", "native_crash")
        
        // Force a native crash
        throw RuntimeException("Test crash from MainActivity - This is intentional for Crashlytics testing")
      }
      else -> super.onOptionsItemSelected(item)
    }
  }
}
