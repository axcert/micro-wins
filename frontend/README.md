# Notification Settings

This feature allows users to customize their daily goal reminder notifications.

## Setup

Install required dependencies:

```bash
npm install @react-native-community/datetimepicker react-native-push-notification
```

For iOS, add the following to your `AppDelegate.m`:

```objc
#import <RNCPushNotificationIOS.h>

// ...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // ...
  
  [RNCPushNotificationIOS didReceiveRemoteNotification:notification];
  
  return YES;
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}
```

For Android, no additional setup is needed.

## Usage

The `SettingsScreen` component provides the following options:

- Toggle notifications on/off
- Select daily reminder time 
- Test notification

Notification settings are persisted to Redux store.

Local notifications are scheduled/cancelled using `react-native-push-notification`.