// ... existing imports
import { registerForPushNotifications, unregisterFromPushNotifications } from './api/notificationApi';
import messaging from '@react-native-firebase/messaging';
// ...

const App = () => {
  // ...

  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Notification received in foreground:', remoteMessage);
      // Handle foreground notification
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Notification received in background:', remoteMessage);
      // Handle background notification
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification opened from background:', remoteMessage);
      // Handle notification tapped in background
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Notification opened when app is closed:', remoteMessage);
          // Handle notification when app is closed
        }
      });

    registerForPushNotifications();

    return () => {
      unsubscribe();
      unregisterFromPushNotifications();
    };
  }, []);

  // ...
};

// ...