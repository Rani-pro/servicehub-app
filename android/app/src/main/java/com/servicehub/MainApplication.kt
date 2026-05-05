package com.servicehub

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.google.firebase.FirebaseApp
import com.google.firebase.crashlytics.FirebaseCrashlytics

class MainApplication : Application(), ReactApplication {

  override val reactHost: ReactHost by lazy {
    getDefaultReactHost(
      context = applicationContext,
      packageList =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
          add(CrashTestPackage())
          add(BuildConfigPackage())
        },
    )
  }

  override fun onCreate() {
    super.onCreate()
    
    // Initialize Firebase
    FirebaseApp.initializeApp(this)
    
    // Enable Crashlytics collection
    FirebaseCrashlytics.getInstance().setCrashlyticsCollectionEnabled(true)
    
    loadReactNative(this)
  }
}
