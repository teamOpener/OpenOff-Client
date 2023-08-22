package com.opener.openoff;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import java.util.Map;
import java.util.HashMap;

public class ExternalURLModule extends ReactContextBaseJavaModule {
   ExternalURLModule(ReactApplicationContext context) {
       super(context);
   }
   @ReactMethod
    public void linkAndroidSettings() {
        Activity activity = getCurrentActivity();
        Intent intent = new Intent(android.provider.Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
        intent.addFlags(Intent.FLAG_ACTIVITY_NO_ANIMATION);
        Uri uri = Uri.fromParts("package", activity.getPackageName(), null);
        intent.setData(uri);
        activity.startActivity(intent);
    }
    @Override
    public String getName() {
      return "ExternalURLModule";
    }
}